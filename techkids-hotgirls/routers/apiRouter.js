const express = require("express");
const apiRouter = express.Router();
const userRouter = require("./userRouter");
const imageRouter = require("../models/imageModel");

apiRouter.use("/users", userRouter);

apiRouter.use("/images", imageRouter );


apiRouter.get("/", (req, res) => {
    res.send("api router")
});



module.exports = apiRouter;