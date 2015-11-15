/*!
 * react-emojione
 * Copyright(c) 2015 Pedro Ladaria
 * MIT Licensed
 */
import React from 'react';
import data from './data/emoji-data';
import styles from './styles/emojione-sprite';

const DEFAULT_OPTIONS = {
    convertShortnames: true,
    convertUnicode: true
};

const DEFAULT_STYLE = {
    backgroundImage: 'url("emojione.sprites.png")'
};

const unicodes = [];
const codepointToShort = new Map();
const shortToCodepoint = new Map();
const codepointToUnicode = new Map();
const unicodeToCodepoint = new Map();


data.forEach(([codepoint, unicode, shortname]) => {
    unicodes.push(unicode);
    codepointToShort.set(codepoint, shortname);
    shortToCodepoint.set(shortname, codepoint);
    codepointToUnicode.set(codepoint, unicode);
    unicodeToCodepoint.set(unicode, codepoint);
});

const RE_SHORTNAMES_UNICODES = RegExp('(:\\w+:|' + unicodes.join('|') + ')');

const Emoji = ({codepoint, style = {}, handleClick}) => (
    <span
        onClick={handleClick}
        style={styles.sprite(codepoint, style)}
        title={codepointToShort.get(codepoint)}
    >
        {codepointToUnicode.get(codepoint)}
    </span>
);

export const emojify = (str, options = {}, style = {}, handleClick) => {

    const {convertShortnames, convertUnicode} = Object.assign({}, DEFAULT_OPTIONS, options);
    const styleProp = Object.assign({}, DEFAULT_STYLE, style);

    return str.split(RE_SHORTNAMES_UNICODES).map((part, index) => {
        if (convertShortnames && shortToCodepoint.has(part)) {
            return (
                <Emoji
                    codepoint={shortToCodepoint.get(part)}
                    key={`s-${index}`}
                    handleClick={handleClick}
                    style={styleProp}
                />
            );
        } else if (convertUnicode && unicodeToCodepoint.has(part)) {
            return (
                <Emoji
                    codepoint={unicodeToCodepoint.get(part)}
                    key={`u-${index}`}
                    handleClick={handleClick}
                    style={styleProp}
                />
            );
        }
        return part;
    });
};

export default {
    emojify
};
