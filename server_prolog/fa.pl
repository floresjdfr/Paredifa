:- [opers].


:-dynamic dyn_fa_initial/2.
:-dynamic dyn_fa_final/2.
:-dynamic dyn_fa_state/2.
:-dynamic dyn_fa_symbol/2.
:-dynamic dyn_fa_move/4.
:-dynamic dyn_fa_move/4.


%SPEC generador de ID's para los FA's
fa_new_id(Id) :- gensym('$fa_', Id).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% INITIALS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%SPEC devuelve el S0 el estado inicial de FA
fa_initial(FA, S0) :- dyn_fa_initial(FA, S0). 

%SPEC Setea estado inicial a un FA, valida que no haya otro estado inicial antes.
fa_set_initial(FA, S0) :-  
    retractall( dyn_fa_initial(FA, _) ),
    assert( dyn_fa_initial(FA, S0) ). 

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FINALS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%SPEC valida si Sf ya esta como estado final en FA y si no lo esta se lo setea
fa_set_final(FA, Sf) :-
    dyn_fa_final(FA, Sf), !
.
fa_set_final(FA, Sf) :-
    assert( dyn_fa_final(FA, Sf) )
.
fa_isFinal(FA, S) :- fa_finals(FA, Finals), member(S,Finals) .

%SPEC Devuelve en L la lista de los estados finales del fa.
fa_finals(FA, L) :- findall(F, dyn_fa_final(FA, F), L). 

%SPEC Devuelve en L la lista de los estados finales del fa.
fa_non_initial_finals(FA, L) :- findall(F, dyn_fa_final(FA, F), L1), 
                                fa_initial(FA,S0),
                                delete(L1, S0, L)
. 

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% MOVES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%SPEC setea un move X/S ==> Y a FA
fa_set_move(FA, X/S ==> Y) :- 
    fa_insert_move_once(FA, X, S, Y)
.

%SPEC valida si hay un move en FA tal X/S==>Y igual e inserte si no es asi
fa_insert_move_once(FA,X,S,Y) :-
    dyn_fa_move(FA, X, S, Y), !
.
fa_insert_move_once(FA,X,S,Y) :-
    assert( dyn_fa_move(FA, X, S, Y) )
.

%SPEC consulta en FA el move X/S==>Y
fa_move_to_term(FA, X/S ==> Y) :- dyn_fa_move(FA, X, S, Y).


%SPEC Devuelve en L la lista de los moves de FA.
fa_moves(FA, L) :- findall(X/S ==> Y, dyn_fa_move(FA, X, S, Y), L). 

%SPEC Devuelve en L la lista de los moves de FA que van a estados finales.
fa_moves_to_finals(FA,L) :- findall(X/S ==> Y, (dyn_fa_move(FA, X, S, Y), fa_isFinal(FA, Y)), L). 

%SPEC Devuelve en L la lista de los moves de FA que salen de estados iniciales.
fa_moves_from_initial(FA,L) :- findall(X/S ==> Y, (dyn_fa_move(FA, X, S, Y), fa_initial(FA, X)), L). 

%SPEC Devuelve en L la lista de los moves de FA que van al estado iniciales.
fa_moves_to_initial(FA,L) :- findall(X/S ==> Y, (dyn_fa_move(FA, X, S, Y), fa_initial(FA, Y)), L) 
.

%SPEC Devuelve en L la lista de los moves de FA que no pasan por estados iniciales.
fa_non_initial_moves(FA,L) :- findall(X/S ==> Y, dyn_fa_move(FA, X, S, Y), L1), 
                              fa_initial(FA,S0), delete(L1, S0/S==>Y, L2), delete(L2,X/S==>S0,L)
.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% STATES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%SPEC valida si S ya esta como estado  en FA y si no lo esta se lo setea
fa_set_state(FA, S) :-
    dyn_fa_state(FA, S), !
.
fa_set_state(FA, S) :-
    assert( dyn_fa_state(FA, S) )
.

%SPEC Devuelve en L la lista de los estados del fa.
fa_states(FA, L) :- findall(F, dyn_fa_state(FA, F), L).

fa_non_initial_states(FA, L) :- fa_states(FA, L1), fa_initial(FA, Init), delete(L1, Init, L)
.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% SYMBOLS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%SPEC valida si S ya esta como symbolo  en FA y si no lo esta se lo setea
fa_set_symbol(FA, S) :-
    dyn_fa_symbol(FA, S), !
.
fa_set_symbol(FA, S) :-
    assert( dyn_fa_symbol(FA, S) )
.

%SPEC Devuelve en L la lista el vocabulario de fa.
fa_vocabulary(FA, L) :- findall(S, dyn_fa_symbol(FA, S), L). 

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% RUN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
fa_run(FA, Input) :- 
    fa_initial(FA, S0),
    fa_running(FA,S0,Input)
.

fa_running( FA, S, [] )              :- fa_isFinal(FA, S), !.
fa_running( FA, S, [ Sym | Input ] ) :- dyn_fa_move(FA, S, Sym, T),
                                        fa_running(FA, T, Input)
.

fa_running_path( _FA, S, [], [S] ):-  !.
fa_running_path( FA, S, [ Sym | Input ], [S|R]) :- dyn_fa_move(FA, S, Sym, T),
                                        fa_running_path(FA, T, Input, R)
.
fa_run_path(FA, Input,Output) :- 
    fa_initial(FA, S0),
    fa_running_path(FA,S0,Input,Output)
.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% TRANSFORMERS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%SPEC Devuelve en FA el FA en formado del JsonDict
json_to_fa( JsonDict, FA ) :- 
   _{   
       finals:Finals,
        initial:S0, 
        moves:Moves, 
        states:States, 
        vocabulary:Vocabulary
    } :< JsonDict,
    fa_new_id(FA),
    term_string(S0T,S0),fa_set_initial(FA, S0T),
    forall(member(F, Finals), (term_string(FT,F),fa_set_final(FA, FT))),
    forall(member(S, States), (term_string(ST,S),fa_set_state(FA, ST))),
    forall(member(V, Vocabulary), (term_string(VT,V), fa_set_symbol(FA, VT))),
    forall(member(M, Moves),(term_string(MT,M),fa_set_move(FA,MT)))
    
.

%SPEC Devuelve en Json el FA en formato JSON
fa_to_json(FA, Json) :- 
    fa_vocabulary(FA, V),
    fa_states(FA, S),
    fa_finals(FA, F),
    fa_initial(FA, S0T),
    fa_moves(FA, M),
    string_to_termList(Vocabulary,V),
    string_to_termList(States,S),
    string_to_termList(Finals,F),
    term_string(S0T,S0),
    string_to_termList(Moves,M),
    Json = fa{
        id: FA,
        vocabulary: Vocabulary,
        states: States,
        finals: Finals,
        initial: S0,
        moves: Moves
    }
.

fa_copy(FA, NFA) :- fa_new_id(NFA),
                    fa_states(FA, States),
                    forall(member(S, States), fa_set_state(NFA, S)),
                    fa_initial(FA, S0),
                    fa_set_initial(NFA, S0),
                    fa_finals(FA, Finals),
                    forall(member(F, Finals), fa_set_final(NFA, F)),                    
                    fa_vocabulary(FA, Vocabulary),
                    forall(member(V, Vocabulary), fa_set_symbol(NFA,V)),
                    fa_moves(FA, Moves),
                    forall(member(M, Moves), fa_set_move(NFA,M))
.











