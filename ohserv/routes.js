const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

const Cast = require('./cast');

const poster_dir = '/mnt/c/hold/ohserv/static/posters/';
const pics_dir = '/mnt/c/hold/ohserv/static/pics/';

const MONGODB = 'mongodb://localhost:27017/ohdb';
mongoose.connect(MONGODB);

router.get('/', (req, res) => {
    res.send({ message: 'outerheaven API v' + Math.random() });
});

router.get('/casts', (req, res) => {
    Cast.find({}, (err, casts) => {
        if (err) {
            return res.send(err);
        } else {
            res.json(casts);
        }
    }).sort('-date');
});

router.get('/casts/random', (req, res) => {
    Cast.countDocuments().exec((err, count) => {
        Cast.findOne().skip(Math.floor(Math.random() * count))
            .exec((err, cast) => {
                if (err) {
                    return res.send(err);
                }
                res.json(cast);
            });
    });
});

router.get('/casts/:cast_date', (req, res) => {
    let cast_date = req.params.cast_date;
    Cast.find({'date': cast_date}, (err, cast) => {
        if (err) {
            return res.send(err);
        } else {
            res.json(cast);
        }
    });
});

router.get('/casts/:cast_start_date/:cast_end_date', (req, res) => {
    let cast_start_date = req.params.cast_start_date;
    let cast_end_date = req.params.cast_end_date;

    Cast.find({'date': {$gte:cast_start_date, $lte:cast_end_date}}, (err, cast) => {
        if (err) {
            return res.send(err);
        } else {
            res.json(cast);
        }
    });
});

//Maybe implement priority search ordering
//Ex: 'starts with' shows first
router.get('/show/:show', (req, res) => {
    let show = req.params.show;
    Cast.find({'shows' : new RegExp(show, 'i')}, (err, casts) => {
        if (err) {
            return res.send(err);
        }
        res.json(casts);
    });
});

router.get('/poster/:poster_name', (req, res) => {
    let poster_name = req.params.poster_name;
    
    fs.access(poster_dir + poster_name + ".jpg", (err) => {
        if (err) {
            poster_name = "poster";
        }
        res.sendFile(poster_name + ".jpg", {root: poster_dir});
    });
});

router.get('/pics/:cast_date', (req, res) => {
    let cast_date = req.params.cast_date;

    fs.readdir(pics_dir + cast_date, (err, files) => {
        if (err) {
            return res.send(err);
        }
        let files_with_type = [];
        for (let i = 0; i < files.length; i++) {
            let type = files[i].split(".")[1];
            files_with_type.push({"name": files[i], "type": type});
        }
        res.json(files_with_type);
    });
});

router.get('/pic/:cast_date/:pic_name', (req, res) => {
    let pic_name = req.params.pic_name;
    let cast_date = req.params.cast_date;
    fs.access(pics_dir + cast_date + "/" + pic_name, (err) => {
        if (err) {
            return res.send(err);
        }
        res.sendFile(pic_name, {root: pics_dir + cast_date});
    });
});

module.exports = router;