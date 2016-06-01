/*!
 * react-emojione
 * Copyright(c) 2016 Pedro Ladaria
 * MIT Licensed
 */
import ASCII_DATA from './data/ascii-to-unicode';
import getRenderer from './renderers/renderer-factory';
import {
    unicodes,
    shortToCodepoint,
    unicodeToCodepoint,
} from './utils/emoji-format-conversion';

const DEFAULT_OPTIONS = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
        backgroundImage: 'url(emojione.sprites.png)'
    },
    handleClick: undefined,
    output: 'emoji' // valid options: 'emoji', 'unicode'
};

const asciiToUnicodeCache = new Map();
const asciiRegExpToUnicode = new Map();

ASCII_DATA.forEach(([reStr, unicode]) => asciiRegExpToUnicode.set(RegExp(reStr), unicode));

const asciiRegexStr = ASCII_DATA.map(([reStr, ]) => reStr).join('|');

const convertAsciiToUnicodeOrNull = text => {
    if (!text) {
        return '';
    }
    const str = String(text);
    if (asciiToUnicodeCache.has(str)) {
        return asciiToUnicodeCache.get(str);
    }
    for (const [regExp, unicode] of asciiRegExpToUnicode.entries()) {
        if (str.replace(regExp, unicode) === unicode) {
            asciiToUnicodeCache.set(str, unicode);
            return unicode;
        }
    }
    return null;
};

const RE_SHORTNAMES_UNICODES = RegExp(`(:\\w+:|${unicodes.join('|')})`);
const RE_SHORTNAMES_UNICODES_ASCII = RegExp(`(:\\w+:|${unicodes.join('|')}|${asciiRegexStr})`);

const startsWithSpace = str => (/^\s/).test(str);
const endsWithSpace = str => (/\s$/).test(str);

const shouldConvertAscii = (parts, index) => {
    if (parts.length === 1) {
        return true;
    }
    if (index === 0) {
        return startsWithSpace(parts[index + 1]);
    }
    if (index === parts.length - 1) {
        return endsWithSpace(parts[index - 1]);
    }
    return endsWithSpace(parts[index - 1]) && startsWithSpace(parts[index + 1]);
};

export const emojify = (str, options = {}) => {

    const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);

    const {convertShortnames, convertUnicode, convertAscii} = mergedOptions;

    const regExp = convertAscii ? RE_SHORTNAMES_UNICODES_ASCII : RE_SHORTNAMES_UNICODES;

    const renderCodepoint = getRenderer(mergedOptions);

    const convertedParts = str.split(regExp).filter(Boolean).map((part, index, parts) => {
        if (convertAscii && shouldConvertAscii(parts, index)) {
            const unicode = convertAsciiToUnicodeOrNull(part);
            if (unicode) {
                return renderCodepoint(unicodeToCodepoint.get(unicode), `a-${index}`);
            }
        }
        if (convertShortnames && shortToCodepoint.has(part)) {
            return renderCodepoint(shortToCodepoint.get(part), `s-${index}`);
        }
        if (convertUnicode && unicodeToCodepoint.has(part)) {
            return renderCodepoint(unicodeToCodepoint.get(part), `u-${index}`);
        }
        return part;
    });

    return mergedOptions.output === 'unicode' ? convertedParts.join('') : convertedParts;
};

export default {
    emojify
};
