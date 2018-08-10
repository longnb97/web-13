const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");

const apiRouter = require("./routers/apiRouter");


let app = express();

app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());


mongoose.connect("mongodb://localhost/techkids-hotgay",(err)=>{
    if (err) console.error(err)
    else console.log("DB connect success!")
})

app.use("/api", apiRouter);
 

const port = 1111;
app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log(`Sever is listening at ${port}`)
});