<p align="center">
    <img src="https://api.emojione.com/emoji/1f63b/download/128" width=64 />
    <img src="https://api.emojione.com/emoji/1f602/download/128" width=64 />
    <img src="https://api.emojione.com/emoji/1f9d9-2642/download/128" width=64 />
    <img src="https://api.emojione.com/emoji/1f9dc-2640/download/128" width=64 />
    <h1 align="center">react-emojione</h1>
    <p align="center">A tiny library to use emojis in React</p>
</p>

## Features

- Updated to emojione v3.1.2
- Dependency free!
- Can be used as function: `emojify()` or component: `<Emojify>`
- Converts :shortnames:, unicode and ASCII smileys
- Copy-paste friendly
- Sprite mode (the only supported mode for now)
- Configurable styles and options
- Easy!

## Demo

[Live demo](https://runkit.com/pladaria/react-emojione)

## Install

```javascript
npm install --save react-emojione
```

## Development / Run demo

```bash
# clone repo
git clone ...

# get dependencies
yarn

# start dev-server
yarn start
```

## Basic usage (function)

```javascript
import {emojify} from 'react-emojione';

ReactDOM.render(
    <div>
        {emojify('Easy! :wink: 😸 :D  ^__^')}
    </div>,
    document.body
);
```

## Basic usage (component)

```javascript
import Emojify from 'react-emojione';

ReactDOM.render(
    <Emojify>
        <span>Easy! :wink:</span>
        <span>😸 :D  ^__^</span>
    </Emojify>,
    document.body
);
```

## Advanced usage (function)

```javascript
import {emojify} from 'react-emojione';

const options = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    style: {
        backgroundImage: 'url("/path/to/your/emojione.sprites.png")',
        height: 32,
        margin: 4,
    },
    // this click handler will be set on every emoji
    onClick: event => alert(event.target.title)
};

ReactDOM.render(
    <div>
        {emojify('Easy! :wink: 😸 :D ^__^', options)}
    </div>,
    document.body
);
```

## Advanced usage (component)

Simply pass options as props

```javascript
import Emojify from 'react-emojione';

ReactDOM.render(
    <Emojify style={{height: 32, width: 32}} onClick={e => alert(e.target.title)}>
        <span>Easy! :wink:</span>
        <span>😸 :D  ^__^</span>
    </Emojify>,
    document.body
);
```
Some notes about the `<Emojify>` component:
- If it has a single child, it won't be wrapped
- Otherwise it will be wrapped with a `<span>`

## Output

You can also render to unicode (instead of react elements) using the `output` option
```javascript
import {emojify} from 'react-emojione';

emojify('Easy! :wink: :D ^__^', {output: 'unicode'});
// Easy! 😉 😃 😄
```

## License

MIT

---
Emoji provided free by [http://emojione.com](http://emojione.com)
