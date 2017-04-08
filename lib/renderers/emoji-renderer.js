'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _emojioneSprite = require('../styles/emojione-sprite');

var _emojiFormatConversion = require('../utils/emoji-format-conversion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emoji = function Emoji(_ref) {
    var codepoint = _ref.codepoint,
        _ref$style = _ref.style,
        style = _ref$style === undefined ? {} : _ref$style,
        onClick = _ref.onClick;
    return _react2.default.createElement(
        'span',
        {
            onClick: onClick,
            style: (0, _emojioneSprite.sprite)(codepoint, style),
            title: _emojiFormatConversion.codepointToShort.get(codepoint)
        },
        _emojiFormatConversion.codepointToUnicode.get(codepoint)
    );
};

var getRenderer = function getRenderer(_ref2) {
    var style = _ref2.style,
        onClick = _ref2.onClick;
    return function (codepoint, key) {
        return _react2.default.createElement(Emoji, {
            codepoint: codepoint,
            style: style,
            onClick: onClick,
            key: key
        });
    };
};

exports.default = getRenderer;