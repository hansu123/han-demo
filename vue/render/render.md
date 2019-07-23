先来看下Vue-cli

> Vue-cli2

```js
new Vue({
  router,
  store,
  components:{
    App
  }
})
```

> Vue-cli3

```js
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

`render:h=>h(App)`就是render函数，可以将html，css统统转化成js，vue底层也是都转化成render函数进行处理。

### 一. 基本语法

h的本意指代createElement

h(参数1，参数2，参数3)

* 参数1:组件，标签名
* 参数2:对象
  * style：样式
  * 'class'：类名必须加引号，可以使用数组，对象或者直接是字符串
  * on：事件监听器
  * nativeOn：一般放在最外层组件
  * attrs：{id，class，….} //普通html特性
  * domProps：{innerHTML} // dom上的属性 
  * props：vue组件中接受父组件传递的参数
  * slot：名称
  * ref：名称
  * key：名称
* 参数3:子元素，如果是标签必须用数组包裹
* 只有一个h函数不能使用多个h函数

#### 1. 渲染普通标签

```js
const list=[{name:"lilei"},{name:"hanmeimei"}]
const getList=(h)=>{
 return list.map((user)=>{
   return h('li',user.name)
 })
}

new Vue({
  router,
  store,
  render: h => h('ul',{
    style:{
      width:'200px',
      height:'200px',
      background:'red',
      listStyle:'none',
      padding:10+'px'
    },
    on:{click:(e)=>{
      alert(1)
    }}
  },getList(h))
}).$mount('#app')
```

#### 2. 渲染组件

```js
new Vue({
  router,
  store,
  render: h => h(HelloWorld,{
   'class':['wrap'],
    props:{
      msg:"msg"
    },
    domProps:{
      innerHTML:"sda"//添加dom属性
    },
    on:{
      'click':(event)=>{
        event.preventDefault()
        alert(2)
      }
    },
    nativeOn:{
      'click':()=>{
        alert(1)
      }
    },
    directives:[],
    slot:'',
    ref:''
  })
}).$mount('#app')
```

### 二.函数式组件

> 无状态 (没有[响应式数据](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E6%95%B0%E6%8D%AE))，也没有实例 (没有 `this` 上下文)

完整demo1

#### 1.HelloWorld.vue

> 传递render函数作为参数给子组件

```js
<template>
  <div>
    <list :list="list" :renderFunc="renderFunc"></list>
  </div>
</template>
<script>
import List from "@/components/List";
export default {
  name: "HelloWorld",
  data() {
    return {
      list: [{ name: "lilei" }, { name: "hanmeimei" }],
    };
  },
  components: {
    List
  },
  methods: {
    renderFunc(h, name) {
        return h(
          "li",
          {
            on:{click:(e)=>{e.preventDefault();alert(1)}},
            style: { color: "pink" },
            attrs:{class:"list_item"}
          },
          name
        );
      }
  }
};
</script>
```

####2.List.vue

> 接受父组件的render函数，引入函数式组件并传递render函数和其他数据

```js
<template>
  <div>
    <ul>
      <li v-for="(item,i) of list" :key="i">
        <p v-if="!renderFunc">{{item.name}}</p>
        <render-dom v-else :renderFunc="renderFunc" :name="item.name"></render-dom>
      </li>
    </ul>
  </div>
</template>

<script>
import renderDom from "@/components/render_dom";
export default {
  props: {
    list: {
      type: Array,
      default: () => {}
    },
    renderFunc: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    renderDom
  }
};
</script>

<style lang="scss" scoped>
</style>
```

#### 3.render_dom.js

> 使用传递过来的render方法

```js
export default{
    functional:true,//设置为函数式组件即无状态组件没有模板和样式
    props:{
      name:String,
      renderFunc:Function
    },//如同普通组件一样接受父组件的参数
    render(h,ctx){//h代表createElement,ctx是一个集成的对象
      return ctx.props.renderFunc(h,ctx.props.name)
    }
}
```

ctx的具体参数可以参考官网

本质就是

```js
render(h,ctx){//h代表createElement,ctx是一个集成的对象
    return ctx.props.renderFunc(h,ctx.props.name)
}
=>
render(h,name){
  h(
      "li",
      {
        on:{click:(e)=>{e.preventDefault();alert(1)}},
        style: { color: "pink" },
        attrs:{class:"list_item"}
      },
      name
    );
}
```
复杂的函数式组件

```js
import HListItem from "@/components/HListItem"
const mapList = (h, {listData,handleClick}) => {
  return listData.map((elem) => {
    return [h(HListItem, { nativeOn: { click:()=>{handleClick(elem.name)}}},elem.name)]
    //引入HListItem进行渲染，并传递父组件传来的click事件，并传入参数
})
}
export default {
  functional: true,
  props: {
    listData: Array,
    handleClick: Function
  },
  render(h, ctx) {
    return h('div', mapList(h, ctx.props))
  }
}
```

### 三. JSX

render进阶，如果你学过react你会格外亲切

我们以封装一个icon组件为例

原始写法

```js
<template>
 	<i :class="['iconfont','icon-'+icon]"></i>
 </template>
 <script>
 	export default{
 		props:{
 			icon:{
 				type:String,
 				default:""
 			}
 		}
 	}
 </script>
```

render写法

```js
export default{
	 props:{icon:String},
	 render(h,ctx){
		 return h('i',{'class':['iconfont','icon-'+ctx.props.icon]})
	 }
 }
```

=>改成jsx

```js
export default{
	 props:['icon'],
	 render(){
		 return (<i class={{'iconfont':true,['icon-'+this.icon]:true}}></i>)
	 }
 }
```

jsx基础

