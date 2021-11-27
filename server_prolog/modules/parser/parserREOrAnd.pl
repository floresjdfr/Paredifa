/*
A DCG parser for simple RE expressions
Assumes And (concat, ^) has greater precedence than or (|)
Assumes vocabulary accordingly to extra_basics module.
Grammar start no-terminal is re/3 (see below)
@author loriacarlos@gmail.com
@since 2021
*/

:- module(parserREOrAnd, [
          parseReFromFile/2,
		  parseReFromTokens/2,
		  parseReFromAtom/2		  
]).


:- use_module(extra_basics,  [isCodeLetterOrDigit/1 as isCodeInVocabulary, 
                                         isCodePipe/1 as isPipe]).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% PARSER CONTROLLERS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
parseReFromFile(File, Tree) :-
   tokenize_file(File, Tokens),
   parseReFromTokens(Tokens, Tree )
.

parseReFromTokens(Tokens, Tree) :- re(Tree, Tokens, [])
.

parseReFromAtom(Atom, Tree) :-
   tokenize_atom(Atom , Tokens),
   parseReFromTokens(Tokens, Tree)
.

parseReFromStream(Stream, Tree) :-
   tokenize_stream(Stream , Tokens),
   parseReFromTokens(Tokens, Tree)
.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% LEXER %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
/*
In this version 'token' is just the same as 'code'!
*/

tokenize_file(File, Tokens) :- open(File, read, Stream),
                               tokenize_stream(Stream, Tokens)
                          
.

tokenize_stream(Stream, Codes) :-
   read_stream_to_codes(Stream, Codes),
   close(Stream)
.

tokenize_atom(Atom, Tokens):-
   atom_to_memory_file(Atom, Handle), 
   open_memory_file(Handle, read, Stream), 
   tokenize_stream(Stream, Tokens)
.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% RE DCG GRAMMAR %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
re(RE) --> orReList(LRE), !, {build_re(LRE, RE)}.

orReList(RE) --> andReList(REL), !, restOrReList( LRE ), {build_orRe(REL, LRE, RE)}.
                     
restOrReList( L )  --> "|",  !, orReList( L ).
restOrReList([])   --> []. 

andReList( AndRE )          --> factorRe(REL), !, restAndReList(RER), {build_andRe(REL, RER, AndRE)}.
restAndReList( ^(L, R ) )   --> factorRe( L ), restAndReList(R).
restAndReList([]), [C]      --> [C], {isPipe(C)}, !.
restAndReList([])           --> [].


factorRe(ParRE)   --> "(", !, re(RE), ")", postReFactor(PF), {build_re_factor(RE, PF, ParRE)}.
factorRe(VPF)     --> atomRe(V), postReFactor(PF), {build_re_factor(V, PF, VPF)}.
                
atomRe(V) --> [C], {isCodeInVocabulary(C)}, {atom_codes(V, [C])}.
                
postReFactor( '+'(L) )  --> "+", !, postReFactor( L ).
postReFactor( '?'(L) )  --> "?", !, postReFactor( L ).
postReFactor( '*'(L) )  --> "*", !, postReFactor( L ).
postReFactor( [] ), [C] --> [C], {\+ isCodeInVocabulary(C)}.
postReFactor( [] )      --> [].

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Term Builders %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
build_re('|'(T), T) :- !.
build_re('|'(T, []), T) :- !.
build_re(LRE, LRE).

build_orRe(RE, [], RE) :- !.
build_orRe(RE, OrRE, (RE|OrRE) ).

build_andRe(RE, [], RE) :- !.
build_andRe(RE, REL^RER, AndRe) :- build_andRe(^(RE, REL), RER, AndRe),!.
build_andRe(RE, AndRE, RE^AndRE).

build_re_factor(RE, +(L), +(RE1))     :- build_re_factor(RE, L, RE1), !.
build_re_factor(RE, *(L), *(RE1))     :- build_re_factor(RE, L, RE1), !.
build_re_factor(RE, '?'(L), '?'(RE1)) :- build_re_factor(RE, L, RE1), !.
build_re_factor(RE, [], RE).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
re_test(A, T, I, O) :- atom_codes(A, I), re(T, I, O). %, atom_codes(IT, I), atom_codes(OT, O).
