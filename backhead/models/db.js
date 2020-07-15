const mongoose = require("mongoose");
const cfg = require("../control/config.js")

const url = "mongodb://localhost:27017/" + cfg.db;

const db = mongoose.createConnection(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }
)

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log("database connected.");
});


module.exports = db;