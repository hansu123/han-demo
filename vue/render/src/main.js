import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import han_message from "@/views/hMessage/message.js"
Vue.use(han_message)
Vue.config.productionTip = false
let app=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
console.log(app)
// new Vue({
//   router,
//   store,
//   render: h => h(HelloWorld,{
//     'class':['wrap'],
//     props:{
//       msg:"msg"
//     },
//     domProps:{
//       innerHTML:"sda"//添加dom属性
//     },
//     on:{
//       'click':(event)=>{
//         event.preventDefault()
//         alert(2)
//       }
//     },
//     nativeOn:{
//       'click':()=>{
//         alert(1)
//       }
//     },
//     directives:[],
//     slot:'',
//     ref:''
//   })
// }).$mount('#app')



// const list=[{name:"lilei"},{name:"hanmeimei"}]
// const getList=(h)=>{
//  return list.map((user)=>{
//    return h('li',user.name)
//  })
// }

// new Vue({
//   router,
//   store,
//   render: h => h('ul',{
//     style:{
//       width:200+'px',
//       height:200+'px',
//       background:'red',
//       listStyle:'none',
//       padding:10+'px'
//     },
//     on:{click:(e)=>{
//       alert(1)
//     }}
//   },getList(h))
// }).$mount('#app')