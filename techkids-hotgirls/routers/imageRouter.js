const express = require("express");
const imageRouter = express.Router();
const ImageModel = require("../models/imageModel");

imageRouter.get("/", function (req, res) {
    ImageModel.find({}, function (err, Data) {
        if (err) res.status(500).send({ success: 0, err })
        else if (!Data) console.log("khong tim thay");
        else res.send({ success: 1, Data });
    })
})

imageRouter.post("/", function (req, res) {
    const { user, view, like, comments, imageUrl, description, owner } = req.body;
    newImage = {
        user, view, like, comments, imageUrl, description, owner
    }
    ImageModel.create(newImage, function (err, imageCreated) {
        if (err) res.status(500).send({ success: 0, err });
        else res.status(201).send({ success: 1, imageCreated })
    })
});

imageRouter.get("/:imageId", function (req, res) {
    ImageModel.findById({ _id: req.params.imageId }, function (err, Data) {
        if (err) res.status(500).send({ success: 0 }, err);
        else if (!Data) console.log("khong tim thay")
        else res.send({ success: 1, Data })
    })
})

imageRouter.put("/:imageId", function (req, res) {
    const { imageUrl, description } = req.body;
    ImageModel.findById({ _id: req.params.imageId }, function (err, Data) {
        if (err) console.log(err)
        else if (!Data) console.log("ko tim thay");
        else {
            if (req.body.imageUrl) Data.imageUrl = req.body.imageUrl;
            if (req.body.description) Data.description = req.body.description;
            Data.save(function (err) {
                if (err) res.status(500).send({ success: 0, err })
                else res.send({ success: 1, imageId: Data._id });
            });
        }
    })
})