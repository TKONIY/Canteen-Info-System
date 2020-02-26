const fs = require("fs")
const cfg = require("./config.js")

exports.bufferFlow = (json, file) => {
    //如果很多摄像头的化就需要修改这个接口
    path = __dirname + "/../logs/" + file
    fs.writeFile(path, JSON.stringify(json), (err) => {
        if (err) {
            console.log(
                (new Date()).toLocaleTimeString() +
                "  failed to write " + path
            );
        } else {
            console.log(
                (new Date()).toLocaleTimeString() +
                "  write succeed")
        }
    })
}