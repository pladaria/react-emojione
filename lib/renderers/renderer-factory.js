'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _emojiRenderer = require('./emoji-renderer');

var _emojiRenderer2 = _interopRequireDefault(_emojiRenderer);

var _unicodeRenderer = require('./unicode-renderer');

var _unicodeRenderer2 = _interopRequireDefault(_unicodeRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rendererForOutputFormat = {
    emoji: _emojiRenderer2.default,
    unicode: _unicodeRenderer2.default
};

var getRenderer = function getRenderer(config) {
    var renderer = rendererForOutputFormat[config.output] || rendererForOutputFormat.emoji;
    return renderer(config);
};

exports.default = getRenderer;