'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _emojioneSprite = require('../styles/emojione-sprite');

var _emojioneSprite2 = _interopRequireDefault(_emojioneSprite);

var _emojiFormatConversion = require('../utils/emoji-format-conversion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emoji = function Emoji(_ref) {
    var codepoint = _ref.codepoint,
        size = _ref.size,
        _ref$customStyles = _ref.customStyles,
        customStyles = _ref$customStyles === undefined ? {} : _ref$customStyles,
        handleClick = _ref.handleClick;
    return _react2.default.createElement(
        'span',
        {
            onClick: handleClick,
            style: _emojioneSprite2.default.sprite(codepoint, size, customStyles),
            title: _emojiFormatConversion.codepointToShort.get(codepoint)
        },
        _emojiFormatConversion.codepointToUnicode.get(codepoint)
    );
};

var getRenderer = function getRenderer(_ref2) {
    var styles = _ref2.styles,
        size = _ref2.size,
        handleClick = _ref2.handleClick;
    return function (codepoint, key) {
        return _react2.default.createElement(Emoji, {
            size: size,
            codepoint: codepoint,
            customStyles: styles,
            handleClick: handleClick,
            key: key
        });
    };
};

exports.default = getRenderer;