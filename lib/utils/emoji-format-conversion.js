'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unicodeToCodepoint = exports.codepointToUnicode = exports.shortToCodepoint = exports.codepointToShort = exports.unicodes = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _emojiData = require('../data/emoji-data');

var _emojiData2 = _interopRequireDefault(_emojiData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unicodes = exports.unicodes = [];
var codepointToShort = exports.codepointToShort = new Map();
var shortToCodepoint = exports.shortToCodepoint = new Map();
var codepointToUnicode = exports.codepointToUnicode = new Map();
var unicodeToCodepoint = exports.unicodeToCodepoint = new Map();

_emojiData2.default.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        codepoint = _ref2[0],
        unicode = _ref2[1],
        shortname = _ref2[2];

    unicodes.push(unicode);
    codepointToShort.set(codepoint, shortname);
    shortToCodepoint.set(shortname, codepoint);
    codepointToUnicode.set(codepoint, unicode);
    unicodeToCodepoint.set(unicode, codepoint);
});