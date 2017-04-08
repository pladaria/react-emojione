'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sprite = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _emojioneSpritePositions = require('./emojione-sprite-positions');

var _emojioneSpritePositions2 = _interopRequireDefault(_emojioneSpritePositions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPRITE_SIZE = 2794;
var EMOJI_SIZE = 64;

var base = {
    textIndent: '-9999em',
    imageRendering: 'optimizeQuality',
    fontSize: 'inherit',
    height: 32,
    width: 32,
    top: -3,
    position: 'relative',
    display: 'inline-block',
    margin: '0 .15em',
    lineHeight: 'normal',
    verticalAlign: 'middle',
    backgroundImage: 'url("https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/sprites/emojione.sprites.png")',
    backgroundRepeat: 'no-repeat'
};

var sprite = exports.sprite = function sprite(codepoint) {
    var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var result = Object.assign({}, base, style);

    // ensure square size
    var size = parseInt(result.height);
    result.height = size;
    result.width = size;

    var scale = size / EMOJI_SIZE;

    var _positions$codepoint = _slicedToArray(_emojioneSpritePositions2.default[codepoint], 2),
        left = _positions$codepoint[0],
        top = _positions$codepoint[1];

    result.backgroundPosition = left * scale + 'px ' + top * scale + 'px';

    var bgSize = SPRITE_SIZE * scale;
    result.backgroundSize = bgSize + 'px ' + bgSize + 'px';

    return result;
};