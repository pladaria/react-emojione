import positions from './emojione-sprite-positions'

const defaults = codepoint => ({
  textIndent: '-9999em',
  imageRendering: 'optimizeQuality',
  fontSize: 'inherit',
  height: '1.3em',
  width: '1.3em',
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

export default (codepoint, style = {}) => Object.assign({}, defaults(codepoint), style);
