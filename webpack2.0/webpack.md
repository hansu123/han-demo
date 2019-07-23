### 一. 基本配置

```js
module.exports={
entry:{
app:"./src/main.js"
},
output:{
path:path.resolve(__dirname,"dist"),
filename:"bundle.min.js"
},
module:{
.....
	}
}
```

### 二. loader

#### 1.css

* `cnpm i css-loader style-loader -D`
* 配置

```js
rules:[
{test:/\.css$/i,use:["style-loader","css-loader"]}
]
```

#### 2.babel

`cnpm i babel-loader @babel/core -D`

#### 2.1第一种方案

首先安装`cnpm i @babel/preset-env -D`

新增babel规则

```js
{
      test:/\.js$/i,
      loader:"babel-loader",
      options:{
          presets:["@babel/preset-env"]
      },
      exclude:/node_module/
}
```

函数，变量需要兼容低版本，需要安装@babel/polyfill

在对应的main.js中引入

`import "@babel/polyfill"`

更改babel规则

```js
{test:/\.js$/i,
            loader:"babel-loader",
            options:{
                presets:[["@babel/preset-env"],
            {
                targets:{
                    chrome:"67" //chrome67版本的就不需要转成es5
                },
                useBuiltIns:'usage'//使用到的才编译
            }]
            },
            exclude:/node_module/
 }
```

#### 2.2 第二种方案

安装

`cnpm i @babel/plugin-transform-runtime @babel/runtime-corejs2 -D`

```js
{
    "plugins":[["@babel/plugin-transform-runtime",{
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
    }]]
   
}
```



#### 3.静态资源

`cnpm i url-loader file-loader -D`

```js
rules:[
{test:/\.(jpg|png|gif)$/i,use:[{
loader:"url-loader",
options:{
name:'[name]_[hash].[ext]'
limit:4*1024,
outPath:"./static/imgs/"
publicPath:"./static/imgs/"}
}]}
]
```

* outPath：输出路径，相对于打包后的dist文件夹
* publicPath：项目中引入的路径
* limit：文件大小，超过该设置大小的不用编译

### 三. 热更新

安装

```
cnpm i webpack webpack-cli webpack-dev-server -D
```

执行

`webpack-dev-server`

因为文件存储在内存中，所以需要修改html文件中js的引入路径

```js
<script src="bundle.js"></script>
```

deverServer的配置项参数（主要几个，更多参考官网）

* open

自动打开浏览器

* contentBase

从哪里提供内容 `contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")]`

* hot

`hot:true`

* hotOnly 

`hotOnly:true` 不刷新浏览器

* port

`port:9001`

* histroyApiFallback //不会造成浏览器刷新

```
histroyApiFallback:{

}
```

