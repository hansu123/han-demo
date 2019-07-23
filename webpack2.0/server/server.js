const express=require("express")
const app=express();
app.listen(4000,(err)=>{
  console.log(err)
})
app.get("/user/list",(req,res)=>{
  res.json({
    data:[
      {name:"lilei",age:23},
      {name:"hanmeimei",age:32}
    ]
  })
})