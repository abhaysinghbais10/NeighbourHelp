const express = require("express");
const colors = require('colors'); 
const morgan = require('morgan'); 
const mySqlPool = require("./config/db");
const cors = require("cors");

//rest object
const app = express();

app.use(cors({
    origin: "http://127.0.0.1:8080",  // Corrected to remove extra space
}));
//middleware
app.use(express.json());
app.use(morgan("dev"));
//routes



app.use('/api/v1/report' , require("./routes/reportRoutes"))

app.get("/test", (req,res)=>{
    res.status(200).send("<h1>Node js MySQL application</h1>");
});

// port
const PORT =8080;

// conditionally listen
mySqlPool.query('SELECT 1').then(()=>{
    //mysql
    console.log("my sql connected");
    //listen
app.listen(PORT, ()=>{
    console.log("Server Running".bgMagenta.white);
});

}).catch((error)=>{
    console.log(error);
});