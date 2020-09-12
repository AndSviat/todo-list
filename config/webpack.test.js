const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './test/test.config.js',
    output: {
        path: path.resolve(__dirname, 'test'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.spec\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-proposal-class-properties']
                        ]
                    }
                }]
            },
            {
                test: /.(css|sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TodoList Mocha Tests',
            template: path.resolve('test', 'index.spec.html')
        })
    ],
    devServer: {
        port: 8081
    }
};
