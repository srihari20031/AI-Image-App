import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';


const router = express.Router();
const CLOUDINARY_CLOUD_NAME = "dwqbfnu4v"
const CLOUDINARY_API_KEY = "739125467418516"
const CLOUDINARY_API_SECRET = "2HZaq3s9CM8GxB_ar4Fjvq9iOTw"


dotenv.config();

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});
router.route('/').get(async(req,res)=>{
    try{
        const posts = await Post.find({});
        res.status(200).json({success: true, data: posts})

    }
    catch(error){
        res.status(500).json({success: false, message: error})
    }
});


router.route('/').post(async (req,res) => {
   try{
    const { name, prompt, photo} = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
    })
    res.status(201).json({success: true, data:newPost});
   }
   catch(error){
    res.status(500).json({ success: false, message: error})
   }
})




export default router