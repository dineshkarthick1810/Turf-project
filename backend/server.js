const express=require("express")
const cors=require("cors")
const routes=require("./routes/route")
const app=express()
const bodyparser=require("body-parser")

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://turf-project-gold.vercel.app'); // Your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle pre-flight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();  // Respond to OPTIONS requests
  }

  next();  // Proceed to the next middleware/route
});

app.use(express.json())
app.use(express.static("./uploads"))

app.use(bodyparser.urlencoded())


app.use("/api",routes)

      
 




app.listen(3002,()=>{
    console.log("server started")

}



)






