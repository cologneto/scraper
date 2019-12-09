const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);
const { Item } = require('./models/item');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS',);
    next();
});

app.post('/save-items', function (req, res) {
    Item.collection.insertMany(req.body, function (err) {
        if (err){
           res.send("Something went wrong!!!")
        } else {
            res.send('Done');
        }
    });
});

app.get('/items', (req, res) => {
    Item.find({}, (err, items) => {
        let itemMap = {};

        items.forEach(function(item) {
            itemMap[item._id] = item;
        });

        res.send(itemMap);
    })
});

app.put('/item/:id', function (req, res) {
    const o_userId = mongoose.Types.ObjectId(req.params.id);
    Item.findByIdAndUpdate(o_userId, {$set: req.body}, (err, item) => {
        if(err) return next(err);
        res.send('Product updates!')
    })
});

app.delete('/item/:id', function (req, res) {
    const o_userId = mongoose.Types.ObjectId(req.params.id);
    Item.findByIdAndRemove(o_userId, (err, item) => {
        if(err) return next(err);
        res.send('Product deleted!')
    })
});

app.get('/item/:id', (req, res) => {
    const o_userId = mongoose.Types.ObjectId(req.params.id);
    Item.findById(o_userId,(err, item) => {
        res.send(item);
    });
});

const port = process.env.PORT || 3001;
app.listen(3001, () => {
    console.log("Server running on port " + port);
});