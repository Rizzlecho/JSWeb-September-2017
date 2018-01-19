const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');
// const Meme = require('../models/Meme');

router
    .get('/', function (req, res, next) {
        res.render('addGenre/genre')
    })
    .post('/', function (req, res, next) {
        let inputGenre = req.body;
        console.log(inputGenre);
        Genre.create(inputGenre).then((genre)=>{
            res.render('home/index');
        }).catch((err)=>{
            console.log(err.message);
            return;
        });
    });

module.exports = router;