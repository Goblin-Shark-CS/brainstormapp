const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index_bundle.js"
    },
    target: 'web',
    devServer: {
        // port: 8080 by default
        static: {
            directory: path.join(__dirname, 'public')
        },
        proxy: {
            '/api': 'http://localhost:3000',
            // need to list for every endpoint used
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' }
            },
            {
                test: /.(css|scss)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'] // order reads right to left (turns sass files to css to style string)
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        }),
    ]
}