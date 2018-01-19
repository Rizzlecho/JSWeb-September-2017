const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');
const Meme = require('../models/Meme');

router
.get('/', function (req, res, next) {
    Genre.find().then((genres)=> {
        res.render('addMeme/add');
    });
})
.post('/', function (req, res, next) {
    let memeObj = req.body;
    let picture = req.files.meme;
    let path = `./public/images/${picture.name}`;
    memeObj.memeName = memeObj.memeName.toLowerCase();
    if(memeObj.status === undefined){
        memeObj.status = 'off';
    }


});