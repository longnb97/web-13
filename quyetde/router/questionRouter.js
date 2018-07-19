const express = require("express");
const router = express.Router();
const qM = require('../models/questionModel.js');


router.get("/:questionId", (req, res) => {
    // let question = questionList[req.params.questionId];
    qM.findOne({_id: req.params.questionId}, (err, resData) => {
        if (err) console.log(err)
        else {
            let totalVote = resData.yes + resData.no ;
            
            let question = resData;
            res.render("question",{
                question,
                totalVote
            });
        } 
    }); 
});

router.post("/add", (req, res) => {
    console.log(req.body);
    let newQuestion = {
        content: req.body.questionContent,
    };
    qM.create(newQuestion,function(err,questionCreated){
        if(err) console.log(err)
        else res.redirect("/question/"+questionCreated._id);
    })
});
module.exports = router;