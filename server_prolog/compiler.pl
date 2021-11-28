:- assert(file_search_path(mymodules,'./parser')).
:- use_module(mymodules(parserREOrAnd)).
:- [fa].
:- reset_gensym.
fa_new_state(Id) :- gensym('s', Id).
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
                                           forall(member(V, Vocabulary), fa_set_symbol(NFA,V))                                           
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






 /*test :- fa_new_id(FA),
        fa_set_symbol(FA,0),
        fa_set_symbol(FA,1),
        fa_set_state(FA,s0),
        fa_set_state(FA,s1),
        fa_set_state(FA,s2),
        fa_set_state(FA,s3),
        fa_set_initial(FA,s0),  
        fa_set_final(FA,s2),
        fa_set_final(FA,s3),
        fa_set_move(FA,s0/0==>s0),
        fa_set_move(FA,s0/1==>s2),
        fa_set_move(FA,s1/0==>s1),
        fa_set_move(FA,s1/1==>s1),
        fa_set_move(FA,s2/0==>s2),
        fa_set_move(FA,s2/1==>s3),
        fa_set_move(FA,s3/0==>s3),
        fa_set_move(FA,s3/1==>s0)
.*/                  

/*postOrder(A,[A]) :- atom(A).

postOrder(T,P) :- T =.. [Oper, X, Y],
                  member(Oper, [^, ?,'|',+]), !,
                  postOrder(X,PX),
                  postOrder(Y,PY),
                  append(PX,PY,PXY),
                  append(PXY,[Oper],P)
.*/