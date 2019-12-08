const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV)

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

const { Item } = require('./models/item')

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        var itemMap = {};

        items.forEach(function(item) {
            itemMap[item._id] = item;
        });

        res.send(itemMap);
    })
})

app.put('/item/:id', function (req, res) {
    Item.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, item) => {
        if(err) return next(err)
        res.send('Product updates!')
    })
})

app.delete('/item/:id', function (req, res) {
    console.log(req.params.id)
})

app.get('/item/:id', (req, res) => {
    console.log(req.params.id);
    Item.findById(req.params.id,(err, item) => {
        if(err) return next(err)
        res.send(item);
    });
})

const port = process.env.PORT || 3001
app.listen(3001, () => {
    console.log("Server running on port " + port)
})