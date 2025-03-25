const express=require("express")
const cors=require("cors")
const routes=require("./routes/route")
const app=express()
const bodyparser=require("body-parser")

app.use(cors())
app.use(express.json())
app.use(express.static("./uploads"))

app.use(bodyparser.urlencoded())

app.use("/api",routes)

      
 




app.listen(3002,()=>{
    console.log("server started")

}



)






