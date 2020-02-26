const child_process = require("child_process");
const express = require("express");

const router = require("./control/router.js")
const cfg = require("./control/config.js")

const exec = child_process.exec;
const spawn = child_process.spawn;
const app = express();



function protectCam() {
    const conda = exec("conda activate", ["opencv"])
    //以流的方式读取标准输出
    const cloudcam = spawn("python", ["-u", "socket/remote/cloudcam.py"]);

    cloudcam.stdout.on("data", (chunk) => {
        console.log(chunk.toString() + "*");
    })
    cloudcam.stdout.on("close", () => {
        console.log("closed")
        protectCam() //如果退出则重启进程，需要加密
    })
    cloudcam.stderr.on("data", (chunk) => {
        console.log(chunk.toString())
    })
}

function recvPersonNum() {
    const personCount = spawn("python", ["-u", __dirname + "/socket/remote/recv_result.py"]);
    personCount.stderr.on("data", (chunk) => {
        console.log(chunk.toString());
    });  


    personCount.stdout.on("data", (chunk) => {
        const reg = /^current flow:(\d+)/;
        const regParse = reg.exec(chunk.toString());
        //判断输出是否为人数
        //这里其实可以设置一个计数器，等到一定次数再直接存入数据库，这样就不需要中间文件
        if (regParse) {
            console.log(chunk.toString())
            const json = {
                time: {
                    date: (new Date()).toLocaleDateString(),
                    hour: (new Date()).getHours(),
                    minute: (new Date()).getMinutes(),
                    second: (new Date()).getSeconds(),
                },
                flow: parseInt(regParse[1]),
                location: cfg.defCanteen,
                cam: cfg.defCam,
            };
            const file = cfg.bufferFile;
            router.bufferFlow(json, file);
        }
        //save flow
    })

    personCount.stdout.on("close", () => {
        console.log("closed")
        recvPersonNum() //如果退出则重启进程，需要加密防止别人进来
    })
}

// protectCam()
recvPersonNum()

