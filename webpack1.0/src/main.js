// import "../css/main.css";

// document.getElementById("app").addEventListener("click",()=>{
//     alert(1);
// },false);

import App from "@/app"

import Vue from "vue"

new Vue({
  el:"#app",
  template:"<App/>", 
  components:{
    App
  }
})