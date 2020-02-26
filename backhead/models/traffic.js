const mongoose = require("mongoose");

const db = require("./db.js"); //连接好的db

const trafficSchema = new mongoose.Schema(
    {
        stamp: {
            type: String,
            unique: true,
            index: true
        },
        time: {
            date: String,
            hour: Number,
            minute: Number,
            second: Number,
        },
        flow: Number,
        location: String,
        cam: Number
    },
    { collection: "traffic" }
);

const Traffic = db.model("traffic", trafficSchema);

module.exports = Traffic;