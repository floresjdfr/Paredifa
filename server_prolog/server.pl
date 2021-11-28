/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_files)).
:- use_module(library(http/html_head)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_header)).
:- use_module(library(http/http_client)).
:- use_module(library(http/json)).
:- use_module(library(http/http_server)).
:- [compiler].
:- [utils].

:- multifile http:location/3.
:- dynamic   http:location/3.

mime:mime_extension('mjs', 'application/javascript'). 

:- initialization
    (current_prolog_flag(argv, [SPort | _]) -> true ; SPort='9000'),
    atom_number(SPort, Port),
    server(Port).
      
:- http_handler('/compile', compile, []).

:- http_handler('/run', run, []).   

 
server(Port) :-                                            
        http_server(http_dispatch, [port(Port)]).
       
compile(Request) :-                                 
   http_read_json_dict(Request, DictIn),
   _{
       re : Re
   } :< DictIn,
   string_to_atom(Re, ReAtom),
   format(user_output,"re recibida: ~q~n",[ReAtom]),
   parseReFromAtom(ReAtom, T),
   evaluate(T,FA),
   nfa_to_dfa(FA,DFA),
   fa_to_json(DFA,Json),
   DictOut = DictIn.put(Json),
   format(user_output,"Response: ~q~n",[Json]),
   reply_json_dict(DictOut)
.

run(Request) :-                
   http_read_json_dict(Request, DictIn),
   _{
       fa : FAJson,
       path : JsonPath
   } :< DictIn,
   format(user_output,"fa recived: ~q~n",[FAJson]),
   format(user_output,"path recived is: ~q~n",[JsonPath]),
    json_to_fa(FAJson,FA),
    string_to_termList(JsonPath,TermPath),
    evaluate_run(FA,TermPath,Result),
    fa_run_path(FA,TermPath,Path),
    DictOut = DictIn.put(_{ path:Path, result:Result }),
    reply_json_dict(DictOut)
.

