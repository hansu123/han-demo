const HtmlWepackPlugin=require("html-webpack-plugin")
const {CleanWebpackPlugin}=require("clean-webpack-plugin")
const VueLoaerPlugin=require("vue-loader/lib/plugin")
//公共文件
const path=require("path")
module.exports={

entry:"./src/main.js",

module:{
    rules:[
        {test:/\.css$/i,use:["vue-style-loader","css-loader"]},
        {test:/\.js$/i,
            loader:"babel-loader",
            // options:{
            //     presets:[["@babel/preset-env"],
            // {
            //     targets:{
            //         chrome:"67"
            //     },
            //     useBuiltIns:'usage'
            // }]
            // },
            exclude:/node_modules/
        },
        {test:/\.(jpg|png|gif)$/,loader:"url-loader",options:{
            outputPath:"./static/imgs/",
            publicPath:"static/imgs",
            limit:4*1024,
            
        }},
        {test:/\.vue/,loader:"vue-loader"}
       
    ]
},
resolve:{
extensions:[".js",".json",".vue"],
alias:{
    'vue':"vue/dist/vue.esm",
    '@':path.resolve(__dirname,"../src")
}
},
plugins:[
    new HtmlWepackPlugin({
        template:path.resolve(__dirname,"../index.html")
    }),
    new CleanWebpackPlugin(),
    new VueLoaerPlugin()
]
}
