const nearley = require("nearley");
const grammar = require("./grammar.js");

module.exports = {
    main: () => new nearley.Parser(nearley.Grammar.fromCompiled(grammar)),
}
