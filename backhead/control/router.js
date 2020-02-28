const fs = require("fs");
const cfg = require("./config.js");
const Traffic = require("../models/traffic.js");
// const db = require("../models/db_handy.js")

exports.bufferFlow = (json, file) => {
    //如果很多摄像头的化就需要修改这个接口

    path = __dirname + "/../logs/" + file;
    fs.writeFile(path, JSON.stringify(json), (err) => {
        if (err) {
            console.log(
                (new Date()).toLocaleTimeString() +
                "  failed to write " + path
            );
        } else {
            console.log(
                (new Date()).toLocaleTimeString() +
                "  write succeed"
            );
        }
    })
}

exports.loadBuffer = (callback) => {
    //这里仅实现将logs/下的所有buffer都加载到db中
    fs.readdir(__dirname + "/../records", (err, files) => {

        //循环将所有文件存入数据库，使用递归
        (function loop(i) {
            if (i >= files.length) {
                callback;
                return;
            } else {
                //写入数据库
                const path = __dirname + "/../records/" + files[i];
                fs.readFile(path, (err, data) => {
                    if (err) console.log("read file err:"+err);
                    else {
                        // console.log("fff"+data.toString());
                        const schema = JSON.parse(data.toString());
                        Traffic.create(schema, (err) => {//保存到数据库中
                            if (err) console.log(err.errmsg);
                            else {
                                console.log(JSON.stringify(schema) + " SAVED.");
                            }
                        });
                    }
                })
            }
            loop(i + 1);
        })(0)
    })
}

exports.getFLows = (callback) => {
    //从数据库中读取一条/多条数据,

    // const date = (new Date()).toLocaleDateString();
    // const hour = (new Date()).getHours();
    // const minute = (new Date()).getMinutes();
    // const second = (new Date()).getSeconds();
    // const stamp = date + '-' + hour + ':' + minute + ':' + second;

}
