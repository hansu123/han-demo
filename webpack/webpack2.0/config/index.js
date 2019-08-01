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