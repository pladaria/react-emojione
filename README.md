# react-emojione

A tiny ES6 library to use emojis in React

## Features

- Converts :shortnames:, unicode and ASCII smileys
- Copy-paste friendly
- Use it as a library or mixin
- No dangerouslySetInnerHTML
- Inline styles
- Sprite mode (the only supported mode for now)
- Configurable styles and options
- Fast!

## Install

```javascript
npm install --save react-emojione
```

## Run demo

```bash
# clone repo and then
npm install
npm run dev-server
# open http://localhost:8080/
```

## Basic usage

```javascript
import {emojify} from 'react-emojione';

ReactDOM.render(
    <div>
        {emojify('Easy! :wink: 😸 :D  ^__^')}
    </div>,
    document.body
);
```

## Advanced

```javascript
import {emojify} from 'react-emojione';

const options = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
        backgroundImage: 'url(emojione.sprites.png)',
        width: '32px',
        height: '32px',
        margin: '4px'
    },
    // this click handler will be set on every emoji
    handleClick: event => alert(event.target.title)
};

ReactDOM.render(
    <div>
        {emojify('Easy! :wink: 😸 :D ^__^', options)}
    </div>,
    document.body
);
```

### Output

You can also render to unicode (instead of virtualdom) using the `output` option
```javascript
import {emojify} from 'react-emojione';

emojify('Easy! :wink: :D ^__^', {output: 'unicode'});
// Easy! 😉 😃 😄
```

## License

MIT
