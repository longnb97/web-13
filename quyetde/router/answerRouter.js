const express = require('express');
const router = express.Router();
const qM = require('../models/questionModel.js');

router.get("/:questionId/:vote", (req, res) => {
    qM.findOne({ _id: req.params.questionId }, function (err, resData) {
        let totalYes = resData.yes;
        let totalNo = resData.no;
        if(req.params.vote=="yes")
        {
            qM.updateOne({_id: req.params.questionId }, {yes: totalYes + 1}, (err, abc) => {} );
        }
        if(req.params.vote=="no")
        {
            qM.updateOne({_id: req.params.questionId }, {no: totalNo + 1}, (err, abc) => {} );
        }
    });
  
    
    res.redirect("/question/" + req.params.questionId);
});


module.exports = router ;