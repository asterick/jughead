const sever = require("sever-tokens");

console.log(sever);

const lexer = sever.compile({
    WhiteSpace:  { match: /\s+/, lineBreaks: true },
    Number: { match: /\d+\.\d*|\d*\.\d+|\d+/, value: (v) => Number(v) },
    Keyword: {
        match: [
            "and",   "break", "do",       "else",  "elseif", "end",
            "false", "for",   "function", "goto",  "if",     "in",
            "local", "nil",   "not",      "or",    "repeat", "return",
            "then",  "true",  "until",    "while",
        ],
        wordBound: true
    },
    Tuple: { match: /(\w+),(\w+),(\w+)/, value: (token, ... groups) => groups  },
    Identifer: /\w+/,
    LeftParen: '(',
    RightParn: ')',
    String: { match: /\[(?<smark>.*?)\[(?<string>(?:(?!\]\k<smark>\])\\?.)*)\]\k<smark>\]/, value: (token, groups) => groups.string },
    LuaComment: /--\[(?<cmark>.*?)\[(?<content>(?:(?!\]\k<cmark>\])\\?.)*)\]\k<cmark>\]/
});

module.exports = lexer;
