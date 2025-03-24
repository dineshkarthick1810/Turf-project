const mongoose=require("mongoose")
const {Schema}=require("./Signup")

mongoose.connect("mongodb+srv://dineshkarthick1810:dinesh18@cluster0.1bvkbxq.mongodb.net/Adminusers")




const modal=mongoose.model("normalUsers",Schema)

module.exports=modal