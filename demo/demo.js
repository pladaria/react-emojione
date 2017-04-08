import 'babel-es6-polyfill/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import shortnames from 'emoji-shortnames';
import {emojify} from '../index';

const styles = {
    container: {display: 'flex'},
    left: {flexGrow: 1, marginRight: '16px'},
    textarea: {width: '100%', boxSizing: 'border-box', minHeight: '100px', marginTop: '10px'},
    right: {flexGrow: 1, background: '#eee'},
    result: {whiteSpace: 'pre-wrap', marginTop: '10px'}
};

class Playground extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: 'Hello world! 😍😎😏:smile_cat::family:\n'
                + ":) :P ;P :d T____T ':( -_- -__-u\n"
                + "xD X'D </3 <3 <\\3 :( >:(\n"
                + "':[ :, ':| >:[\n"
                + "¬¬ :, ':| -____-u :unicorn: :poop: :alien:"
        };
    }

    handleChange(event) {
        this.setState({input: event.target.value});
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.left}>
                    <strong>Write here text, ascii smileys, emojis or :shortcodes:</strong>
                    <textarea
                        onChange={this.handleChange}
                        style={styles.textarea}
                        value={this.state.input}
                    />
                </div>
                <div style={styles.right}>
                    <strong>Result</strong>
                    <div style={styles.result}>
                        {emojify(this.state.input)}
                    </div>
                </div>
            </div>
        );
    }
}

class EmojiCategory extends React.Component {

    constructor(props){
        super(props);
        this.emojiOptions = {
            styles: {
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                margin: '0.1em',
                backgroundImage: 'url(emojione.sprites.png)'
            },
            handleClick: event => alert(event.target.title)
        };
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>
                    {emojify(this.props.text, this.emojiOptions)}
                </div>
            </div>
        );
    }
}

const categories = Object.keys(shortnames).map((category, i) =>
    <EmojiCategory
        key={i}
        text={shortnames[category].join('')}
        title={category}
    />
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
