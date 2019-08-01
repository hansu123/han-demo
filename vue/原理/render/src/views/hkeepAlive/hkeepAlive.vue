<template>
  <div>
  <router-link to="/">首页</router-link>
  <router-link to="/hslot">插槽</router-link>
  <p ref="title">Hello World</p>
  <button @click="handleClick">改变字体颜色</button>
  </div>
</template>

<script>
  export default {
    name:"hkeepAlive",
    data(){
      return {
        msg:"lilei"
      }
    },
    methods:{
      handleClick(){
        this.$refs.title.style.color="red";
        this.msg="hanmeimei"
      }
    },
    created(){
      console.log("created")
    },
    mounted(){
      console.log("mounted")
    },
    destroyed(){
      console.log("destroyed")
    },
    activated(){
      console.log("activated")
    },
    deactivated(){
      console.log("deactivated")
    }
  }
</script>

<style lang="scss" scoped>

</style>