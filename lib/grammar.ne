@{%
const lexer = require("./lexer.js");

const BinaryOperations = {
    "or": "LogicalOr",
    "and": "LogicalAnd",
    "is": "TypeComparison",
    "|": "LogicalOr",
    "&": "LogicalAnd",
    "^": "LogicalXor",
    "=": "Equals",
    "!=": "NotEquals",
    ">": "GreaterThan",
    ">=": "GreaterEquals",
    "<": "LessThan",
    "<=": "LessEquals",
    "<<": "ShiftLeft",
    ">>": "LogicalShiftRight",
    ">>>": "ArithmaticShiftRight",
    "+": "Add",
    "-": "Subtract",
    "*": "Mulitply",
    "/": "Divide",
    "**": "Exponent"
};

const UnaryOperations = {
    "~": "Complement",
    "-": "Negate",
    "not": "LogicalNot"
};

function at(index) { return (data) => data[index] }

function binary([left, op, right]) {
  return { 
    type: "BinaryOperation",
    operation: BinaryOperations[op], 
    left, right
  }
}

function unary([op, value]) {
  return { 
    type: "UnaryOperation",
    operation: UnaryOperations[op], 
    value
  }
}
%}
@lexer lexer

#
# TODO: 
#   * enum
#   * assert
#   * imports
#   * index references
#

main -> statement:* {% id %}

statement -> 
      "import" path
    | "type" %identifier ":" type:+

access ->
    "public" | "internal"

type ->
      %identifier ("(" parameter_list ")"):?
    | "struct":? "{" entity:* "}"
    | "enum" type "{" (%identifier ":" type):+ "}"
    | reference

entity ->
      "section" identifier:* "[" expression "]" "{" entity:* "}"
    | "parameter" %identifier ("=" expression):?
    | "{" entity:* "}"
    | access:? "const":? "def":? %identifier ":" type ("[" size "]"):?
    | assert

reference ->
      "ref" "(" "index" path ")"
    | "ref" "(" "offset" expression ")"

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

# Arithmatic
# ==========

expression ->
    or_expression {% id %}

or_expression ->
      or_expression "or" and_expression {% binary %}
    | and_expression {% id %}

and_expression ->
      and_expression "and" bit_expression {% binary %}
    | bit_expression {% id %}

type_expression ->
      type_expression "is" bit_expression {% binary %}
    | bit_expression {% id %}

bit_expression ->
      bit_expression "|" eq_expression {% binary %}
    | bit_expression "&" eq_expression {% binary %}
    | bit_expression "^" eq_expression {% binary %}
    | eq_expression {% id %}

eq_expression ->
      eq_expression "=" cmp_expression {% binary %}
    | eq_expression "!=" cmp_expression {% binary %}
    | cmp_expression {% id %}

cmp_expression ->
      cmp_expression ">" shift_expression {% binary %}
    | cmp_expression ">=" shift_expression {% binary %}
    | cmp_expression "<" shift_expression {% binary %}
    | cmp_expression "<=" shift_expression {% binary %}
    | shift_expression {% id %}

shift_expression ->
      shift_expression "<<" add_expression {% binary %}
    | shift_expression ">>" add_expression {% binary %}
    | shift_expression ">>>" add_expression {% binary %}
    | add_expression {% id %}

add_expression ->
      add_expression "+" mul_expression {% binary %}
    | add_expression "-" mul_expression {% binary %}
    | mul_expression {% id %}

mul_expression ->
      mul_expression "*" exp_expression {% binary %}
    | mul_expression "/" exp_expression {% binary %}
    | exp_expression {% id %}

exp_expression ->
      top_expression "**" exp_expression {% binary %}
    | top_expression {% id %}

unary_expression ->
      "~" unary_expression {% unary %}
    | "-" unary_expression {% unary %}
    | "not" unary_expression {% unary %}
    | top_expression {% id %}

top_expression ->
      %identifier
    | %number
    | %string
    | "nil"
    | "(" expression ")"
