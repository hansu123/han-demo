[参考博客](https://blog.csdn.net/m0_37941483/article/details/90237575)

$mount是vue实例上的一个方法，原理是将创建的vue实例进行挂载

通常有两种挂载方式

* 第一种方式

```js
new Vue({
render(h){
  return h(app)
}
....
}).$mount("#app")
```

* 第二种方式

```js
let app=new Vue({
componets:{
el:"#app"
})
```

$mount的原理是？

看传入的值，如果传入的是body或者document就会提示警告

如果有传入的值也就是el，就会通过querySelector这个选择器，然后替换掉

如果没有传入的值，就会创建一个空的div，`document.createElement('div')`





### Vue.extend()

> 将传入的组件与之前的`vue`实例进行合并，然后返回一个`VueComponent`构造器

每个组件都是VueComponent的实例

```js
 Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}; //传入组件对象
    var Super = this; //指代Vue构造函数
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);//this指代当前实例
    };
    Sub.prototype = Object.create(Super.prototype);//创建一条原型链，实现继承
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;//标识
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );//合并传入的参数
    Sub['super'] = Super;

    // 对新加入的props和computed重新进行数据劫持相关操作
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    //拷贝静态方法
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    //拷贝静态属性
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
```

创建vueComponent实例

```js
import message from "./hMessage" //组件对象
let msgConstructor=Vue.extend(message) //function VueComponent()
let msgInstance=new msgConstructor() //VueComponent
```



### 组件树

main.js中注册的new Vue()

new Vue()中的$children中的VueComponent就是App.vue这个组件的实例

App.vue实例中的$children中VueComponent就是home.vue这个组件的实例

home.vue实例中的$children中VueComponent就是一系列组件的实例

![](https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/vue/vueCore/%E7%BB%84%E4%BB%B6%E6%A0%91.png)