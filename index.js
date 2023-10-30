const express = require("express");
const { Connnection } = require("./db");
const { userRouter } = require("./Routes/user.routes");
const { postRoute } = require("./Routes/post.routes");
const app = express();
app.use(express.json())
require('dotenv').config()

const PORT = process.env.PORT


app.use("/users" ,userRouter )
app.use("/posts", postRoute)

app.use("/", (req,res)=>{
    res.status(200).send({"msg" : "this is home route"})
})

app.listen(PORT , async()=>{
    try {
        await Connnection
        console.log("connectred to DB")
    } catch (error) {
        console.log("error While connecting to server")
    }
})

