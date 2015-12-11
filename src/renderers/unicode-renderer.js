import {codepointToUnicode} from '../utils/emoji-format-conversion';

const getRenderer = () => codepoint => codepointToUnicode.get(codepoint);

export default getRenderer;
