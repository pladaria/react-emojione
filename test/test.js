const test = require('tape');
const emojify = require('..').emojify;

test('ascii to unicode', t => {

    t.test('happy case', t => {
        const result = emojify(';)', {output: 'unicode'});
        const expected = '😉';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('ignored if not surrounded by spaces or start/end of line', t => {
        const result = emojify('a;)b', {output: 'unicode'});
        const expected = 'a;)b';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('end of line', t => {
        const result = emojify('abc ;)', {output: 'unicode'});
        const expected = 'abc 😉';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('start of line', t => {
        const result = emojify(';) abc', {output: 'unicode'});
        const expected = '😉 abc';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('end of line without space', t => {
        const result = emojify('abc;)', {output: 'unicode'});
        const expected = 'abc;)';
        t.equals(result, expected, result);
        t.end();
    });

    t.test('start of line without space', t => {
        const result = emojify(';)abc', {output: 'unicode'});
        const expected = ';)abc';
        t.equals(result, expected, result);
        t.end();
    });

});

