<template>
  <div>
    <h1>{{msg}}</h1>
    <img src="./imgs/img1.jpg">
    <Home></Home>
  </div>
</template>

<script>
import Home from "@/components/Home.vue";
export default {
  data() {
    return {
      msg:"hello world"
    };
  },
  components: {
    Home
  }
};
</script>

<style  scoped>
</style>