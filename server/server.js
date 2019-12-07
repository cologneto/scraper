const express = require('express')
const mongoose = require('mongoose')
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV)

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

const { Item } = require('./models/item')


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log("Server running on port " + port)
})