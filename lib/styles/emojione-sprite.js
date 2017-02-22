'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sprite = undefined;

var _emojioneSpritePositions = require('./emojione-sprite-positions');

var _emojioneSpritePositions2 = _interopRequireDefault(_emojioneSpritePositions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spriteSize = 2794;
var defaults = function defaults(codepoint, scale) {
    console.log(scale);
    var pos = _emojioneSpritePositions2.default[codepoint];
    var size = scale * 64;
    var posX = pos.x * scale;
    var posY = pos.y * scale;
    var precent = scale * spriteSize;

    return {
        textIndent: '-9999em',
        imageRendering: 'optimizeQuality',
        fontSize: 'inherit',
        height: size + 'px',
        width: size + 'px',
        top: '-3px',
        position: 'relative',
        display: 'inline-block',
        margin: '0 .15em',
        lineHeight: 'normal',
        verticalAlign: 'middle',
        backgroundImage: 'url("assets/emojione.sprites.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: posX + 'px  ' + posY + 'px',
        backgroundSize: precent + 'px'
    };
};

var sprite = exports.sprite = function sprite(codepoint, size) {
    var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    var scale = size ? size / 64 : 0.5;

    return Object.assign({}, defaults(codepoint, scale), style);
};

exports.default = {
    sprite: sprite
};