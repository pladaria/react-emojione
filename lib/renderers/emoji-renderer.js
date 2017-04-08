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
        _ref$customStyles = _ref.customStyles,
        customStyles = _ref$customStyles === undefined ? {} : _ref$customStyles,
        handleClick = _ref.handleClick;
    return _react2.default.createElement(
        'span',
        {
            onClick: handleClick,
            style: (0, _emojioneSprite.sprite)(codepoint, customStyles),
            title: _emojiFormatConversion.codepointToShort.get(codepoint)
        },
        _emojiFormatConversion.codepointToUnicode.get(codepoint)
    );
};

var getRenderer = function getRenderer(_ref2) {
    var styles = _ref2.styles,
        handleClick = _ref2.handleClick;
    return function (codepoint, key) {
        return _react2.default.createElement(Emoji, {
            codepoint: codepoint,
            customStyles: styles,
            handleClick: handleClick,
            key: key
        });
    };
};

exports.default = getRenderer;