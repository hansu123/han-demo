<template>
  <div>
    <Home></Home>
  </div>
</template>

<script>
import Home from "@/components/Home";
import axios from "axios"
export default {
  data() {
    return {
     
    };
  },
  components: {
    Home
  },
  mounted(){
    //走server中的请求，模拟真实环境
    let url=process.env.BASE_API+"/user/list";
    axios.get(url).then((res)=>{
      console.log(res.data)
    })

    //走before中的请求，可以用来mock数据
     axios.get("/article/list").then((res)=>{
      console.log(res.data)
    })
    console.log(process.env.BASE_API)
  }
};
</script>

<style  scoped>
.wrapper{
  width:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
}
</style>