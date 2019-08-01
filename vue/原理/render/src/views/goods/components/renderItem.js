function handleClick(name){
    alert(name+"课程加入成功")
}
function mapList(h,{goodsList}){
   return goodsList.map((data)=>{
     return h('li',{
       style:{
         width:"100%",
         height:"150px",
         margin:"10px 0",
         display:"flex",
         justifyContent:"center",
         alignItems:"center",
         background:"pink",
         color:"#010",
       },
       on:{
         click:()=>{handleClick(data.name)}
       }
     },[h('div',[h('span',data.name),h('button',{style:{background:'#000',color:"#fff",marginLeft:"10px",border:"none",padding:"5px 10px"}},"加入购物车")])])
   })
}
export default{
  functional:true,
  props:{
  goodsList:Array
  },
  render(h,ctx){
   return  h('div',mapList(h,ctx.props))
  }
}