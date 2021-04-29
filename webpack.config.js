const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './mobile-avatar-crop.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            { 
                test   : /\.less$/, 
                use : [
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
