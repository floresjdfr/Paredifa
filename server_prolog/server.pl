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


:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_files)).
:- use_module(library(http/html_head)).


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
:- http_handler('/hello_world', say_hi, []).  

 
server(Port) :-                                            % (2)
        http_server(http_dispatch, [port(Port)]).
       
compile(Request) :-                                        % (3)
   http_read_json_dict(Request, DictIn),
   _{
       re : Re
   } :< DictIn,
   string_to_atom(Re, ReAtom),
   format(user_output,"re recibida: ~q~n",[ReAtom]),
   parseReFromAtom(ReAtom, T),
   evaluate(T,FA),
   fa_to_json(FA,Json),
   DictOut = DictIn.put(Json),
   reply_json_dict(DictOut)
.


say_hi(_Request) :-                                        % (3)
    format('Content-type: text/plain~n~n'),
    % Respuesta en formato JSON
    server_time(STime),
    random_between(1, 5, Sleep),
    sleep(Sleep),
    format(atom(Resp), '{"msg":"Hello World!","stime":"~a", "etime":"~a"}', [STime, Sleep]),
    format(Resp)
.



run(Request) :- 
                   
   http_read_json_dict(Request, DictIn),
   _{
       fa : FAJson,
       path : JsonPath
   } :< DictIn,
    json_to_fa(FAJson,FA),
    format(user_output,"fa recived: ~q~n",[FAJson]),
    format(user_output,"path recived is: ~q~n",[JsonPath]),
    string_to_termList(JsonPath,TermPath),
    evaluate_run(FA,TermPath,Result),
    fa_run_path(FA,TermPath,Path),
    DictOut = DictIn.put(_{ path:Path, result:Result }),
    reply_json_dict(DictOut)
.

