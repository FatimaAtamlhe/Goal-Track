/* JFlex lexer specification */
%%
%class Lexer
%unicode
%cup
%public
%final
%line
%column
%type java_cup.runtime.Symbol
%implements java_cup.runtime.Scanner

%{
  private java_cup.runtime.Symbol symbol(int type) {
    return new java_cup.runtime.Symbol(type, yyline+1, yycolumn+1, yytext());
  }
  private java_cup.runtime.Symbol symbol(int type, Object value) {
    return new java_cup.runtime.Symbol(type, yyline+1, yycolumn+1, value);
  }
%}

WHITESPACE = [ \t\f\r\n]+
COMMENT    = "//"[^\n]* | "/\*"[^*]*\*+([^/*][^*]*\*+)*"/"

ID_START   = [A-Za-z_]
ID_PART    = [A-Za-z0-9_]

DIGIT      = [0-9]
UNDERSCORE = _
NUMBER_BODY = {DIGIT}({UNDERSCORE}?{DIGIT})*
NUMBER     = {NUMBER_BODY}

HTML_ENTITY = "&"[A-Za-z0-9#]+";"

%%

{WHITESPACE}        { /* skip */ }
{COMMENT}           { /* skip comments */ }

"if"               { return symbol(sym.IF); }
"then"             { return symbol(sym.THEN); }
"else"             { return symbol(sym.ELSE); }
"end"              { return symbol(sym.END); }
"elsif"            { return symbol(sym.ELSIF); }

";"                { return symbol(sym.SEMI); }
"("                { return symbol(sym.LPAREN); }
")"                { return symbol(sym.RPAREN); }

{HTML_ENTITY}       { return symbol(sym.HTML_ENTITY, yytext()); }
{NUMBER}            { return symbol(sym.NUMBER, yytext().replace("_", "")); }
{ID_START}{ID_PART}*{ return symbol(sym.IDENT, yytext()); }

.                   { return symbol(sym.error, "Unexpected character: " + yytext()); }


<<EOF>>             { return symbol(sym.EOF); }
