const child_process = require("child_process");
const express = require("express");
// const formidableMiddleware = require('express-formidable');

const app = express();
// app.use(formidableMiddleware());

const schedule = require("node-schedule");

const router = require("./control/router.js");
const cfg = require("./control/config.js");

const exec = child_process.exec;
const execFile = child_process.execFile;
const spawn = child_process.spawn;

/**
 * !api
 * @get
 * @post
 * @websocket
 */

app.all("/test", (req, res) => {
    var nothing = "屁都没有";
    if (JSON.stringify(req.query) != "{}") nothing = req.query;
    // res.send(req.query);
    res.send("<h1>FUCK YOU 🐶</h1> 你输入了: " + JSON.stringify(nothing));
});
app.listen(3030);


/**
 * !funtions
 * @flow_count
 * @flow_statistic
 */
function protectCam() {
    const conda = exec("conda activate", ["opencv"]);
    const cloudcam = spawn("python", ["-u", "socket/remote/cloudcam.py"]);

    cloudcam.stdout.on("data", (chunk) => {
        console.log(chunk.toString() + "*");
    });

    cloudcam.stdout.on("close", () => {
        console.log("closed");
        protectCam();
        //如果退出则重启进程，需要增加加密模块
    });

    cloudcam.stderr.on("data", (chunk) => {
        console.log(chunk.toString());
    });
}

function recvPersonNum() {
    // "conda", ["activate", "opencv"]
    // const conda = execFile(__dirname+"/tools/condativ.sh",(err) => {
    // if (err) { console.log(err); }
    // else {

        const personCount = spawn("python", ["-u", __dirname + "/socket/remote/recv_result.py"]);
        personCount.stderr.on("data", (chunk) => {
            console.log(chunk.toString());
        });

        personCount.stdout.on("data", (chunk) => {
            const reg = /^current flow:(\d+)/;//判断输出是否为人数
            const regParse = reg.exec(chunk.toString());

            //这里其实可以设置一个计数器，等到一定次数再直接存入数据库，这样就不需要缓冲文件
            if (regParse) {
                console.log(chunk.toString())

                const date = (new Date()).toLocaleDateString();
                const hour = (new Date()).getHours();
                const minute = (new Date()).getMinutes();
                const second = (new Date()).getSeconds();
                const stamp = date + '-' + hour + ':' + minute + ':' + second;
                const json = {
                    stamp: stamp,
                    time: {
                        date: date,
                        hour: hour,
                        minute: minute,
                        second: second
                    },
                    flow: parseInt(regParse[1]),
                    location: cfg.defCanteen,
                    cam: cfg.defCam,
                };
                const file = cfg.bufferFile;
                router.bufferFlow(json, file);//写入buffer
            }
        });

        personCount.stdout.on("close", () => {
            console.log("closed")
            recvPersonNum() //如果退出则重启进程，需要增加加密模块
        });


    // }
    // });

}

/**定时任务 */
const updateTraffic = schedule.scheduleJob(
    "* * * * * *", (fireDate) => {
        // console.log(fireDate)
        router.loadBuffer();
    }
)

// protectCam() 启动socket接收视频进程

recvPersonNum() //启动socket接收人数进程


