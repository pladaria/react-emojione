import React from 'react';
import styles from '../styles/emojione-sprite';
import {codepointToShort, codepointToUnicode} from '../utils/emoji-format-conversion';

const Emoji = ({codepoint, size, customStyles = {}, handleClick}) => (
    <span
        onClick={handleClick}
        style={styles.sprite(codepoint,size,  customStyles)}
        title={codepointToShort.get(codepoint)}
    >
        {codepointToUnicode.get(codepoint)}
    </span>
);

const getRenderer = ({styles, size,  handleClick}) => (codepoint, key) => (
    <Emoji
        size={size}
        codepoint={codepoint}
        customStyles={styles}
        handleClick={handleClick}
        key={key}
    />
);


export default getRenderer;
