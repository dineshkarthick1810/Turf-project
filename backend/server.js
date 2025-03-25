const express=require("express")
const cors=require("cors")
const routes=require("./routes/route")
const app=express()
const bodyparser=require("body-parser")

const corsOptions = {
    origin: 'https://turf-project-gold.vercel.app',  // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // If you need to include cookies or credentials in the request
    preflightContinue: false,  // This is important for preflight requests
    optionsSuccessStatus: 204,  // For legacy browsers
  };

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("./uploads"))

app.use(bodyparser.urlencoded())

app.options("*", cors(corsOptions));

app.use("/api",routes)

      
 




app.listen(3002,()=>{
    console.log("server started")

}



)






