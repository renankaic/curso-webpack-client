const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

let plugins = []

//Plugin utilizado para gerar uma página HTML automaticamente de acordo com um template
plugins.push(new htmlWebpackPlugin({
    hash: true, //inalida o cache    
    minify: {
        html5: true,
        collapseWhitespace: true, //remove espaço entre as tags
        removeComments: true
    },
    filename: 'index.html',
    template: __dirname + '/main.html'
}));

//Extrai o texto css
plugins.push(new extractTextPlugin('styles.css'));

//Faz com que o modulo do jQuery possa ser utilizado globalmente pela aplicacao
plugins.push(new webpack.ProvidePlugin({
    '$':'jquery/dist/jquery.js',
    'jQuery': 'jquery/dist/jquery.js'
}));

//Separando o nosso codigo das bibliotecas
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
}));

let SERVICE_URL = JSON.stringify("http://192.168.238.128:3000");
if(process.env.NODE_ENV == 'production'){

    SERVICE_URL = JSON.stringify("http://192.168.238.128:3000");

    //Otimiza o carregamentos doa arquivos e módulos
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    plugins.push(new babiliPlugin());

    //Minificar os arquivos js e css
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

//Plugin utilizado para facilitar a alteração do endereço de serviço de acordo com o ambiente que a aplicação estará rodando
plugins.push(new webpack.DefinePlugin({ SERVICE_URL: SERVICE_URL }));

module.exports = {
    entry: {
        app: './app-src/app.js',
        vendor: ['jquery', 'bootstrap', 'reflect-metadata']
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        inline: true,
        compress: true,
        disableHostCheck: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
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