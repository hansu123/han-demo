const path = require("path");
const commonConfig =require("./webpack.common.js")
const merge=require("webpack-merge")
const config=require("../config")
const webpack=require("webpack")
const prodConfig = {
    mode: "production",
    devtool:"cheap-module-source-map",
    output: {
        path:config.assetsRoot,
        filename: "bundle.js",
        publicPath:"./"
    }
}
module.exports=merge(commonConfig,prodConfig)