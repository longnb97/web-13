const express = require("express")
const userRouter = express.Router();
const UserModel = require("../models/userModel");

const bcrypt = require("bcrypt-nodejs")

userRouter.get("/", (req, res) => {
    UserModel.find({}, (err, Data) => {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, Data })
    })
})

userRouter.post("/", (req, res) => {
    const { userNameInputed, email, password, avatarUrl, name } =req.body ; // gan gia tri cua cac key trong req.body vao gia gia tri cua cac key tuong ung trong const { userNameInputed, email, password, avatarUrl, name }
    const salt = bcrypt.genSaltSync();
    // const salt = bcrypt.genSalt(10,(err, saltGenerated)=>{
    //     if (err) console.log(err)
    //     else console.log("salt generated!")
    // });
    console.log(req.body)
    const hashPassword = bcrypt.hashSync(password, salt);

    //get rounds
    // const roundUsed = bcrypt.getRounds(hashPassword)
    // console.log(roundUsed)
    UserModel.create(
        { username:userNameInputed, email, hashPassword, avatarUrl, name },
        (err, userCreated) => {
            if (err) res.status(500).send({ success: 0, err })
            else res.status(201).send({ success: 1, userCreated })
        })
})
// userRouter.get("/testSearch", (req, res) => {
//     const {searchString} = req.body;
//     try {
//         UserModel.findOne({ username: searchString})
//         .then(userFound => {
//             if (!userFound) res.status(404).send({ success: 0, message: "user not found!" })
//             else res.status(200).send({ success: 1, userFound })
//         })
//         .catch(res.status(500).send({ success: 0, error }))
//     } catch (error) {
         
//     }
// })


//cach1

// userRouter.put("/:userId", function (req, res) {
//     const { password, avataUrl, name, email } = req.body;
//     console.log(req.body);
//     UserModel.findById(req.params.userId, function (err, Data) {
//         if (err) console.log(err)
//         else if (!Data) res.status(404).send({ success: 0, message: "Not exist!" });
//         else {
//             if (req.body.email) Data.email = req.body.email;
//             if (req.body.password) Data.password = req.body.password;
//             if (req.body.avataUrl) Data.avataUrl = req.body.avataUrl;
//             if (req.body.name) Data.name = req.body.name;
//             Data.save(function (err, userUpdated) {
//                 if (err) res.status(500).send({ success: 0, err })
//                 else res.send({ success: 1, userUpdated, userId: Data._id });
//             });
//         }
//     });
// });

//cach 1

// userRouter.put("/:userId", async function(req, res) {
//     try {   
//     const { password, avataUrl, name, email } = req.body;
//     let Data = await UserModel.findById(req.params.userId);
//     console.log(Data);
//         if (!Data) res.status(404).send({ success: 0, message: "Not exist!" });
//         else {
//             if (req.body.email) Data.email = req.body.email;
//             if (req.body.password) Data.password = req.body.password;
//             if (req.body.avataUrl) Data.avataUrl = req.body.avataUrl;
//             if (req.body.name) Data.name = req.body.name;
//             Data.save(function (err, userUpdated) {
//                 if (err) res.status(500).send({ success: 0, err })
//                 else res.send({ success: 1, userUpdated, userId: Data._id });
//             });
//         }
//     }catch(error){
//         res.status(500).send({ success: 0, message: "Nloi!" });
//     }

// });

//cach 2

// userRouter.put("/:userId", function (req, res) {
//     const { password, avatarUrl, name, email } = req.body;
//     console.log(req.body);
//     UserModel.findByIdAndUpdate(
//         req.params.userId,
//         {$set: {
//             "name": name,
//             "password": password,
//             "email": email,
//             "avatarUrl":avatarUrl 

//         }},{new:true}, function(err, userUpdated){
//             if (err) res.status(500).send({success:0, err})
//             else res.send({success: 1, userUpdated})
//         }
//     )
// });

//cach 3

