import getEmojiRenderer from './emoji-renderer';
import getUnicodeRenderer from './unicode-renderer';

const rendererForOutputFormat = {
    emoji: getEmojiRenderer,
    unicode: getUnicodeRenderer
};

const getRenderer = (config) => {
    const renderer = rendererForOutputFormat[config.output] || rendererForOutputFormat.emoji;
    return renderer(config);
};

export default getRenderer;
