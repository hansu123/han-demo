const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin")

//vue-loader-plugin
const VueLoaderPlugin=require("vue-loader/lib/plugin")

const baseConfig =require("./config")

module.exports=function(env){
env=env||{}
let conf={};
if(env.production){
  conf=require("./build/webpack.pro");
}
else if(env.production){
  conf=require("./build/webpack.dev")
}
else{
  conf=require("./build/webpack.test")
}

return{
entry:{app:"./src/main.js"},
module:{
  rules:[
    {test:/\.css$/i,use:["vue-style-loader","css-loader"]},
    {test:/\.(jpg|png|gif)$/i,use:[
      {loader:"url-loader",options:{
        outputPath:"./static/imgs/", //输出路径，相对于配置中的output.path
        publicPath:"./static/imgs/",  //html引入的文件路径
        limit:4*1024  //不超过4k，走url-loader变成base64,超过4k输出文件
      }}]
    },
    //jest

     ...baseConfig.Eslint?[{test:/\.js$/i,loader:"eslint-loader",exclude:/node_modules/}]:[],


    //vue
    {test:/\.vue$/i,use:["vue-loader"]}
  ]
},
...conf,
plugins:[
  new HtmlWebpackPlugin({
    template:path.resolve(__dirname,"index.html")
  }),
  new VueLoaderPlugin()
],

resolve:{
  extensions:[".vue",".js",".json"],//自动匹配扩展名
  alias:{
    'vue':"vue/dist/vue.esm",
    '@':path.resolve(__dirname,"./src")
  } //起别名
}
}
}

//style-loader改成vue-style-loader
