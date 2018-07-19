const express = require("express");
const hbs = require("express-handlebars");
const fs = require("fs");
const bodyParser = require("body-parser")
// const questionList = require("./questions.json");
const mongoose =require("mongoose");
const qM = require('./models/questionModel.js');

const answerRouter = require("./router/answerRouter.js");
const questionRouter = require("./router/questionRouter.js");
const askRouter = require("./router/askRouter.js");
let app = express();

app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/answer", answerRouter );

app.use("/question", questionRouter);

app.use("/ask", askRouter);

app.get("/", (req, res) => {
    qM.find({}, (err, resData) =>{
        if (err) console.log(err)
        else {
            let question = resData[Math.floor(Math.random() * resData.length)];
                res.render("home", {
                    question
                })
        }
    })
});

app.use(express.static('./views/layouts'));

mongoose.connect("mongodb://localhost:27017/quyetde",{ useNewUrlParser: true}, function(err){
    if(err) console.log(err)
    else console.log("DB connect success");
})
app.use(express.static("./style.css"));

app.listen(9999, function (err) {
    if (err) console.log(err)
    else console.log("Server is listening at port: 9999");
});