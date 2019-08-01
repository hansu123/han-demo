const path=require("path")
module.exports={
mode:"production",
output:{
  path:path.resolve(__dirname,"../dest"),
  filename:"bundle.min.js"
}
}