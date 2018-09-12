const express = require("express")
const imageRouter = express.Router();
const ImageModel = require("../models/imageModel");

imageRouter.get("/", function (req, res) {
    ImageModel.find({})
    .populate("owner")
    .populate('comments.user'," avatarUrl name")
    .exec((err, imageFound)=>{
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, imageFound })
        
    })
})


imageRouter.post("/", (req, res) => {
    const { imageUrl, description, owner} = req.body;
    console.log(req.body)
    ImageModel.create(
        { imageUrl, description, owner },
        (err, imageCreated) => {
            if (err) res.status(500).send({ success: 0, err })
            else res.status(201).send({ success: 1, imageCreated })
        })
})

// imageRouter.post("/comment/create/:imageId",async function(req, res){
//     const {comments} = req.body;
//     let imageFound = await ImageModel.findById(req.params.imageId)
//     if(!imageFound) res.status(400).send({success:0 , message:"Image not Found"})
//     else{
//         ImageModel.create(
//             {comments},
//             (err, commentCreated) => {
//                 if(err) res.status(500).send({success:0 , err})
//                 else res.status(200).send({success:1 ,commentCreated})
//             }
//         )
//     }

// })



imageRouter.get("/:imageId", function (req, res) {
    ImageModel.findById({ _id: req.params.imageId }, function (err, Data) {
        if (err) res.status(500).send({ success: 0 }, err);
        else if (!Data) console.log("khong tim thay")
        else res.send({ success: 1, Data })
    })
})



imageRouter.put("/:imageId", (req, res) => {
    const { view, like, comments, description, owner } = req.body;
    const updateInfo = { view, like, comments, description, owner }
    ImageModel.findById(
      req.params.imageId,
      (err, imageFound) => {
        if(err) res.status(500).send({ success: 0, err })
        else if(!imageFound) res.status(404).send({ success: 0, message: "Image not exist!" })
        else {
          for(let key in updateInfo) {
            if(updateInfo[key]) {
              imageFound[key] = updateInfo[key];
            }
          }
          imageFound.save((err, imageUpdated) => {
            if(err) res.status(500).send({ success: 0, err })
            else res.send({ success: 1, imageUpdated });
          });
        }
      }
    );
  });


module.exports = imageRouter;