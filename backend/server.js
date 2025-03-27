const express=require("express")
const cors=require("cors")
const routes=require("./routes/route")
const app=express()
const bodyparser=require("body-parser")
const path=require("path")

const corsOptions = {
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  };

app.use(cors(corsOptions))
app.options("*",cors(corsOptions))


app.use(express.json())
app.use(express.static(path.join(__dirname, "routes/uploads")))

app.use(bodyparser.urlencoded({extended:true}))


app.use("/api",routes)

      
 




app.listen(3002,()=>{
    console.log("server started")

}



)






