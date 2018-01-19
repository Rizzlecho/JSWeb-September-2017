const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

router
    .get('/', function (req, res, next) {
        res.render('genre');
    })
    .post('/', function (req, res, next) {
        let inputGenre = req.body;
        console.log(inputGenre);
        Genre.create(inputGenre).then((genre) => {
            res.render('home');
        }).catch((err) => {
            console.log(err);
            return;
        });
    });

module.exports = router;