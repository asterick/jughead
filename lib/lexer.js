const sever = require("sever-tokens");

const lexer = sever.compile({
    WhiteSpace:  { match: /\s+/, lineBreaks: true, discard: true },
    Comment: { match: /#(?![\n\r].)*(\n\r?|\r\n?)/, lineBreaks: true, discard: true },
    Number: { match: /\d+\.\d*|\d*\.\d+|\d+/, value: (v) => Number(v) },
    Container: {
        match: ["[", "]", "(", ")"]
    },
    Operator: {
        match: [
            "**", "*", "/", "+", "-",
            "^", "&", "|", "~", "<<", ">>", ">>>",
            ">", "<", ">=", "<=", "!=", "=",
            "...",
            "and", "or", "not"
        ],
        wordBound: true
    },
    Keyword: {
        match: [
            "require", "define", "section", "struct",
            "ref", "internal", "fill", "grow", "until", "while", "nil",
            "const"
        ],
        wordBound: true
    },
    Identifer: /\w+/,
});

module.exports = lexer;
