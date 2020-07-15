const Traffic = require("../models/traffic.js");

Traffic.deleteMany({ flow: 1 },()=>{})