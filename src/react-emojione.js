/*!
 * react-emojione
 * Copyright(c) 2015 Pedro Ladaria
 * MIT Licensed
 */
import React from 'react';
import styles from './styles/emojione-sprite';
import EMOJI_DATA from './data/emoji-data';
import ASCII_DATA from './data/ascii-to-unicode';

const DEFAULT_OPTIONS = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
        backgroundImage: 'url(emojione.sprites.png)'
    },
    handleClick: undefined
};

const unicodes = [];
const codepointToShort = new Map();
const shortToCodepoint = new Map();
const codepointToUnicode = new Map();
const unicodeToCodepoint = new Map();
const asciiToUnicodeCache = new Map();
const asciiRegExpToUnicode = new Map();

EMOJI_DATA.forEach(([codepoint, unicode, shortname]) => {
    unicodes.push(unicode);
    codepointToShort.set(codepoint, shortname);
    shortToCodepoint.set(shortname, codepoint);
    codepointToUnicode.set(codepoint, unicode);
    unicodeToCodepoint.set(unicode, codepoint);
});

ASCII_DATA.forEach(([regExpStr, unicode]) => asciiRegExpToUnicode.set(RegExp(regExpStr), unicode));

const asciiRegexStr = ASCII_DATA.map(([reStr, unicode]) => reStr).join('|');

const convertAsciiToUnicode = text => {
    if (!text) {
        return '';
    }
    const str = String(text);
    if (asciiToUnicodeCache.has(str)) {
        return asciiToUnicodeCache.get(str);
    }
    for (let [regExp, unicode] of asciiRegExpToUnicode.entries()) {
        if (str.replace(regExp, unicode) === unicode) {
            asciiToUnicodeCache.set(str, unicode);
            return unicode;
        }
    }
    return str;
};

const RE_SHORTNAMES_UNICODES = RegExp('(:\\w+:|' + unicodes.join('|') + ')');
const RE_SHORTNAMES_UNICODES_ASCII = RegExp('(:\\w+:|' + unicodes.join('|') + '|' + asciiRegexStr + ')');

const Emoji = ({codepoint, customStyles = {}, handleClick}) => (
    <span
        onClick={handleClick}
        style={styles.sprite(codepoint, customStyles)}
        title={codepointToShort.get(codepoint)}
    >
        {codepointToUnicode.get(codepoint)}
    </span>
);

export const emojify = (str, options = {}, handleClick) => {
    const opt = Object.assign({}, DEFAULT_OPTIONS, options);
    const re = opt.convertAscii ? RE_SHORTNAMES_UNICODES_ASCII : RE_SHORTNAMES_UNICODES;
    return str.split(re).map((part, index) => {
        if (opt.convertAscii) {
            const unicode = convertAsciiToUnicode(part);
            if (unicodeToCodepoint.has(unicode)) {
                return (
                    <Emoji
                        codepoint={unicodeToCodepoint.get(unicode)}
                        customStyles={opt.styles}
                        handleClick={opt.handleClick}
                        key={`a-${index}`}
                    />
                );
            }
        }
        if (opt.convertShortnames && shortToCodepoint.has(part)) {
            return (
                <Emoji
                    codepoint={shortToCodepoint.get(part)}
                    customStyles={opt.styles}
                    handleClick={opt.handleClick}
                    key={`s-${index}`}
                />
            );
        }
        if (opt.convertUnicode && unicodeToCodepoint.has(part)) {
            return (
                <Emoji
                    codepoint={unicodeToCodepoint.get(part)}
                    customStyles={opt.styles}
                    handleClick={opt.handleClick}
                    key={`u-${index}`}
                />
            );
        }
        return part;
    });
};

export default {
    emojify
};
