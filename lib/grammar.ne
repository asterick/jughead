@{%
const lexer = require("./lexer.js");
%}
@lexer lexer

main -> statement:* {% id %}

statement -> 
      "require" %string
    | ("public" | "private"):? "define" %identifier ":" type:*
    | const

access ->
    "public" | "private"

type ->
      %identifier ("(" parameter_list ")"):?
    | "[" size "]"
    | "struct":? "{" field:* "}"

field ->
      %identifier ":" type:*
    | "section" "[" expression "]" "{" field:* "}"
    | "parameter" %identifier "=" expression
    | const

const ->
    access:? "const" %identifier "=" expression

size ->
      "*"
    | "until" expression
    | "while" expression
    | expression_list

parameter_list ->
    parameter ("," parameter):*

parameter ->
    %identifier ("=" expression):?

expression_list ->
    expression ("," expression):*

#
# Arithmatic
#

expression ->
    or_expression

or_expression ->
      or_expression "or" and_expression
    | and_expression

and_expression ->
      and_expression "and" bit_expression
    | bit_expression

bit_expression ->
      bit_expression "|" eq_expression
    | bit_expression "&" eq_expression
    | bit_expression "^" eq_expression
    | eq_expression

eq_expression ->
      eq_expression "=" cmp_expression
    | eq_expression "!=" cmp_expression
    | cmp_expression

cmp_expression ->
      cmp_expression ">" shift_expression
    | cmp_expression ">=" shift_expression
    | cmp_expression "<" shift_expression
    | cmp_expression "<=" shift_expression
    | shift_expression

shift_expression ->
      shift_expression "<<" add_expression
    | shift_expression ">>" add_expression
    | shift_expression ">>>" add_expression
    | add_expression

add_expression ->
      add_expression "+" mul_expression
    | add_expression "-" mul_expression
    | mul_expression

mul_expression ->
      mul_expression "*" exp_expression
    | mul_expression "/" exp_expression
    | exp_expression

exp_expression ->
      top_expression "**" exp_expression
    | top_expression

unary_expression ->
      "~" unary_expression
    | "-" unary_expression
    | "not" unary_expression
    | top_expression

top_expression ->
      %identifier
    | %number
    | "nil"
    | "(" expression ")"
