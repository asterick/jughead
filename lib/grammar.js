// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"], "postprocess": id},
    {"name": "statement", "symbols": [{"literal":"import"}, (lexer.has("string") ? {type: "string"} : string)]},
    {"name": "statement$ebnf$1", "symbols": ["type"]},
    {"name": "statement$ebnf$1", "symbols": ["statement$ebnf$1", "type"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": [{"literal":"type"}, (lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":":"}, "statement$ebnf$1"]},
    {"name": "access", "symbols": [{"literal":"public"}]},
    {"name": "access", "symbols": [{"literal":"internal"}]},
    {"name": "type$ebnf$1$subexpression$1", "symbols": [{"literal":"("}, "parameter_list", {"literal":")"}]},
    {"name": "type$ebnf$1", "symbols": ["type$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "type$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "type", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "type$ebnf$1"]},
    {"name": "type$ebnf$2", "symbols": [{"literal":"struct"}], "postprocess": id},
    {"name": "type$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "type$ebnf$3", "symbols": []},
    {"name": "type$ebnf$3", "symbols": ["type$ebnf$3", "entity"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "type", "symbols": ["type$ebnf$2", {"literal":"{"}, "type$ebnf$3", {"literal":"}"}]},
    {"name": "type", "symbols": ["reference"]},
    {"name": "entity$ebnf$1", "symbols": []},
    {"name": "entity$ebnf$1", "symbols": ["entity$ebnf$1", "entity"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "entity", "symbols": [{"literal":"section"}, {"literal":"["}, "expression", {"literal":"]"}, {"literal":"{"}, "entity$ebnf$1", {"literal":"}"}]},
    {"name": "entity$ebnf$2$subexpression$1", "symbols": [{"literal":"="}, "expression"]},
    {"name": "entity$ebnf$2", "symbols": ["entity$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "entity$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "entity", "symbols": [{"literal":"parameter"}, (lexer.has("identifier") ? {type: "identifier"} : identifier), "entity$ebnf$2"]},
    {"name": "entity$ebnf$3", "symbols": []},
    {"name": "entity$ebnf$3", "symbols": ["entity$ebnf$3", "entity"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "entity", "symbols": [{"literal":"{"}, "entity$ebnf$3", {"literal":"}"}]},
    {"name": "entity$ebnf$4", "symbols": ["access"], "postprocess": id},
    {"name": "entity$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "entity$ebnf$5", "symbols": [{"literal":"const"}], "postprocess": id},
    {"name": "entity$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "entity$ebnf$6", "symbols": [{"literal":"def"}], "postprocess": id},
    {"name": "entity$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "entity$ebnf$7$subexpression$1", "symbols": [{"literal":"["}, "size", {"literal":"]"}]},
    {"name": "entity$ebnf$7", "symbols": ["entity$ebnf$7$subexpression$1"], "postprocess": id},
    {"name": "entity$ebnf$7", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "entity", "symbols": ["entity$ebnf$4", "entity$ebnf$5", "entity$ebnf$6", (lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":":"}, "type", "entity$ebnf$7"]},
    {"name": "entity", "symbols": ["assert"]},
    {"name": "reference", "symbols": [{"literal":"ref"}, {"literal":"("}, {"literal":"index"}, "path", {"literal":")"}]},
    {"name": "reference", "symbols": [{"literal":"ref"}, {"literal":"("}, {"literal":"offset"}, "expression", {"literal":")"}]},
    {"name": "size", "symbols": [{"literal":"*"}]},
    {"name": "size", "symbols": [{"literal":"until"}, "expression"]},
    {"name": "size", "symbols": [{"literal":"while"}, "expression"]},
    {"name": "size", "symbols": ["expression_list"]},
    {"name": "parameter_list$ebnf$1", "symbols": []},
    {"name": "parameter_list$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "parameter"]},
    {"name": "parameter_list$ebnf$1", "symbols": ["parameter_list$ebnf$1", "parameter_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameter_list", "symbols": ["parameter", "parameter_list$ebnf$1"]},
    {"name": "parameter$ebnf$1$subexpression$1", "symbols": [{"literal":"="}, "expression"]},
    {"name": "parameter$ebnf$1", "symbols": ["parameter$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "parameter$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "parameter", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "parameter$ebnf$1"]},
    {"name": "expression_list$ebnf$1", "symbols": []},
    {"name": "expression_list$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "expression"]},
    {"name": "expression_list$ebnf$1", "symbols": ["expression_list$ebnf$1", "expression_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expression_list", "symbols": ["expression", "expression_list$ebnf$1"]},
    {"name": "expression", "symbols": ["or_expression"], "postprocess": id},
    {"name": "or_expression", "symbols": ["or_expression", {"literal":"or"}, "and_expression"], "postprocess": binary},
    {"name": "or_expression", "symbols": ["and_expression"], "postprocess": id},
    {"name": "and_expression", "symbols": ["and_expression", {"literal":"and"}, "bit_expression"], "postprocess": binary},
    {"name": "and_expression", "symbols": ["bit_expression"], "postprocess": id},
    {"name": "type_expression", "symbols": ["type_expression", {"literal":"is"}, "bit_expression"], "postprocess": binary},
    {"name": "type_expression", "symbols": ["bit_expression"], "postprocess": id},
    {"name": "bit_expression", "symbols": ["bit_expression", {"literal":"|"}, "eq_expression"], "postprocess": binary},
    {"name": "bit_expression", "symbols": ["bit_expression", {"literal":"&"}, "eq_expression"], "postprocess": binary},
    {"name": "bit_expression", "symbols": ["bit_expression", {"literal":"^"}, "eq_expression"], "postprocess": binary},
    {"name": "bit_expression", "symbols": ["eq_expression"], "postprocess": id},
    {"name": "eq_expression", "symbols": ["eq_expression", {"literal":"="}, "cmp_expression"], "postprocess": binary},
    {"name": "eq_expression", "symbols": ["eq_expression", {"literal":"!="}, "cmp_expression"], "postprocess": binary},
    {"name": "eq_expression", "symbols": ["cmp_expression"], "postprocess": id},
    {"name": "cmp_expression", "symbols": ["cmp_expression", {"literal":">"}, "shift_expression"], "postprocess": binary},
    {"name": "cmp_expression", "symbols": ["cmp_expression", {"literal":">="}, "shift_expression"], "postprocess": binary},
    {"name": "cmp_expression", "symbols": ["cmp_expression", {"literal":"<"}, "shift_expression"], "postprocess": binary},
    {"name": "cmp_expression", "symbols": ["cmp_expression", {"literal":"<="}, "shift_expression"], "postprocess": binary},
    {"name": "cmp_expression", "symbols": ["shift_expression"], "postprocess": id},
    {"name": "shift_expression", "symbols": ["shift_expression", {"literal":"<<"}, "add_expression"], "postprocess": binary},
    {"name": "shift_expression", "symbols": ["shift_expression", {"literal":">>"}, "add_expression"], "postprocess": binary},
    {"name": "shift_expression", "symbols": ["shift_expression", {"literal":">>>"}, "add_expression"], "postprocess": binary},
    {"name": "shift_expression", "symbols": ["add_expression"], "postprocess": id},
    {"name": "add_expression", "symbols": ["add_expression", {"literal":"+"}, "mul_expression"], "postprocess": binary},
    {"name": "add_expression", "symbols": ["add_expression", {"literal":"-"}, "mul_expression"], "postprocess": binary},
    {"name": "add_expression", "symbols": ["mul_expression"], "postprocess": id},
    {"name": "mul_expression", "symbols": ["mul_expression", {"literal":"*"}, "exp_expression"], "postprocess": binary},
    {"name": "mul_expression", "symbols": ["mul_expression", {"literal":"/"}, "exp_expression"], "postprocess": binary},
    {"name": "mul_expression", "symbols": ["exp_expression"], "postprocess": id},
    {"name": "exp_expression", "symbols": ["top_expression", {"literal":"**"}, "exp_expression"], "postprocess": binary},
    {"name": "exp_expression", "symbols": ["top_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": [{"literal":"~"}, "unary_expression"], "postprocess": unary},
    {"name": "unary_expression", "symbols": [{"literal":"-"}, "unary_expression"], "postprocess": unary},
    {"name": "unary_expression", "symbols": [{"literal":"not"}, "unary_expression"], "postprocess": unary},
    {"name": "unary_expression", "symbols": ["top_expression"], "postprocess": id},
    {"name": "top_expression", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "top_expression", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "top_expression", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "top_expression", "symbols": [{"literal":"nil"}]},
    {"name": "top_expression", "symbols": [{"literal":"("}, "expression", {"literal":")"}]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
