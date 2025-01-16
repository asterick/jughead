const sever = require("sever-tokens");

console.log(sever);

const lexer = sever.compile({
    WhiteSpace:  { match: /\s+/, lineBreaks: true, discard: true },
    Number: { match: /\d+\.\d*|\d*\.\d+|\d+/, value: (v) => Number(v) },
    Keyword: {
        match: [
            "require", "define", "section", "struct",
            "ref", "internal", "fill", "until", "while", "nil",
            "and", "or", "not", "const"
        ],
        wordBound: true
    },
    Identifer: /\w+/,
    Operator: {
        match: [
            "[", "]", "(", ")",
            "**", "*", "/", "+", "-",
            "^", "&", "|", "~", "<<", ">>", ">>>",
            ">", "<", ">=", "<=", "!=", "="
        ]
    },
});

module.exports = lexer;
