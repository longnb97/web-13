const express = require("express");
const apiRouter = express.Router();
const userRouter = require("./userRouter");
const imageRouter = require(".//imageRouter");
const authRouter = require("./authRouter")

apiRouter.use("/", (req, res, next) =>{
    console.log(req.session);
    next();
})


apiRouter.use("/users", userRouter);

apiRouter.use("/images", imageRouter );

apiRouter.use("/auth", authRouter);



apiRouter.get("/", (req, res) => {
    res.send("api router")
});



module.exports = apiRouter;