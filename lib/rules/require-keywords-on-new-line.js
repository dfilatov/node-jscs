var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {

    configure: function(keywords) {
        assert(Array.isArray(keywords), 'require_keywords_on_new_line option requires array value');
        this._keywordIndex = {};
        for (var i = 0, l = keywords.length; i < l; i++) {
            this._keywordIndex[keywords[i]] = true;
        }
    },

    getOptionName: function () {
        return 'require_keywords_on_new_line';
    },

    check: function(file, errors) {
        var keywordIndex = this._keywordIndex;
        var tokens = file.getTokens();
        for (var i = 0, l = tokens.length; i < l; i++) {
            var token = tokens[i];
            if (token.type === 'Keyword' && keywordIndex[token.value]) {
                var prevToken = tokens[i - 1];
                if (prevToken && prevToken.loc.end.line === token.loc.start.line) {
                    errors.add(
                        'Keyword `' + token.value + '` should be placed on new line',
                        token.loc.start.line,
                        token.loc.start.column
                    );
                }
            }
        }
    }

};
