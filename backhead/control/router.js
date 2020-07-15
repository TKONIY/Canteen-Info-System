const fs = require("fs");
const cfg = require("./config.js");
const Traffic = require("../models/traffic.js");


exports.bufferFlow = (json, file) => {
    //如果很多摄像头的化就需要修改这个接口

    path = __dirname + "/../records/" + file;
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
                    if (err) console.log("read file err:" + err);
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

exports.getFLows = (topk, callback) => {
    //先取20以内的doc,跨分钟的分成两部分查
    (new Date()).toFullLocaleDateTime().then((pack) => {
        const query = {
            date: pack.fullDate,
            hour: parseInt(pack.hour),
            minute: parseInt(pack.minute),
        }
        Traffic.findRecentFlows(
            cfg.maxDelay,
            (err, docs) => {
                if (err) {
                    console.log("find docs err:" + err);
                    callback("数据库错误", null);
                } else if (docs.length == 0) {
                    console.log("nothing found");
                    callback("摄像头没开", null);
                } else {
                    console.log("find " + docs.length + "docs");
                    callback()
                    //待完善TODO:cam和location都要检查，一层楼有一个摄像头爆了数据都是不对的
                    //现在仅假设每个楼层有一个摄像头,所以也不需要求和
                    //并且仅假设我们每个饭堂只需要返回<<<<<<<<<<<<<<<<<<<<<<<<<<<<<





                    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                    let data = {};
                    //recursive
                    (function loop(i) {
                        if (i >= docs.length) {
                            callback(null, data);
                            return;
                        } else {
                            if (!(docs[i].location in data)) {
                                data[docs[i].location] = docs[i].flow;
                            }
                            loop(i + 1);
                        }
                    })(0)
                }
            }
        )
    })
}
