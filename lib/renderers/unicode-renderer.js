'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emojiFormatConversion = require('../utils/emoji-format-conversion');

var getRenderer = function getRenderer() {
  return function (codepoint) {
    return _emojiFormatConversion.codepointToUnicode.get(codepoint);
  };
};

exports.default = getRenderer;