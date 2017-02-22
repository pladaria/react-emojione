import positions from './emojione-sprite-positions';
const spriteSize=2794;
const defaults = (codepoint, scale) =>{
    console.log(scale);
    let pos =positions[codepoint];
    let size = scale * 64;         
    let posX = pos.x * scale; 
    let posY  = pos.y * scale; 
    let precent = scale * spriteSize; 

    return {
        textIndent: '-9999em',
        imageRendering: 'optimizeQuality',
        fontSize: 'inherit',
        height: `${size}px`,
        width: `${size}px`,
        top: '-3px',
        position: 'relative',
        display: 'inline-block',
        margin: '0 .15em',
        lineHeight: 'normal',
        verticalAlign: 'middle',
        backgroundImage: 'url("assets/emojione.sprites.png")',
        backgroundRepeat: 'no-repeat',    
        backgroundPosition:`${posX}px  ${posY}px` ,
        backgroundSize:`${precent}px`
    };
};


export const sprite = (codepoint,size ,style = {}) =>{
    
    let scale = size ?  (size/64)   : 0.5;
    
 return Object.assign({}, defaults(codepoint, scale), style);
}

export default {
    sprite
};
