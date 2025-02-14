const sever = require("sever-tokens");

function toNumber(value, base=10) {
    for (let i = 0; i < arguments.length; i++) console.log(arguments);
    const [ whole, fraction ] = value.split(".");

    return parseInt(whole, base) + 
        (fraction ? parseInt(fraction, base) / (base ** fraction.length) : 0)
}

const lexer = sever.compile({
    whitespace:  { match: /\s+/, lineBreaks: true, discard: true },
    comment: { match: /#(?![\n\r].)*(\n\r?|\r\n?)/, lineBreaks: true },

    number: [
        { match: /(?:0[bB])([01]+\.[01]*|[01]*\.[01]+|[01]+)/, value: (v) => toNumber(v, 2) },
        { match: /(?:0[oO])([0-7]+\.[0-7]*|[0-7]*\.[0-7]+|[0-7]+)/, value: (v) => toNumber(v, 8) },
        { match: /(?:0[xX])([0-9a-f]+\.[0-9a-fA-F]*|[0-9a-fA-F]*\.[0-9a-fA-F]+|[0-9a-fA-F]+)/, value: (v) => toNumber(v, 16) },
        { match: /(?:0[dD])?(\d+\.\d*|\d*\.\d+|\d+)/, value: (v) => Number(v) }
    ],
    string: [
        { match: /"((?!["\n\r]).)*"/, value: JSON.parse },
        { match: /'((?!['\n\r]).)*'/, value: JSON.parse }
    ],
    unclosed_string: { match: /['"]/, error: true },

    container: {
        match: ["[", "]", "(", ")"]
    },
    operator: {
        match: [
            "**", "*", "/", "+", "-",
            "^", "&", "|", "~", "<<", ">>", ">>>",
            ">", "<", ">=", "<=", "!=", "=",
            "...",
            "and", "or", "not", "is"
        ],
        wordBound: true
    },
    keyword: {
        match: [
            "import",
            "def", "section", "struct", "const", "ref",
            "public", "internal",
            "terminator", "until", "while", "index", "offset",
            "nil",
        ],
        wordBound: true
    },
    identifier: /[_a-zA-Z][_a-zA-Z0-9]*/,
});

module.exports = lexer;
