<template>
  <div>
    <p ref="msg">{{msg}}</p>
    <p>{{msg1}}</p>
    <p>{{user.age}}</p>
    <button @click="handleClick">改变</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "lilei",
      msg1: "hansu",
      user:{
        name:"hansu",
        age:11
      }
    };
  },
  methods: {
    handleClick() {
      this.msg = "hanmeimei";
      this.$set(this.user,'age',22);
      this.$nextTick(() => {
        this.msg1 = this.$refs.msg.innerHTML;
      });
    }
  },
  watch:{
    'user.age'(newVal,oldVal){
      console.log(newVal)
      console.log(oldVal)
    }
  },
  created(){
       this.$nextTick(() => {
        console.log(this.$refs.msg.innerHTML)
      });
  }
};
</script>

<style lang="scss" scoped>
</style>