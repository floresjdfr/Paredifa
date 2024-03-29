
/** <module> Simple recursive lexer Demo

@author loriacarlos@gmail.com
@since 2021

*/

:- module(basics_lexer, 
                 [tokenize_file/2, 
                  tokenize_stream/2,
                  tokenize_atom/2
                 ]).
                  
:- use_module(library(dcg/basics)).
:- use_module(library(pcre)).
:- use_module(extra_basics).

tokenize_stream(Stream, Tokens) :-
   read_stream_to_codes(Stream, Codes),
   close(Stream),
   getTokens(Tokens, Codes, _)
.
tokenize_file(File, Tokens) :- open(File, read, Stream),
                               tokenize_stream(Stream, Tokens)
                          
.

tokenize_atom(Atom, Tokens):-
   atom_to_memory_file(Atom, Handle), 
   open_memory_file(Handle, read, Stream), 
   tokenize_stream(Stream, Tokens)
.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

getTokens([Token | Tokens]) --> blanks,
                                token(Token), 
                                blanks,
                                getTokens(Tokens), !
.
getTokens([]) --> blanks, [].



token(Token) --> number(Token), !.
token(Token) --> extra_basics:id(Token).



