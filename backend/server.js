const express=require("express")
const cors=require("cors")
const routes=require("./routes/route")
const app=express()
const bodyparser=require("body-parser")

// const corsOptions = {
//     origin: 'https://turf-project-gold.vercel.app',  
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   };

// app.options("*",cors(corsOptions))
app.use(cors())

app.use(express.json())
app.use(express.static("./uploads"))

app.use(bodyparser.urlencoded())


app.use("/api",routes)

      
 




app.listen(3002,()=>{
    console.log("server started")

}



)






