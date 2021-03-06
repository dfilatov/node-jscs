var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {

    configure: function(operators) {
        assert(Array.isArray(operators), 'disallow_right_sticked_operators option requires array value');
        this._operatorIndex = {};
        for (var i = 0, l = operators.length; i < l; i++) {
            this._operatorIndex[operators[i]] = true;
        }
    },

    getOptionName: function () {
        return 'disallow_right_sticked_operators';
    },

    check: function(file, errors) {
        var operators = this._operatorIndex;
        var tokens = file.getTokens();
        for (var i = 0, l = tokens.length; i < l; i++) {
            var token = tokens[i];
            if (token.type === 'Punctuator' && operators[token.value]) {
                var nextToken = tokens[i + 1];
                if (nextToken && nextToken.range[0] === token.range[1]) {
                    errors.add(
                        'Operator ' + token.value + ' should not stick to following expression',
                        token.loc.start
                    );
                }
            }
        }
    }

};
