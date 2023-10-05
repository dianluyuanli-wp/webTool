/*eslint-disable*/
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

//  判断是否是插件辅助文件打包
const isPluginFileBuild = process.argv.includes('--pluginBuild');

//  是否是生产环境
const isProd = process.argv[6] === 'production';

const pubPath = 'https://op.fwoewf.com/';

const config = {
    //  打包插件主体
    entry: {
        app: ['./src/index.tsx']
    },
    //  dev server并不会生成打包内容，具体的东西会放到内存里面，直接读取
    devServer: {
        // historyApiFallback:true,
        // hot参数控制更新是刷新整个页面还是局部刷新
        //contentBase: path.resolve(__dirname,'output'),  
        // publicPath: 'http://localhost:3000/',
        static: {
            directory: path.join(__dirname, 'view'),
        },
        headers: {
            //  为了热更
            "Access-Control-Allow-Origin": "*",
        },
        client: {
            overlay: {
              errors: true,
              warnings: false,
            },
            webSocketURL: 'ws://localhost:3002/ws',
        },
        historyApiFallback: true,
        allowedHosts: 'all',
        port: 3002,
    },
    output: {
        filename: isProd ? '[name].bundle.[contenthash:8].js' : '[name].bundle.js',
        path: path.resolve(__dirname, 'output'),
        publicPath: isProd ? pubPath : 'http://localhost:3002/'
        //publicPath: path.resolve(__dirname, 'plugin/pop')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "common",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    minSize: 30000,   //  注释掉的话也不会打出来
                    minChunks: 1,   //  如果是2的话一个也抽不出来，因为好多只用了一次
                    priority: 8 // 优先级
                }
            },
        },
    },
};

module.exports = {
    context: path.resolve(__dirname),
    ...config,
    target: 'web',
    plugins: [
        new MiniCssExtractPlugin({      //对css进行打包，webpack4推荐语法
            filename: isProd ? "[name].[contenthash:8].css" : "[name].css",
            chunkFilename: "[name].[contenthash:8]css"
        }),
        new ForkTsCheckerWebpackPlugin(),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     // context: path.join(__dirname, 'output'),
        //     manifest: require('./output/vendors-manifest.json')
        // }),
        isProd ? null : new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'view/template.html',
            inlineSource: '.(js|css)$',
            inject: 'body',
            title: 'wefcsdfw',
        }),
        new HTMLInlineCSSWebpackPlugin(),
        new HtmlInlineScriptPlugin(),
    ].filter(Boolean),
    module: {
        rules: [
            {
                //  为了给antd定制样式，使用非获取匹配，反向肯定预查，不使用css module
                test: /(?<=antd)\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    //MiniCssExtractPlugin.loader,
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            namedExport: true
                        }
                    }
                ]
            },
            {
                test: /(?<!antd)\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    //  MiniCssExtractPlugin和style-loader是一样的功能，不能共存
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            localIdentName: '[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                //  专门处理antd的css样式
                test: /\.(less)$/,
                include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    'primary-color': '#F0B90B',
                                    'link-color': '#F0B90B',
                                    'border-radius-base': '3px',
                                },
                                javascriptEnabled: true
                            }
                        }
                    }
                ],
            },
            {
                test: /\.tsx?$/,
                //  loader: "awesome-typescript-loader",
                loader: 'ts-loader',
                options: {
                  //    这些是给awesome-typescript-loader用的
                  //    useCache: true,
                  //    useBabel: false, // !important!
                  getCustomTransformers: () => ({
                    before: [tsImportPluginFactory({
                      libraryName: 'antd',
                      libraryDirectory: 'lib',
                      style: true
                    })]
                  }),
                  //    不安排类型检查
                  transpileOnly: true
                },
                exclude: [
                    /node_modules/
                ]
            },
            {
                include: /node_modules/,
                test: /\.mjs$/,
                type: 'javascript/auto'
            },
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.json'
        ],
        // alias: {
        //     "@utils": path.resolve(__dirname, "src/utils"),
        //     "@widgets": path.resolve(__dirname, 'src/entry/widgets'),
        //     "@constants": path.resolve(__dirname, "src/constants")
        // },
    },
    mode: isProd ? "production" : "development",
}