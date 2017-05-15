'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.emojify = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*!
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * react-emojione
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright(c) 2017 Pedro Ladaria
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * MIT Licensed
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Emoji provided free by http://emojione.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _asciiToUnicode = require('./data/ascii-to-unicode');

var _asciiToUnicode2 = _interopRequireDefault(_asciiToUnicode);

var _rendererFactory = require('./renderers/renderer-factory');

var _rendererFactory2 = _interopRequireDefault(_rendererFactory);

var _emojiFormatConversion = require('./utils/emoji-format-conversion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_OPTIONS = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    style: {
        backgroundImage: 'url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/sprites/emojione.sprites.png)'
    },
    onClick: undefined,
    output: 'emoji' // valid options: 'emoji', 'unicode'
};

var asciiToUnicodeCache = new Map();
var asciiRegExpToUnicode = new Map();

_asciiToUnicode2.default.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        reStr = _ref2[0],
        unicode = _ref2[1];

    return asciiRegExpToUnicode.set(RegExp(reStr), unicode);
});

// Escape RegExp code borrowed from lodash
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reHasRegExpChar = RegExp(reRegExpChar.source);
var escapeRegExp = function escapeRegExp(s) {
    return s && reHasRegExpChar.test(s) ? s.replace(reRegExpChar, '\\$&') : s;
};

var convertAsciiToUnicodeOrNull = function convertAsciiToUnicodeOrNull(text) {
    if (!text) {
        return '';
    }
    var str = String(text);
    if (asciiToUnicodeCache.has(str)) {
        return asciiToUnicodeCache.get(str);
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = asciiRegExpToUnicode.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                regExp = _step$value[0],
                unicode = _step$value[1];

            if (str.replace(regExp, unicode) === unicode) {
                asciiToUnicodeCache.set(str, unicode);
                return unicode;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return null;
};

var asciiRegexStr = _asciiToUnicode2.default.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        reStr = _ref4[0];

    return reStr;
}).join('|');
var unicodesRegexStr = _emojiFormatConversion.unicodes.map(escapeRegExp).join('|');
var shortnamesRegexStr = ':\\w+:';

var REGEX_CACHE = [];

var getRegex = function getRegex(withUnicode, withAscii, withShortnames) {
    var index = (withUnicode ? 1 : 0) + (withAscii ? 2 : 0) + (withShortnames ? 4 : 0);
    if (!REGEX_CACHE[index]) {
        var parts = [withShortnames ? shortnamesRegexStr : '', withUnicode ? unicodesRegexStr : '', withAscii ? asciiRegexStr : ''].filter(Boolean);
        REGEX_CACHE[index] = RegExp('(' + parts.join('|') + ')');
    }
    return REGEX_CACHE[index];
};

var startsWithSpace = function startsWithSpace(str) {
    return (/^\s/.test(str)
    );
};
var endsWithSpace = function endsWithSpace(str) {
    return (/\s$/.test(str)
    );
};

var shouldConvertAscii = function shouldConvertAscii(parts, index) {
    if (parts.length === 1) {
        return true;
    }
    if (index === 0) {
        return startsWithSpace(parts[index + 1]);
    }
    if (index === parts.length - 1) {
        return endsWithSpace(parts[index - 1]);
    }
    return endsWithSpace(parts[index - 1]) && startsWithSpace(parts[index + 1]);
};

var emojify = exports.emojify = function emojify(str) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);

    var convertShortnames = mergedOptions.convertShortnames,
        convertUnicode = mergedOptions.convertUnicode,
        convertAscii = mergedOptions.convertAscii;


    var regExp = getRegex(convertUnicode, convertAscii, convertShortnames);

    var renderCodepoint = (0, _rendererFactory2.default)(mergedOptions);

    var convertedParts = str.split(regExp).filter(Boolean).map(function (part, index, parts) {
        if (convertAscii && shouldConvertAscii(parts, index)) {
            var unicode = convertAsciiToUnicodeOrNull(part);
            if (unicode) {
                return renderCodepoint(_emojiFormatConversion.unicodeToCodepoint.get(unicode), 'a-' + index);
            }
        }
        if (convertShortnames && _emojiFormatConversion.shortToCodepoint.has(part)) {
            return renderCodepoint(_emojiFormatConversion.shortToCodepoint.get(part), 's-' + index);
        }
        if (convertUnicode && _emojiFormatConversion.unicodeToCodepoint.has(part)) {
            return renderCodepoint(_emojiFormatConversion.unicodeToCodepoint.get(part), 'u-' + index);
        }
        return part;
    });

    return mergedOptions.output === 'unicode' ? convertedParts.join('') : convertedParts;
};

var Emojify = function (_React$Component) {
    _inherits(Emojify, _React$Component);

    function Emojify() {
        _classCallCheck(this, Emojify);

        return _possibleConstructorReturn(this, (Emojify.__proto__ || Object.getPrototypeOf(Emojify)).apply(this, arguments));
    }

    _createClass(Emojify, [{
        key: 'traverse',
        value: function traverse(children, options) {
            var _this2 = this;

            return _react2.default.Children.map(children, function (child) {
                if (_react2.default.isValidElement(child)) {
                    return _react2.default.cloneElement(child, {}, _this2.traverse(child.props.children, options));
                }
                if (typeof child === 'string') {
                    return emojify(child, options);
                }
                return child;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;
            return _react2.default.Children.count(children) ? _react2.default.createElement('span', {}, this.traverse(children, this.props)) : null;
        }
    }]);

    return Emojify;
}(_react2.default.Component);

exports.default = Emojify;