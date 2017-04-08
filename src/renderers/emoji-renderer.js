import React from 'react';
import {sprite} from '../styles/emojione-sprite';
import {codepointToShort, codepointToUnicode} from '../utils/emoji-format-conversion';

const Emoji = ({codepoint, style = {}, onClick}) => (
    <span
        onClick={onClick}
        style={sprite(codepoint, style)}
        title={codepointToShort.get(codepoint)}
    >
        {codepointToUnicode.get(codepoint)}
    </span>
);

const getRenderer = ({style, onClick}) => (codepoint, key) => (
    <Emoji
        codepoint={codepoint}
        style={style}
        onClick={onClick}
        key={key}
    />
);

export default getRenderer;
