const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        'test-normal': './demo/test-normal.js',
        'test-with-size': './demo/test-with-size.js',
    },
    output: {
        path: path.join(__dirname, 'demo/dist/'),
        filename: '[name].js'
    },
    mode: "development",
    module: {
        rules: [
            { 
                test   : /\.less$/, 
                loaders : [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer"
                                ]
                            }
                        }
                    },
                    'less-loader'
                ] 
            }, 
        ]
    }
};
