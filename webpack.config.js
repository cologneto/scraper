const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill','./client/src/js/index.js'],
    output: {
        path: path.resolve(__dirname, './client/dist'),
        filename: "js/bundle.js"
    },
    devServer: {
        contentBase: './client/dist',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './client/src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['/node_modules/', '/server/'],
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}