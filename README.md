# react-emojione

A tiny ES6 library to use emojis in React

## Features

- Converts :shortnames: and unicode (no ASCII smileys, for now)
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
npm install
npm run dev-server # open http://localhost:8080/
```

## Basic usage

```javascript
import {emojify} from 'react-emojione';

ReactDOM.render(
    <div>
        {emojify('Easy! :wink: 😸')}
    </div>,
    document.body
);
```

## Advanced

```javascript
import {emojify} from 'react-emojione';

const options = {
    convertShortnames: true,
    convertUnicode: true
};

const styles = {
    backgroundImage: 'url(emojione.sprites.png)',
    width: '32px',
    height: '32px',
    margin: '4px'
};

// this click handler will be set on every emoji
const handleClick = event => alert(event.target.title);

ReactDOM.render(
    <div>
        {emojify('Easy! :wink: 😸'), options, styles, handleClick}
    </div>,
    document.body
);
```

## License

MIT
