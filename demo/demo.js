import 'babel-es6-polyfill/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import shortnames from '../src/data/emoji-shortnames';
import Emojify, {emojify} from '../src/react-emojione';

const style = {
    container: {display: 'flex'},
    left: {flexGrow: 1, marginRight: '16px'},
    textarea: {width: '100%', boxSizing: 'border-box', minHeight: '100px', marginTop: '10px'},
    right: {flexGrow: 1, background: '#eee'},
    result: {whiteSpace: 'pre-wrap', marginTop: '10px'}
};

class Playground extends React.Component {

    state = { // eslint-disable-line
        input: 'Hello world! 😍😎😏:smile_cat::family:\n'
            + ":) :P ;P :d T____T ':( -_- -__-u\n"
            + 'xD XDD XDDD </3 <3 <\\3 :( >:(\n'
            + "':[ ':| >:[\n"
            + "¬¬ ':| -____-u :unicorn: :poop: :alien:"
    };

    handleChange = (event) => { // eslint-disable-line
        this.setState({input: event.target.value});
    };

    render() {
        return (
            <div style={style.container}>
                <div style={style.left}>
                    <strong>Write here text, ascii smileys, emojis or :shortcodes:</strong>
                    <textarea
                        onChange={this.handleChange}
                        style={style.textarea}
                        value={this.state.input}
                    />
                </div>
                <div style={style.right}>
                    <strong>Result</strong>
                    <div style={style.result}>
                        {emojify(this.state.input)}
                    </div>
                </div>
            </div>
        );
    }
}

const categories = Object.keys(shortnames).map((category, i) =>
    <Emojify key={i} style={{height: 32, cursor: 'pointer'}} onClick={n => alert(n.target.title)}>
        <div>
            <h1>{category}</h1>
            {shortnames[category]}
        </div>
    </Emojify>
);

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <div>
            <Playground />
            {categories}
        </div>,
        document.getElementById('emojis')
    );
});
