const path = require('path')

module.exports = {
    target: 'electron',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'index.bundle.js',
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            // eslint-disable-next-line no-undef
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader'
        }, {
            test: /\.css/,
            // eslint-disable-next-line no-undef
            include: path.resolve(__dirname, 'src'),
            loader: 'style-loader!css-loader'
        }]
    }
}