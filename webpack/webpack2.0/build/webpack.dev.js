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
