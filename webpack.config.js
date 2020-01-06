const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

let plugins = []

//Extrai o texto css
plugins.push(new extractTextPlugin('styles.css'));

//Faz com que o modulo do jQuery possa ser utilizado globalmente pela aplicacao
plugins.push(new webpack.ProvidePlugin({
    '$':'jquery/dist/jquery.js',
    'jQuery': 'jquery/dist/jquery.js'
}));

if(process.env.NODE_ENV == 'production'){

    //Minificar os arquivos js e css
    plugins.push(new babiliPlugin());
    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true //Remove todos os comentarios em amb de producao
            }
        },
        canPrint: true //Permite ou nao a exibicao de erros no console
    }));

}

module.exports = {
    entry: "./app-src/app.js",
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        inline: true,
        compress: true,
        disableHostCheck: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }  
        ]
    },
    plugins: plugins
}