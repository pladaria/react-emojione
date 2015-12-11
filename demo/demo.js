import 'babel-es6-polyfill/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import shortnames from 'emoji-shortnames';
import {emojify} from '../index';

const Playground = React.createClass({

    getInitialState() {
        return {
            input: 'Hello world! 😍😎😏:smile_cat::family:\n'
                   + ":) :P ;P :d T____T ':( -_- -__-u\n"
                   + "xD X'D </3 <3 <\\3 :( >:(\n"
                   + "':[ :, ':| >:[\n"
                   + "¬¬ :, ':| -____-u :poop: :alien:"
        };
    },

    handleChange(event) {
        this.setState({input: event.target.value});
    },

    styles: {
        container: {display: 'flex'},
        left: {minWidth: '400px', marginRight: '16px'},
        textarea: {width: '100%', boxSizing: 'border-box', minHeight: '100px', marginTop: '10px'},
        right: {minWidth: '400px'},
        result: {whiteSpace: 'pre-wrap', marginTop: '10px'}
    },

    render() {
        return (
            <div style={this.styles.container}>
                <div style={this.styles.left}>
                    <strong>Write here text, ascii smileys, emojis or :shortcodes:</strong>
                    <textarea
                        onChange={this.handleChange}
                        style={this.styles.textarea}
                        value={this.state.input}
                    />
                </div>
                <div style={this.styles.right}>
                    <strong>Result</strong>
                    <div style={this.styles.result}>
                        {emojify(this.state.input)}
                    </div>
                </div>
            </div>
        );
    }
});

const EmojiCategory = React.createClass({

    emojiOptions: {
        styles: {
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            margin: '0.1em',
            backgroundImage: 'url(emojione.sprites.png)'
        },
        handleClick: event => alert(event.target.title)
    },

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>
                    {emojify(this.props.text, this.emojiOptions, this.handleClick)}
                </div>
            </div>
        );
    }
});

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
