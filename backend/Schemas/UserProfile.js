const mongoose=require("mongoose")
const {Schema}=require("./Profile")
mongoose.connect("mongodb+srv://dineshkarthick1810:dinesh18@cluster0.1bvkbxq.mongodb.net/Adminusers")

const UserProfile=mongoose.model("UserProfile",Schema)

module.exports=UserProfile