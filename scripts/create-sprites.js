/* eslint no-console:off */
const Canvas = require('canvas');
const {join} = require('path');
const {writeFileSync, readFileSync} = require('fs');
const emojiDataArray = require('../src/data/emoji-data');
const emojiShortnames = require('emoji-shortnames');

const EMOJIS_PER_ROW = 64;

const sets = [
    {
        size: 32,
        padding: 1,
        src: join(__dirname, '../assets/emojione-3.0-32x32'),
        out: join(__dirname, '../assets/sprites/emojione-3.0-32x32.png'),
    },
    {
        size: 64,
        padding: 1,
        src: join(__dirname, '../assets/emojione-3.0-64x64'),
        out: join(__dirname, '../assets/sprites/emojione-3.0-64x64.png'),
    },
    // {
    //     size: 128,
    //     padding: 1,
    //     src: join(__dirname, '../assets/emojione-3.0-128x128'),
    //     out: join(__dirname, '../assets/sprites/emojione-3.0-128x128.png'),
    // },
];

const emojiDataMap = new Map(emojiDataArray.map(([code,, name]) => [name, code]));

// get shortnames
const shortnames = [];
Object.keys(emojiShortnames)
    .forEach(family => shortnames.push(...emojiShortnames[family]));

const readEmoji = (src, code) => {
    let img = new Canvas.Image();
    try {
        img.src = readFileSync(join(src, `${code}.png`));
    } catch (e) {
        img = null;
        console.error('error loading:', code);
    }
    return img;
};

const createSprite = ({size, src, out, padding}) => {
    const width = EMOJIS_PER_ROW * (size + 1) - 1;
    const height = Math.ceil(emojiDataMap.size / EMOJIS_PER_ROW) * (size + 1) - 1;
    const count = shortnames.length;
    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');

    for (let e = 0, x = padding, y = padding; e < count; x = padding, y += size + padding) {
        for (let i = 0; i < EMOJIS_PER_ROW && e < count; i++, e++, x += size + padding) {
            const name = shortnames[e];
            const code = emojiDataMap.get(name);
            //console.log('x:', x, 'y:', y, '\temoji:', e, '/', count, '\tcode:', code, 'name:', name);
            const img = readEmoji(src, code);
            if (img) {
                ctx.drawImage(img, x, y, size, size);
            }
        }
    }

    console.log('Writing', out);
    writeFileSync(out, canvas.toBuffer());
};

sets.forEach(createSprite);
