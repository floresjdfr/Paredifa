/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

:- assert(file_search_path(mymodules,'./parser')).
:- use_module(mymodules(parserREOrAnd)).
:- [fa].
:- reset_gensym.
fa_new_state(Id) :- gensym('s', Id).

concat_initials(FA1, FA2) :- fa_initial(FA1,S0),fa_initial(FA2, S02), 
                             fa_isFinal(FA2, S02)->fa_set_final(FA1,S0);!
.
validate_sec(FA1, FA2 , NFA) :- fa_initial(FA2, S02), fa_finals(FA1, Finals1),
                                not(fa_isFinal(FA2, S02))->forall(member(SF1, Finals1),fa_retract_final(NFA,SF1));!
.

check_for_final(FA, S1, S2) :- fa_isFinal(FA, S1)->fa_set_final(FA,S2);!.

check_for_finaldelete(FA, S1) :- fa_isFinal(FA, S1)->fa_retract_final(FA,S1);!.


%%%%%%%%%%%%%%%% leave compiler %%%%%%%%%%%%%%%%%%%

compilar_hoja(Symbol,FA) :-   fa_new_id(FA),
                              fa_set_symbol(FA, Symbol),
                              fa_new_state(S0),
                              fa_new_state(S1),
                              fa_set_state(FA,S0),
                              fa_set_state(FA,S1),
                              fa_set_initial(FA, S0),
                              fa_set_final(FA, S1),
                              fa_set_move(FA,S0/Symbol==>S1)
.
create_moves(FA, S, Y) :- fa_finals(FA,Finals),
                          forall(member(SF,Finals), fa_set_move(FA, SF/S ==> Y))
.

compilador_oper_post(FA,+,NFA) :- fa_copy(FA, NFA),
                                  fa_moves_from_initial(NFA, Moves),                                 
                                  forall(member(_X/S==>Y, Moves), create_moves(NFA,S,Y))
                                  
.

compilador_oper_post(FA,*,NFA) :- fa_copy(FA, NFA),
                                  fa_moves_from_initial(NFA, Moves),                                 
                                  forall(member(_X/S==>Y, Moves), create_moves(NFA,S,Y)),
                                  fa_initial(NFA, S0),
                                  fa_set_final(NFA,S0)
.

compilador_oper_post(FA,?,NFA) :- fa_copy(FA, NFA),
                                  fa_initial(NFA, S0),
                                  fa_set_final(NFA, S0)
.
                                                                 


compilador_oper_in(FA1, FA2 , '|' ,NFA) :- fa_copy(FA1,NFA),
                                    concat_initials(NFA,FA2),
                                     fa_initial(NFA,S0),
                                     fa_vocabulary(FA2, Vocabulary),
                                     forall(member(V, Vocabulary), fa_set_symbol(NFA,V)),
                                     fa_non_initial_states(FA2, States2),
                                     forall(member(S2, States2), fa_set_state(NFA,S2)),
                                     fa_moves_from_initial(FA2, FromInitMoves),
                                     forall(member(_X/S==>Y, FromInitMoves), fa_set_move(NFA, S0/S ==> Y)),
                                     fa_moves_to_initial(FA2, ToInitMoves),
                                     forall(member(X/S==>_Y, ToInitMoves), fa_set_move(NFA, X/S ==> S0)),
                                     fa_non_initial_finals(FA2, Finals2),
                                     forall(member(SF2, Finals2), fa_set_final(NFA,SF2)),
                                     fa_non_initial_moves(FA2, InitMoves),
                                     forall(member(X/S==>Y, InitMoves), fa_set_move(NFA, X/S ==> Y))    
                                          
.

compilador_oper_in(FA1, FA2 , ^ ,NFA) :- fa_copy(FA1,NFA),
                                         fa_vocabulary(FA2, Vocabulary),
                                         forall(member(V, Vocabulary), fa_set_symbol(NFA,V)),
                                         fa_non_initial_states(FA2, States2),
                                         forall(member(S2, States2), fa_set_state(NFA,S2)),
                                         fa_non_initial_moves(FA2, InitMoves),
                                         forall(member(X/S==>Y, InitMoves), fa_set_move(NFA, X/S ==> Y)),
                                         fa_finals(NFA,Finals),
                                         forall(member(F,Finals),union_secuencial(F,NFA,FA2)),
                                         fa_non_initial_finals(FA2, Finals2),
                                         forall(member(SF2, Finals2), fa_set_final(NFA,SF2)),
                                         validate_sec(FA1, FA2 , NFA)
                                         
.

union_secuencial(S,FA1,FA2) :-   fa_moves_from_initial(FA2, FromInitMoves),
                                 forall(member(_X/Symbol==>Y, FromInitMoves), fa_set_move(FA1, S/Symbol ==> Y)),
                                 fa_moves_to_initial(FA2, ToInitMoves),
                                 forall(member(X/Symbol==>_Y, ToInitMoves), fa_set_move(FA1, X/Symbol ==> S))
.

nfa_to_dfa(NFA, DFA):-  fa_copy(NFA,DFA),
                        fa_states(DFA,States),
                        forall(member(State, States),check_state(DFA,State))
                       
.

check_state(NFA,State) :-
        fa_vocabulary(NFA,Vocabulary),
        forall(member(Symbol,Vocabulary),(fa_find_moves_from_state_symbol(NFA,State,Symbol,L1),parseMovesList(L1,L),evaluate_state(NFA,L)))
.

evaluate_state(_NFA, []):- ! .
evaluate_state(_NFA, [_L]):- ! .
evaluate_state(NFA, L) :- concat_states(NFA, L).


parseMovesList([],[]):-!.
parseMovesList([_S/_Symbol==>S1|Rest],[S1|R]):-parseMovesList(Rest,R).

concat_states(NFA, L) :- fa_new_state(NewState),
                         fa_set_state(NFA,NewState),
                         forall(member(State, L), check_for_final(NFA, State,NewState)),
                         forall(member(State, L), swap_states(NFA, State,NewState)),
                         forall(member(State, L), fa_retract_state(NFA, State)),
                         forall(member(State, L), check_for_finaldelete(NFA, State))
.


swap_states(NFA, S1, S2) :-
        fa_find_moves_from_state(NFA, S1, MovesFrom),
        fa_find_moves_to_state(NFA, S1, MovesTo),
        forall(member(S1/Symbol==>Y, MovesFrom), fa_set_move(NFA, S2/Symbol ==> Y)),
        forall(member(X/Symbol==>S1, MovesTo), fa_set_move(NFA, X/Symbol ==> S2)),
        forall(member(S1/Symbol==>Y, MovesFrom), fa_retract_move(NFA, S1/Symbol ==> Y)),
        forall(member(X/Symbol==>S1, MovesTo), fa_retract_move(NFA, X/Symbol ==> S1))
.






evaluate(T,_NFA) :- T=.. L, L = [], !.

evaluate(T,NFA) :- T=.. L, L = [T],compilar_hoja(T,NFA).

evaluate(T,NFA) :- T=.. L, L = [Oper,Leave],evaluate(Leave,FA),
                                    member(Oper, [*,?,+]), !,
                                    compilador_oper_post(FA,Oper,NFA)
.

evaluate(T,NFA) :- T=..L,L =[Oper,Left,Right], evaluate(Left,LFA),evaluate(Right,RFA),
                                    member(Oper, [^,'|']), !,
                                    compilador_oper_in(LFA, RFA,Oper,NFA)
.
                    



evaluate_run(FA,Path,Result) :-
        fa_run(FA,Path)->Result = true;
        Result = false
.
