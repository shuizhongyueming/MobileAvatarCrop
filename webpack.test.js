const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './demo/index-mobile.js',
    output: {
        path: path.join(__dirname, 'demo'),
        filename: 'index-mobile-es5.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { 
                test   : /\.less$/, 
                loaders : [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcss: function(){
                                return [
                                    require('autoprefixer')()
                                ];
                            }
                        }
                    },
                    'less-loader'
                ] 
            }, 
        ]
    }
};
