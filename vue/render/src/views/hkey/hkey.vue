<template>
  <div>
   <input type="text" v-model="lesson"><button @click="handleAdd">添加</button>
   <ul>
     <!-- no key -->
     <!-- <li v-for="(item,i) of list" @click="handleClick">{{item.name}}</li> -->
     <!-- has key -->
     <li v-for="(item,i) of list" :key="item.id" @click="handleClick">{{item.name}}</li>
   </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        lesson:"",
        id:2,
        list:[
          {id:1,name:"js"},
          {id:2,name:"vue"}
        ]
      }
    },
    methods:{
      handleAdd(){
        this.list.unshift({id:this.id++,name:this.lesson})
        console.log(this.list)
      },
      handleClick(e){
       e.target.style.color="red"
      }
    }
  }
</script>

<style lang="scss" scoped>
ul{
  padding:0;
  li{
    list-style:none;
  }
}

</style>