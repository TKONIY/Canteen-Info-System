const child_process = require("child_process");
const express = require("express");

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
    const personCount = spawn("python", ["-u", "socket/remote/recv_result.py"]);
    personCount.stdout.on("data", (chunk) => {
        console.log(chunk.toString() + "/");
    })
    personCount.stderr.on("data", (chunk) => {
        console.log(chunk.toString())
    })
    personCount.stdout.on("close", () => {
        console.log("closed")
        recvPersonNum() //如果退出则重启进程，需要加密防止别人进来
    })
}

// protectCam()
recvPersonNum()

