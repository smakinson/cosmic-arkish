var webpack = require("webpack");

module.exports = {
    context: __dirname + '/src',
    entry: [
        './main.ts'
    ],
    output: {
        path: __dirname + '/../published',
        filename: 'animate-bundle.js',
        libraryTarget: 'var',
        library: 'Runner'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    preLoaders: [
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { test: /\.js$/, loader: "source-map-loader" }
    ],
    plugins: [
        new webpack.ProvidePlugin({
            "_": "lodash",
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}