<template>
  <div>
    sdas
    <list :goodsList="goodsList"></list>
  </div>
</template>

<script>
import List from "./components/list.vue"
export default {
  name:"goods",
  data() {
    return {
      goodsList: [
        {
          name: "Vue",
          price: 10000
        },
        {
          name: "React",
          price: 20000
        }
      ]
    };
  },
  components:{
    List
  }
};
</script>

<style lang="scss" scoped>
</style>