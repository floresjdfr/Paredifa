/*
Test DCG parser for simple RE expressions
Use: 
Only works for textfiles with just one RE; no blanks, no newline, no CR
If Re_someReFile is some such a textfile with a RE inside, type:
swipl test_parserRE.pl Re_someReFile
Or
By using default './test_cases/test.re' as inpute file, type:
swipl test_parserRE.pl

@author loriacarlos@gmail.com
@since 2021
*/
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Test from file %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- assert(file_search_path(mymodules, './modules/lexing/') ).
:- use_module(parserREOrAnd, [
    parseReFromFile/2,
    parseReFromAtom/2
]).
:- initialization 
     format('*** Testing RE Parser ***~n')
     /*testParserRE,
     halt */
.
default_test_file('./test_cases/test.re').

testParserRE :- 
    (current_prolog_flag(argv, [File | _]) -> true 
                                           ; default_test_file(File)
    ),
    format('~n*** Testing parser with file "~s" *** ~n', [File]),
    catch(parseReFromFile(File, Tree), Error, handle_error(Error)), !,
    format('~n*** File="~s" parsed to AST=~w ***~n',[File, Tree])
.
testParserRE :- format('~n*** --> PARSING FAILED! ***~n').

handle_error(Error) :- format('>>> Error ~q <<<~n', [Error]).