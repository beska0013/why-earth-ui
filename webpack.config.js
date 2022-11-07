const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path')


const config = {
    output:{
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ title: 'why-earth-ui', template: 'src/index.html'}),

    ],
    mode: "none",
    entry:{
        main: './src/index.js',
    },
    devtool: "nosources-source-map",
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test:/\.(png|svg|jpg|jpeg|gltf|glb)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                use:['file-loader']
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    optimization: {
        minimize: true,
        usedExports: true,
    },
}

module.exports = (env,arg) => {
    config.optimization.minimize = arg.mode === 'production'
    return config
};

