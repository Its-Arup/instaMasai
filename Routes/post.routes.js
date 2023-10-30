const express = require("express");
const { auth } = require("../Middleware/auth.middleware");
const { PostModel } = require("../Models/post.model");

const postRoute = express.Router()

postRoute.use(auth)


postRoute.post("/add" , async(req,res) => {
    try {
        const newpost = new PostModel(req.body)
        await newpost.save()
        res.status(200).send({"msg" : "new post added successfully"})
    } catch (error) {
        res.status(400).send({"msg" : "Error to add new post"})
    }
})

postRoute.get("/", async(req,res)=>{
    try {
        const posts = await PostModel.find({name : req.body.name})
        req.status(200).send(posts)
    } catch (error) {
        res.status(400).semd({"msg" : "Error to get posts"})
    }
})

postRoute.patch("/update/:id", async(req,res)=>{
    const {id} = req.params
    try {
        const post = await PostModel.findOne({_id : id})
        if(req.body.userID == post.userID){
            await PostModel.findIdAndUpdadte({_id:id}, req.body)
            res.status(200).send({"msg" : "successfully updated the post"})
        } 
    } catch (error) {
        res.status(400).semd({"msg" : "error to update the post"})
    }
})

postRoute.delete("/delete" , async(req,res)=>{
    const {id} = req.params
    try {
        const post = await PostModel.findOne({_id : id})
        if(req.body.userID == post.userID){
            await PostModel.findIdAndDelete({_id:id})
            res.status(200).send({"msg" : "successfully Deleted the post"})
        } 
    } catch (error) {
        res.status(400).semd({"msg" : "error to Delete the post"})
    }
})

module.exports={
    postRoute
}