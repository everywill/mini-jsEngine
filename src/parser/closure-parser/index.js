const FunctionParser = require('../function-parser')
const { overridePrimary } = require('./override')

// " fun " paramlist block | ( "(" expr ")" | NUMBER | IDENTIFIER | STRING ) { postfix }
@overridePrimary
class ClosureParser extends FunctionParser {
}

module.exports = ClosureParser
