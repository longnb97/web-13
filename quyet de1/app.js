const express = require('express');
const hbs  = require('express-handlebars');
const fs = require('fs');
const bodyParser = require("body-parser");
const questionList = require('./Question.json'); 



let app = express();

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

// app.use(express.static(__dirname + '/quyet de'));

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/question/add", (req, res) => {
    console.log(req.body);
    let newQuestion = {
        content: req.body.questionContent,
        yes: 0,
        no: 0,
        id: questionList.length
    };
    questionList.push(newQuestion);
    fs.writeFileSync('./Question.json', JSON.stringify(questionList));
    res.redirect('/question/'+newQuestion.id);
});

app.get("/", (req, res) => {
    let cauhoi = questionList[Math.floor(Math.random()*questionList.length)];
    res.render("home", {
        cauhoi
    });
});

app.get("/answer/:questionId/:vote", (req, res) => {
    questionList[req.params.questionId][req.params.vote] += 1;
    fs.writeFileSync('./Question.son', JSON.stringify(questionList));
    res.redirect("/question/"+req.params.questionId);
});

app.get("/question/:questionId", (req, res)=>{
    
    let cauhoi = questionList[req.params.questionId];
    res.render("question", {
        cauhoi,
        tong : cauhoi.yes + cauhoi.no
    });
})

app.get("/ask", (req, res) => {
    res.render("ask");
});

app.listen(1111, (err) => {
    if (err) console.log(err)
    else console.log("sv starts at 1111")
});