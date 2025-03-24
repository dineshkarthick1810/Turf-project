const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dineshkarthick1810:dinesh18@cluster0.1bvkbxq.mongodb.net/Adminusers")
const Schema=new mongoose.Schema({
    profileimage:String,
    id:String
})


const Profile=mongoose.model("Profile",Schema)

module.exports={
    Profile,
    Schema
}