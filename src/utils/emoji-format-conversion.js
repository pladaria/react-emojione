import EMOJI_DATA from '../data/emoji-data';

export const unicodes = [];
export const codepointToShort = new Map();
export const shortToCodepoint = new Map();
export const codepointToUnicode = new Map();
export const unicodeToCodepoint = new Map();

EMOJI_DATA.forEach(([codepoint, shortnames, unicode]) => {
    unicodes.push(unicode);
    shortnames.slice().reverse().forEach(shortname => {
        codepointToShort.set(codepoint, shortname);
        shortToCodepoint.set(shortname, codepoint);
    });
    codepointToUnicode.set(codepoint, unicode);
    unicodeToCodepoint.set(unicode, codepoint);
});
