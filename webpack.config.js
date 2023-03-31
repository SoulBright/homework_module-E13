const HtmlWebpackPlagin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

module.exports = {
    mode: mode,
    entry: './src/index.js',
    output: {
        clean: true
    },
    devServer: {
        port: 666,
        static: './dist',
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlagin({
            template: './src/index.pug'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development')? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ]
    },
}