[参考文档](https://www.webpackjs.com/configuration/dev-server/#devserver-historyapifallback)

* before

```js
before(app){
            app.get("/user/List",(req,res)=>{
                res.json({
                    name:"lilei"
                })
            })
}
```

* proxy

```js
proxy:{
'/api':{
 target:"实际地址",
 changeOrigin:true, //改变源
 headers:{请求头}
	}
}
```

### 四. plugins

#### 1.生成html模板插件

安装`cnpm i html-webpack-plugin -D`

配置

```js
const HtmlWebpackPlugin=require("html-webpack-plugin")
plugins:[
    new HtmlWepackPlugin({
        template:path.resolve(__dirname,"index.html")
    })
],
```

会自动生成html文件，并且自动引入打包后的js文件

#### 2.打包前清除dist文件插件

新版写法：

```js
const {CleanWebpackPlugin}=require("clean-webpack-plugin")
plugins:[
new CleanWebpackPlugin()
]
```

#### 3.设定环境变量

```js
plugins:[
    new webpack.DefinePlugin({
        'process.env':{
            BASE_API:'"/api"' //要注意双重引号或者JSON.stringify
        }
    })
]
```
全局引用
`process.env.baseUrl`

### 五. SourceMap

> 源代码和生成代码之间的映射

Dev:"cheap-module-eval-source-map"

Pro:"cheap-module-source-map"



### 六.双配置

#### 1.新建build文件夹，分别用来存放开发环境和生产环境两套js

共同配置文件 webpack.common.js

```js
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
```

开发环境下的webpack.dev.js

```js
const commonConfig =require("./webpack.common.js")
const merge=require("webpack-merge")
const webpack=require("webpack")
const {dev}=require("../config")
const devConfig= {
    mode: "development",
    devtool:"cheap-module-eval-source-map",
    output: {
        filename: "bundle.js"
    },
    devServer:{
        host:dev.host,
        open:dev.openBrowser,
        compress:true,
        overlay:{
            errors:dev.showOverlayErros,
            warnings:false
        },
        proxy:dev.proxy,
        before(app){
            app.get("/article/list",(req,res)=>{
                res.json({
                    list:[
                        {author:"lilei"},
                        {author:"hanmeimei"}
                    ]
                })
            })
        }
    },
    plugins:[
        new webpack.DefinePlugin({
        'process.env':require("../config/dev.env.js")
        })
    ]
}
module.exports=merge(commonConfig,devConfig)
```

生产环境下的webpack.prod.js

```js
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
```

说明：

* merge：用来合并共同的js文件
* config：基础配置文件，根据不同的环境引入不同的配置
* DefinePlugin：用来配置process.env供全局使用，设置的变量值必须加双重引号或者JSON.stringify

#### 2.新建配置文件

新建文件夹config用来存放一些基础配置

index.js

```js
const path=require("path")
module.exports={

dev:{
    assetsRoot :path.resolve(__dirname,"../dist"),//文件打包出口地址
    assetsPublicPath:"./",
    assetsSubDirectory:"static",
    host:"localhost",
    openBrowser:true,
    showOverlayErros:true,
    proxy:{
        "/api":{
            target:"http://localhost:4000",
            changeOrigin:true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
},

build:{
    assetsRoot :path.resolve(__dirname,"../dist"),//文件打包出口地址
    assetsPublicPath:"./",
    assetsSubDirectory:"static",
}
}
```

dev.env.js

```js
module.exports={
    BASE_API:'"/api"',
    AUTHOR:"hansu"
}
```

#### 3.修改package.json:

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --progress --config ./build/webpack.dev.js",
    "build": "webpack  --config ./build/webpack.prod.js",
    "lint": "eslint --init"
}
```

说明：

* --config指用什么配置文件，更多webpack指令可以使用`webpack --help`查看
* lint：进行eslint的相关配置

### 七. Vue-CLI 2

安装

`cnpm i vue-loader vue-style-loader vue-html-loader vue-template-compiler -D`

* vue-loader：编译vue文件
* vue-style-loader：编译vue中的样式
* vue-html-loader：编译vue中的html
* vue-template-compiler：编译模板

webpack.common.js中引入插件

```js
const VueLoaderPlugin=require("vue")
plugins:[
new VueLoaderPlugin()
]
```

修改resolve，添加vue别名

```js
alias:{
    'vue':"vue/dist/vue.esm",
    '@':path.resolve(__dirname,"../src")
}
```

修改模板.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

修改main.js

```js
import App from "@/app"
import Vue from "vue"
//实际引入的是import Vue from "vue/dist/vue.esm"

new Vue({
    el:"#app",
    template:"<App/>",
    components:{
        App
    }
})
```

基本大功高成，当然里面还要一些懒加载，代码分割。

### 八. Vue-CLI 3

vue-cli3没有暴露webpack的配置项，需要在根目录下新建一个vue.config.js，相当于帮我们封装了一些API。

[API指南](<https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F>)

具体的可以看文档，如果我们想向之前那么写，可以使用`configureWebpack`这个API

```
configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BASE_API':'"/api"' 
      }),
    ]
}
```

链式调用

```js
chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
}
```

基础配置
```js
const webpack=require("webpack")
module.exports={
  productionSourceMap:false,//不需要生成.map文件
  lintOnSave:process.env.NODE_ENV!="production",//将eslint错误变成编译错误
  devServer:{
    open:true,
    proxy:{
      "/api":{
        target:"http://localhost:4000",
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
      }
    },
    overlay: process.env.NODE_ENV=="development"?{
      warnings: true,
      errors: true
    }:{}   //开发环境下将错误显示在浏览器中
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BASE_API':'"/api"' 
      }),
    ]
  }
 
  }
```

