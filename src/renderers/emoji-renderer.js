import React from 'react';
import {sprite} from '../styles/emojione-sprite';
import {codepointToShort, codepointToUnicode} from '../utils/emoji-format-conversion';

const Emoji = ({codepoint, style = {}, onClick, ariaLabel}) => {
    const shortCodepoint = codepointToShort.get(codepoint);
    
    return (
        <span
            onClick={onClick}
            style={sprite(codepoint, style)}
            title={shortCodepoint}
            role='img'
            aria-label={ariaLabel || shortCodepoint}
        >
            {codepointToUnicode.get(codepoint)}
        </span>  
    );
};

const getRenderer = ({style, onClick, ...props}) => (codepoint, key) => (
    <Emoji
        codepoint={codepoint}
        style={style}
        onClick={onClick}
        ariaLabel={props['aria-label']}
        key={key}
    />
);

export default getRenderer;
