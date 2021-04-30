import * as path from 'path';
import * as webpack from 'webpack';

const devServer = {
  inline: false, //改为iframe模式
  writeToDisk: true,
  host: '0.0.0.0',
  contentBase: path.resolve(__dirname, '..', 'dist'),
  contentBasePublicPath: '/'
};

const stats: any = {
  preset: 'verbose',
  logging: 'none' //不显示stats中的logging
  // loggingDebug: (plugin_name: string) => {
  //   return true;
  // }
};

const infrastructureLogging: any = {
  appendOnly: true,
  level: 'verbose',
  debug: (name: string) => {
    return true;
  }
};

// module 有很多种（js css json jpg png sass）。不同类型的module需要不同的处理方式。
// prettier-ignore
const module = {
  rules: [
    {test: /\.tsx?$/, use: [{loader: 'ts-loader', options: {transpileOnly: true}}] },
    {test: /\.svg$/, use: ['@svgr/webpack']},
    {test: /\.css$/i, use: ['style-loader', 'css-loader']},
    {test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource',},
  ]
};

const plugins = [
  //如果不配置LimitChunkCountPlugin，会生成约20个js文件
  new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
];

const config: webpack.Configuration = {
  mode: 'development',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: './pp-frontend-amis/main_src/main.tsx'
  },
  cache: {
    type: 'filesystem'
  },
  output: {
    filename: '[name].bundle.js', //[id].[contenthash].[name].bundle.js
    chunkFilename: '[name].chunk.js',
    assetModuleFilename: '[name][ext]',
    path: path.resolve(__dirname, '..', 'dist') //输出到这个目录
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins,
  module,
  devServer,
  stats,
  infrastructureLogging
};

console.log('exports:', config);
export default config;
