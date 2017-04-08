<p align="center">
    <img src="http://cdn.jsdelivr.net/emojione/assets/svg/1f419.svg" width=250 />
    <h1 align="center">react-emojione</h1>
    <p align="center">A tiny library to use emojis in React</p>
</p>

## Features

- Dependency free!
- Can be used as function: `emojify()` or component: `<Emojify>`
- Converts :shortnames:, unicode and ASCII smileys
- Copy-paste friendly
- Sprite mode (the only supported mode for now)
- Configurable styles and options
- Easy!

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
        <div>
            <span>Easy! :wink:</span>
            <span>😸 :D  ^__^</span>
        </div>
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
        <div>
            <span>Easy! :wink:</span>
            <span>😸 :D  ^__^</span>
        </div>
    </Emojify>,
    document.body
);
```

Note that the component expects a single child

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
