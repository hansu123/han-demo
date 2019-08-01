import message from "./hMessage" //组件对象
console.log(message)
export default {
    install(Vue){
    //第一种方法
    // Vue.extend(message) //创建一个VueComponent构造函数
    // let msgConstructor=Vue.extend(message) //function VueComponent()
    // let msgInstance=new msgConstructor() //VueComponent
    // let getInstance=(options)=>{
    //   let el=msgInstance.$mount().$el;
    //   document.body.appendChild(el)
    //   msgInstance.start(options)
    // }
   

    //第二种方法
    let msgInstance=new Vue({
      render(h){
        return h(message)
      }
    }) //Vue
    let getInstance=(options)=>{
      console.log(msgInstance) //Vue
      let el=msgInstance.$mount().$el;
      document.body.appendChild(el)
      console.dir(msgInstance.$children[0].$mount().$el)
      msgInstance.$children[0].start(options) //VueComponent
    }
    //每个组件中的this时VueComponent实例
    Vue.prototype.$message=(options)=>{
      getInstance(options)
    }

    }
}