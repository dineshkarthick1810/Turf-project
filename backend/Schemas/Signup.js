const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dineshkarthick1810:dinesh18@cluster0.1bvkbxq.mongodb.net/Adminusers")

const Schema=new mongoose.Schema({
    username:String,
    mail:String,
    password:String,
    repassword:String,
    role:String

})

const Signup=mongoose.model("Users",Schema)

module.exports={
    Signup,
    Schema
}



