module.exports = {

    context: __dirname + "/",

    entry: "./index.js",

    output: {
        path: __dirname + "/assets/",
        publicPath: "/assets/",
        filename: "./bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
