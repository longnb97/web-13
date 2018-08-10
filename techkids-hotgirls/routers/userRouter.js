const express = require("express")
const userRouter = express.Router();
const UserModel = require("../models/userModel");

userRouter.get("/", (req, res) => {
    UserModel.find({}, (err, Data) => {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, Data })
    })
})

userRouter.post("/", (req, res) => {
    const { username, email, password, avataUrl, name } = req.body;
    console.log(req.body)
    UserModel.create(
        { username, email, password, avataUrl, name },
        (err, userCreated) => {
            if (err) res.status(500).send({ success: 0, err })
            else res.status(201).send({ success: 1, userCreated })
        })
})


userRouter.put("/:userId", function (req, res) {
    const { password, avataUrl, name } = req.body;
    UserModel.findById({ _id: req.params.userId }, function (err, Data) {
        if (err) console.log(err)
        else {
            if (req.body.username) Data.username = req.body.username;
            if (req.body.password) Data.password = req.body.password;
            if (req.body.avataUrl) Data.avataUrl = req.body.avataUrl;
            if (req.body.name) Data.name = req.body.name;
            Data.save(function (err) {
                if (err) res.status(500).send({ success: 0, err })
                else res.send({ success: 1, userId: Data._id });
            });
        }
    });
});



userRouter.delete("/:userId", function (req, res) {
    UserModel.findOneAndRemove({ _id: req.params.userId }, function (err) {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1 });
    });
});


userRouter.get("/:userId", function (req, res) {
    UserModel.findById({ _id: req.params.userId }, function (err, Data) {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, Data });
    });
});

module.exports = userRouter;