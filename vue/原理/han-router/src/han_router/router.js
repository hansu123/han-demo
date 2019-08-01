class HanRouter{
    constructor({routes}){
        this.routes=routes
        this.histroy=new Histroy()
        this.path=window.location.hash
        this.histroy.listen((path)=>{
            this.path=path
            console.log("change")
            this.vm.$forceUpdate()
        })
    }
    init(vm){
        this.vm=vm
    }
}
//创建histroy
class Histroy{
    listen(callback){
       window.addEventListener("hashchange",()=>{
        callback&&callback(window.location.hash)
       })
    }
}


//编写插件
HanRouter.install=(Vue)=>{
Vue.component("router-view",{
    functional:true,
    render(h,ctx){
        console.log(ctx)
        let han_parent=ctx.parent

        while(han_parent&&han_parent.$parent&&han_parent.routerRoot!==han_parent){
            han_parent=han_parent.$parent
        }
        let router=han_parent.$options.router
        let routes=router.routes;
        console.log(routes)
        let matchRoute=routes.find((route)=>{
            return route.path===router.path.replace(/^#/ig,"")
        })
        
        return h(matchRoute.component)
    }
})
Vue.component("router-link",{
    functional:true,
    render(h){
        return h("div")
    }
})

Vue.mixin({
    beforeCreate(){
        if(this.$options.router){
            this.$options.router.init(this)
            this.$rootRouter=true
        }
        else{
            this.$rootRouter=(this.$parent&&this.$parent.$rootRouter)||false
        }
    }
})
}

export default HanRouter