const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const post = require('../models/post');

router.get('/', verifyToken, async (req, res) =>{
    try {
        const posts = await post.find({user: req.userId}).populate('users');
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
    console.log( req.userId);

    if(!title){
        return res.status(404).json({success: false,message: 'No title' })
    }
    try {
        const newPost = new post({
        title,
        description, 
        url: url.startsWith('https://') ? url : `https://${url}`, 
        status: status || "TO LEARN",
        user: req.userId
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

module.exports = router