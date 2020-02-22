const child_process = require("child_process");
const express = require("express");

const exec = child_process.exec;
const spawn =child_process.spawn;
const app = express();


cmd = "python socket/remote/cloudcam.py "

// exec(cmd, (error, stdout, stderr)=>{
//     if(error)console.log(errer)
//     else if (stderr)console.log(stderr)
//     else console.log(stdout);
// })

//以流的方式读取标准输出
const cloudcam = spawn("python",["-u","socket/remote/cloudcam.py"]);
// cloudcam.stdout.on("data",(data)=>{
//     var arr = data.toString().split('\n')
//     console.log(arr.length);
// })

//cloudcam.stdout.pipe(process.stdout);

cloudcam.stdout.on("data",(chunk)=>{
    console.log(chunk.toString()+"*");
})

// subprocess.stdout.on("data",(chunk)=>{
//     console.log(data.toString);
// })