// userRouter.put("/:userId", (req, res) => {
//     const { name, password, email, avatarUrl } = req.body;
//     const updateInfo = { name, password, email, avatarUrl };
//     UserModel.findById(req.params.userId, (err, Data) =>{
//         if (err) res.status(500).send({success:0, err})
//         if (!Data) res.status(400).send({success: 0, message:"User not exist"})
//         else{
//             for(let key in updateInfo){
//                 if(updateInfo[key]){
//                     Data[key] = updateInfo[key]
//                 }
//             }
//             Data.save((err, dataUpdated) => {
//                 if (err) res.status(500).send({success:0, err})
//                 else res.status(200).send({success: 1, dataUpdated })
//             })
//         }
//     })
// })

//promise cach 3

// userRouter.put("/:userId", (req, res) => {
//     const { name, password, email, avatarUrl } = req.body;
//     const updateInfo = { name, password, email, avatarUrl };
//     UserModel.findById(req.params.userId)
//         .then(Data => {
//             if (!Data) res.status(400).send({success: 0, message:"User not exist"})
//             else{
//                 for(let key in updateInfo){
//                     if(updateInfo[key]){
//                         Data[key] = updateInfo[key]
//                     }
//                 }
//                 return Data.save();
//             }
//         })
//         .then(dataUpdated => res.status(200).send({success: 1, dataUpdated }))
//         .catch( error =>  res.status(500).send({success:0, error }))

//     })

// async await cach 3

// userRouter.put("/:userId",   async function(req, res) {
//     const { name, password, email, avatarUrl } = req.body;
//     const updateInfo = { name, password, email, avatarUrl };
//     let userFound = await UserModel.findById(req.params.userId);
//     if(!userFound) res.status(404).send({success:0 , message:" user ko ton tai"}) 
//     else{
//         for(let key in updateInfo){
//             if(updateInfo[key]){
//                 userFound[key] = updateInfo[key]
//             }
//         }
//         let dataUpdated = await userFound.save();
//         res.status(200).send({success:1, dataUpdated});
//     }

// })

//asyn await cach 3 + try catch : level cuoi

userRouter.put("/:userId", async function (req, res) {
    const { name, password, email, avatarUrl } = req.body;
    const updateInfo = { name, password, email, avatarUrl };
    try {
        let userFound = await UserModel.findById(req.params.userId);
        if (!userFound) res.status(404).send({ success: 0, message: " 404 User not found" })
        else {
            for (let key in updateInfo) {
                if (key == 'password' && updateInfo[key]) {
                    let compare = bcrypt.compareSync(updateInfo.password, userFound.hashPassword)//compare tra ve true false
                    if (!compare) {
                        userFound.hashPassword = bcrypt.hashSync(updateInfo.password, bcrypt.genSaltSync())
                    }
                } else if (updateInfo[key]) {
                    userFound[key] = updateInfo[key]
                }
            }
            let dataUpdated = await userFound.save();
            res.send({ success: 1, dataUpdated });
        }
    } catch (error) {
        res.status(500).send({ success: error })
    }
})


userRouter.delete("/:userId", function (req, res) {
    // UserModel.findOneAndRemove({ _id: req.params.userId }, function (err) {
    //     if (err) res.status(500).send({ success: 0, err })
    //     else res.send({ success: 1 });
    // });
    UserModel.findByIdAndRemove(req.params.userId, function (err, dataDeleted) {
        if (err) res.status(500).send({ success: 0, err })
        if (!dataDeleted) res.status(400).send({ success: 0, message: "User not exist" })
        else res.send({ success: 1, message: "ok" });
    });
});


userRouter.get("/:userId", function (req, res) {
    UserModel.findById({ _id: req.params.userId }, function (err, Data) {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, Data });
    });
    // UserModel.find({},function(err, dataFound){
    //     for( let i= 0; i< dataFound.length; i++){
    //         if(dataFound._id[i]==red.params.userId){
    //             UserModel.remove(dataFound._id[i]);
    //         }
    //     }
    // })
});

module.exports = userRouter;