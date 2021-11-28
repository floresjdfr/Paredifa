:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).

:- use_module(library(http/http_json)).


:- http_handler(root(.),
                handler,[method(post)]).

server(Port) :-
   http_server(http_dispatch,[port(Port)]).

handler(Request) :-
   format(user_output,"~n** New arriving Request~q *** ~n", [Request]),
   http_read_json_dict(Request, DictIn),
   format(useroutput,"Dictionary posted is: ~q~n",[DictIn]),
   DictOut = DictIn.put({accepted:true}),
   format(user_output,"Dictionary tosend: ~q~n",[DictOut]),
   reply_json_dict(DictOut)
.
%
port(9000).
start_server :- port(P), server(P).
:- initialization start_server.