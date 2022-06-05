const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const post = require('../models/post');

router.get('/', verifyToken, async (req, res) =>{
    try {
        const posts = await post.find({user: req.userID}).populate('users',['username']);
        res.json({success:true, posts});
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({success: false,message:'Internal server error'})
    }
})

router.post('/',verifyToken, async (req, res) => {
    const {title,description,url,status} = req.body;
    console.log( req.userID);

    if(!title){
        return res.status(404).json({success: false,message: 'No title' })
    }
    try {
        const newPost = new post({
        title,
        description, 
        url: url.startsWith('https://') ? url : `https://${url}`, 
        status: status || "TO LEARN",
        users: req.userID
    });
    await newPost.save();
    res.json({success: true,message: "Success",post: newPost});
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({success: false,message:'Internal server error'})
    }
})

router.put('/:id',verifyToken, async (req, res) =>{
    const { title, description ,url ,status} = req.body;
    

    if(!title){
        return res.status(404).json({success: false, message: 'No title' })
    }
    try {
    let updatePost ={
        title,
        description : description || '', 
        url: (url.startsWith('https://') ? url : `https://${url}`) || '', 
        status: status || "TO LEARN",
    };
    const postUpdateCondition = { _id: req.params.id, users: req.userID};
    updatePost = await post.findOneAndUpdate(postUpdateCondition, updatePost,{ new: true});
    if (!updatePost)
    return res.status(401).json({
        success: false,
        message: 'Post not found or user not authorised'
    })

    res.json({
        success: true,
        message: 'Excellent progress!',
        post: updatePost
    })

    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({success: false,message:'Internal server error'})
    }
})

router.delete('/:id',verifyToken, async (req, res)=>{
    try {
        const postDeleteCondition = { _id: req.params.id, users: req.userID};
        const deletePost = await post.findOneAndDelete(postDeleteCondition);

        if(!deletePost)
        return res.status(401).json({success:false,message:'Post not found or user not authorized'});
        res.json({success:true,post:deletePost})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"})
    }
})

module.exports = router