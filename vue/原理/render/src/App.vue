<template>
  <div id="app">
    <keep-alive>
          <router-view></router-view>
    </keep-alive>
 <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default{
  data(){
    return {
      name:"lilei"
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
