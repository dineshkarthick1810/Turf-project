const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dineshkarthick1810:dinesh18@cluster0.1bvkbxq.mongodb.net/Adminusers")

const Schema=mongoose.Schema({

    reviews:String,
    starcount:Number,
    shopname:String,
    username:String,
    profile:String

})

const reviews=mongoose.model("reviews",Schema)

module.exports=reviews

