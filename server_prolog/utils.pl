string_to_termList([],[]):- ! .
string_to_termList([F|R],[FT|RT]):- term_string(FT,F), string_to_termList(R,RT) .