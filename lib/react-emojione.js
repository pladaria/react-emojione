'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.emojify = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*!
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * react-emojione
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright(c) 2016 Pedro Ladaria
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * MIT Licensed
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * This library uses Emojione
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * http://emojione.com/mallorca-
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


var _asciiToUnicode = require('./data/ascii-to-unicode');

var _asciiToUnicode2 = _interopRequireDefault(_asciiToUnicode);

var _rendererFactory = require('./renderers/renderer-factory');

var _rendererFactory2 = _interopRequireDefault(_rendererFactory);

var _emojiFormatConversion = require('./utils/emoji-format-conversion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
        backgroundImage: 'url(emojione.sprites.png)'
    },
    handleClick: undefined,
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

var asciiRegexStr = _asciiToUnicode2.default.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        reStr = _ref4[0];

    return reStr;
}).join('|');

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

var RE_SHORTNAMES_UNICODES = RegExp('(:\\w+:|' + _emojiFormatConversion.unicodes.map(escapeRegExp).join('|') + ')');
var RE_SHORTNAMES_UNICODES_ASCII = RegExp('(:\\w+:|' + _emojiFormatConversion.unicodes.map(escapeRegExp).join('|') + '|' + asciiRegexStr + ')');

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


    var regExp = convertAscii ? RE_SHORTNAMES_UNICODES_ASCII : RE_SHORTNAMES_UNICODES;

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

exports.default = {
    emojify: emojify
};