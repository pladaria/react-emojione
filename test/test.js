const test = require('tape');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Emojify = require('..').default;
const emojify = require('..').emojify;

test('shortnames', t => {
    t.test('shortname alternates', t => {
        const result = emojify(':+1: :thumbsup:', { output: 'unicode' });
        const expected = '👍 👍';
        t.equals(result, expected, result);
        t.end();
    });
});

test('ascii to unicode', t => {

    t.test('happy case', t => {
        const result = emojify(';)', { output: 'unicode' });
        const expected = '😉';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('ignored if not surrounded by spaces or start/end of line', t => {
        const result = emojify('a;)b', { output: 'unicode' });
        const expected = 'a;)b';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('end of line', t => {
        const result = emojify('abc ;)', { output: 'unicode' });
        const expected = 'abc 😉';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('start of line', t => {
        const result = emojify(';) abc', { output: 'unicode' });
        const expected = '😉 abc';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('end of line without space', t => {
        const result = emojify('abc;)', { output: 'unicode' });
        const expected = 'abc;)';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('start of line without space', t => {
        const result = emojify(';)abc', { output: 'unicode' });
        const expected = ';)abc';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('xD', t => {
        const result = emojify('xD', { output: 'unicode' });
        const expected = '😆';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('XD', t => {
        const result = emojify('XD', { output: 'unicode' });
        const expected = '😆';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('xDD', t => {
        const result = emojify('xDD', { output: 'unicode' });
        const expected = '😂';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('XDD', t => {
        const result = emojify('XDD', { output: 'unicode' });
        const expected = '😂';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('<3 </3', t => {
        const result = emojify('<3 </3', { output: 'unicode' });
        const expected = '❤️ 💔';
        t.equals(result, expected, result);
        t.end();
    });
});

test('component', t => {

    const stripStyle = s =>
        s.replace(/\sstyle=".*?"/g, '');

    t.test('no children', t => {
        const el = React.createElement(Emojify, {});
        const result = ReactDOMServer.renderToStaticMarkup(el);
        const expected = '';
        t.equals(result, expected);
        t.end();
    });

    t.test('single child', t => {
        const child = React.createElement('div', {}, ':D');
        const el = React.createElement(Emojify, {}, child);
        const result = stripStyle(ReactDOMServer.renderToStaticMarkup(el));
        const expected = '<div><span title=":smiley:">😃</span></div>';
        t.equals(result, expected);
        t.end();
    });

    t.test('many children', t => {
        const child1 = React.createElement('span', {key: 1}, ':D');
        const child2 = React.createElement('span', {key: 2}, ':P');
        const el = React.createElement(Emojify, {}, child1, child2);
        const result = stripStyle(ReactDOMServer.renderToStaticMarkup(el));
        const expected = '<span><span title=":smiley:">😃</span></span><span><span title=":stuck_out_tongue:">😛</span></span>';
        t.equals(result, expected);
        t.end();
    });

    t.test('single string child', t => {
        const child = ':D';
        const el = React.createElement(Emojify, {}, child);
        const result = stripStyle(ReactDOMServer.renderToStaticMarkup(el));
        const expected = '<span title=":smiley:">😃</span>';
        t.equals(result, expected);
        t.end();
    });

    t.test('array child', t => {
        const child = [':D', ':P'];
        const el = React.createElement(Emojify, {}, child);
        const result = stripStyle(ReactDOMServer.renderToStaticMarkup(el));
        const expected = '<span title=":smiley:">😃</span><span title=":stuck_out_tongue:">😛</span>';
        t.equals(result, expected);
        t.end();
    });

    t.test('array child (single element)', t => {
        const child = [':D'];
        const el = React.createElement(Emojify, {}, child);
        const result = stripStyle(ReactDOMServer.renderToStaticMarkup(el));
        const expected = '<span title=":smiley:">😃</span>';
        t.equals(result, expected);
        t.end();
    });

    t.test('ignore shortnames', t => {
        const child = ':smile:';
        const el = React.createElement(Emojify, {convertShortnames: false}, child);
        const result = stripStyle(ReactDOMServer.renderToStaticMarkup(el));
        const expected = ':smile:';
        t.equals(result, expected);
        t.end();
    });

    t.test('ignore ascii', t => {
        const child = ':D';
        const el = React.createElement(Emojify, {convertAscii: false}, child);
        const result = stripStyle(ReactDOMServer.renderToStaticMarkup(el));
        const expected = ':D';
        t.equals(result, expected);
        t.end();
    });

    t.test('nested children', t => {
        const child1 = React.createElement('span', {key: 1}, ':P');
        const child2 = React.createElement('span', {key: 2}, ':D');
        const child3 = React.createElement('span', {key: 3}, child1, child2, [child1, child2]);
        const el = React.createElement(Emojify, {}, child3);
        const result = stripStyle(ReactDOMServer.renderToStaticMarkup(el));
        const expected = '<span><span><span title=":stuck_out_tongue:">😛</span></span><span><span title=":smiley:">😃</span></span><span><span title=":stuck_out_tongue:">😛</span></span><span><span title=":smiley:">😃</span></span></span>';
        t.equals(result, expected);
        t.end();
    });

});
