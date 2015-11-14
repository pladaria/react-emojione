import React from 'react';
import ReactDOM from 'react-dom';
import shortnames from 'emoji-shortnames';
import {emojify} from '../index';
import 'babel-es6-polyfill/polyfill';

const PlayGround = React.createClass({
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
                    <strong>Paste here text, emojis or :shortcodes:</strong>
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
    handleClick(event) {
        alert(event.target.title);
    },
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>
                    {emojify(this.props.text, {}, {}, this.handleClick)}
                </div>
            </div>
        );
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const categories = Object.keys(shortnames).map((category, i) =>
        <EmojiCategory key={i} title={category} text={shortnames[category].join('')} />
    );

    ReactDOM.render(
        <div>
            <PlayGround />
            {categories}
        </div>,
        document.getElementById('emojis')
    );

});
