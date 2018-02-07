const path = require('path')

module.exports = {
    target: 'electron',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader'
        }, {
            test: /\.css/,
            include: path.resolve(__dirname, 'src'),
            loader: 'style-loader!css-loader'
        }]
    }
}