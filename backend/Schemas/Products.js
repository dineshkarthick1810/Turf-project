const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dineshkarthick1810:dinesh18@cluster0.1bvkbxq.mongodb.net/Adminusers")

const Schema=new mongoose.Schema({
    image:String,
    name:String,
    shopname:String,
    phonenumber:String,
    address:String,
    price:String,
    description:String,
    location:String,
    id:String
    
})

const ProductsModal=mongoose.model("Products",Schema)

module.exports=ProductsModal