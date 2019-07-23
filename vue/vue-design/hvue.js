class Hvue{
    constructor(options){
       this.$options=options;
       this.$data=options.data;
       this.observe(this.$data);
       new Compile(options.el,this)
    }
    observe(val){
        Object.keys(val).forEach((key)=>{
          this.defineReactive(val,key,val[key])
          this.proxyData(this,key)
        })
       
    }
    defineReactive(obj,key,oldVal){
        const dep=new Dep()
        if(typeof(oldVal)=='object'){
            this.observe(oldVal)
        }
        Object.defineProperty(obj,key,{
            get(){
                Dep.target&&dep.addDep(Dep.target)
                console.log(dep.deps)
                return oldVal
            },
            set(newVal){
                console.log(newVal)
                oldVal=newVal;
                dep.notify()
            }
        })
    }

    proxyData(vm,key){
        Object.defineProperty(vm,key,{
            get(){
                return vm.$data[key]
            },
            set(newVal){
                vm.$data[key]=newVal
            }
        })
    }
}

class Dep{
    constructor(){
        this.deps=[];
    }
    addDep(dep){
        this.deps.push(dep)
    }
    notify(){
        this.deps.forEach((dep)=>{
            dep.update()
        })
    }
}

class Watcher{
    constructor(vm,key,cb){
        Dep.target=this;
        this.vm=vm;
        this.key=key;
        this.cb=cb;
        this.vm[this.key]
        Dep.target=null;
        //优化watch
    }
    update(){
        console.log('更新试图')
        this.cb.call(this.vm,this.vm[this.key])
    }
}