const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dineshkarthick1810:dinesh18@cluster0.1bvkbxq.mongodb.net/Adminusers")

const Schema=mongoose.Schema({
    Adminid:String,
    Userid:String,
    username:String,
    date:Date,
    time:String,
    groundname:String,
    mailid:String,
    approved:Boolean,
    decline:Boolean
})

const modal=mongoose.model("Bookings",Schema)

module.exports=modal