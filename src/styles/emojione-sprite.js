import positions from './emojione-sprite-positions';

const defaults = codepoint => ({
    textIndent: '-9999em',
    imageRendering: 'optimizeQuality',
    fontSize: 'inherit',
    height: '1.5em',
    width: '1.5em',
    top: '-3px',
    position: 'relative',
    display: 'inline-block',
    margin: '0 .15em',
    lineHeight: 'normal',
    verticalAlign: 'middle',
    backgroundImage: 'url("assets/emojione.sprites.png")',
    backgroundSize: '3600%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: positions[codepoint]
});

export const sprite = (codepoint, style = {}) => Object.assign({}, defaults(codepoint), style);
