<template>
  <div>
    <ul>
    <render-item :goodsList="goodsList"></render-item>
    </ul>
  </div>
</template>


<script>
import renderItem from "./renderItem.js";
export default {
  props: {
    goodsList: {
      type: Array,
      default: () => {}
    }
  },
  components: {
    renderItem
  }
};
</script>
<style lang="scss" scoped>
ul{
padding:0;
li{list-style:none;}
}
</style>
