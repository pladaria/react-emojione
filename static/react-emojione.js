import React from 'react';
import 'babel-es6-polyfill/polyfill';
import EmojiData from './emoji-data';

const objectSwap = obj => {
    let result = {}
    Object.keys(obj).forEach(k => result[obj[k]] = k);
    return result;
};

const SHORT_TO_CODEPOINT = Object.keys(EmojiData).reduce((res, key) => {
    res[EmojiData[key].shortname] = EmojiData[key].unicode;
    return res;
}, {});

const CODEPOINT_TO_SHORT = objectSwap(SHORT_TO_CODEPOINT);

const UNICODE_TO_CODEPOINT = Object.keys(EmojiData)
    .map(key => EmojiData[key].unicode)
    .sort((a, b) => b.length - a.length)
    .reduce((res, codepoints) => {
        const unicode = String.fromCodePoint(...codepoints.split('-').map(code => parseInt(code, 16)));
        res[unicode] = codepoints;
        return res;
    }, {});

const CODEPOINT_TO_UNICODE = objectSwap(UNICODE_TO_CODEPOINT);

const SHORTNAMES = Object.keys(SHORT_TO_CODEPOINT);
const UNICODES = Object.keys(UNICODE_TO_CODEPOINT);

const RE_SHORTNAMES = new RegExp('(' + SHORTNAMES.join('|') + ')');
const RE_UNICODES = new RegExp('(' + UNICODES.join('|') + ')');
const RE_SHORTNAMES_UNICODES = RegExp('(' + UNICODES.concat(SHORTNAMES).join('|') + ')');

const defaultOptions = {
    shortname: true,
    unicode: true
};

const Emoji = ({codepoint}) => (
    <span
        className={`emojione-${codepoint}`}
        title={CODEPOINT_TO_SHORT[codepoint]}
    >
        {CODEPOINT_TO_UNICODE[codepoint]}
    </span>
);

const emojify = (str, options = {}) => {
    const opt = Object.assign({}, options, defaultOptions);
    return str.split(RE_SHORTNAMES_UNICODES).map((part, index) => {
        const key = `${part}_${index}`;
        if (opt.shortname && SHORT_TO_CODEPOINT[part]) {
            return <Emoji key={key} codepoint={SHORT_TO_CODEPOINT[part]} />
        } else if (opt.unicode && UNICODE_TO_CODEPOINT[part]) {
            return <Emoji key={key} codepoint={UNICODE_TO_CODEPOINT[part]} />
        }
        return part;
    });
};

export default {
    emojify
};
