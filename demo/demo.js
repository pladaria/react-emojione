import React from 'react';
import ReactDOM from 'react-dom';
import shortnames from 'emoji-shortnames';
import {emojify} from '../index';
import 'babel-es6-polyfill/polyfill';

const Playground = React.createClass({

    styles: {
        container: {display: 'flex'},
        left: {minWidth: '400px', marginRight: '16px'},
        textarea: {width: '100%', boxSizing: 'border-box', minHeight: '100px', marginTop: '10px'},
        right: {minWidth: '400px'},
        result: {whiteSpace: 'pre-wrap', marginTop: '10px'}
    },

    getInitialState() {
        return {
            input: 'Hello world! 😍😎😏:smile_cat::family:'
        }
    },

    handleChange(event) {
        this.setState({input: event.target.value})
    },

    render() {
        return (
            <div style={this.styles.container}>
                <div style={this.styles.left}>
                    <strong>Write here text, emojis or :shortcodes:</strong>
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

    emojiStyle: {
        width: '2em',
        height: '2em',
        cursor: 'pointer',
        margin: '0.1em'
    },

    handleClick(event) {
        alert(event.target.title);
    },

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>
                    {emojify(this.props.text, {}, this.emojiStyle, this.handleClick)}
                </div>
            </div>
        );
    }
});

const categories = Object.keys(shortnames).map((category, i) =>
    <EmojiCategory
        key={i}
        title={category}
        text={shortnames[category].join('')}
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
