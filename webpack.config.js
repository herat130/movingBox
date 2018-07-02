const HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + "/main/index.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Canvas Tiles',
            filename: __dirname + '/dist/index.html',
            template: __dirname + "/index.html",
        }),
        // new ExtractTextPlugin("[name].css")
    ],
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        port: 9000,
        compress: true,
        allowedHosts: [
            'localhost'
        ],
        hot: true
    },
    resolve: {
        extensions: [".ts", ".js"],
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: require.resolve('jquery'), use: [{ loader: 'expose-loader', options: '$' }] },
            // {
            //     test:/\.(s*)css$/,
            //     use: ExtractTextPlugin.extract({
            //             fallback:'style-loader',
            //             use:['css-loader','sass-loader'],
            //         })
            // },
        ]
    },
};