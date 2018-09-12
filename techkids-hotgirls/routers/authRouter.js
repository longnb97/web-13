const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const authRouter = express.Router();

const UserModel = require("../models/userModel")

authRouter.post('/login', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400).send({ success: 0, message: "may dang thieu pass hoac id" })
    } else {
        UserModel.findOne({username})
            .then(userFound => {
                if (!userFound) res.status(404).send({ success: 0, message: "User not exist" })
                else {
                    const compare = bcrypt.compareSync(password, userFound.hashPassword)// tra ve true or false
                    if (compare){
                        req.session.user = {username: userFound.username, name: userFound.name, id: userFound._id}//trong req.session.user, user la minh tu dat
                        res.send({ success: 1, message: "Logged in!"  })
                    }    
                    else res.status(401).send({ success: 0, message: "Wrong password" })
                }
            })
            .catch(error => res.status(500).send({ success: 0, error }))
    }
})

authRouter.get("/logout", (req, res) => {
    req.session.destroy((err) =>{
        if(err) res.status(500).send({success:0 ,err })
        else res.send({success: 1, message:"logged out!"})
    })
})

module.exports = authRouter;
