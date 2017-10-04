import positions from './emojione-sprite-positions';

const SPRITE_WIDTH = 4160;
const EMOJI_SIZE = 64;

const base = {
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
    backgroundImage: 'url("https://github.com/pladaria/react-emojione/blob/emojione3/assets/sprites/emojione-3.1.2-64x64.png?raw=true")',
    backgroundRepeat: 'no-repeat',
};

export const sprite = (codepoint, style = {}) => {
    const result = Object.assign({}, base, style);

    // ensure square size
    const size = parseInt(result.height);
    result.height = size;
    result.width = size;

    const scale = size / EMOJI_SIZE;
    const [x, y] = positions[codepoint] || [];
    const left = x * EMOJI_SIZE + x;
    const top = y * EMOJI_SIZE + y;

    result.backgroundPosition = `-${left * scale}px -${top * scale}px`;

    result.backgroundSize = `${SPRITE_WIDTH * scale}px`;

    return result;
};
