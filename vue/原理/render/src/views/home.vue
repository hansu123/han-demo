<template>
  <div id="nav">
    <router-link v-for="(route,i) of routes" :key="i" :to="route.path">
      {{route.meta.title}}
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  computed:{
    routes(){
      return this.$store.state.routes.filter((route)=>{
        return route.path!="/"
      })}
  },
  created(){
    this.$message({
      content:"暂无数据",
      delay:1000
    })
  }
};
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  flex-direction: column;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
    margin: 10px 0;
  }
}
</style>