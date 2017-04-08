const {join} = require('path');

module.exports = {

    context: __dirname,

    entry: './demo/demo.js',

    output: {
        path: join(__dirname, '/assets/'),
        publicPath: '/assets/',
        filename: './bundle.js',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },

    devServer: {
        port: process.env.PORT || 8080,
    },
};
