module.exports = {
    defCanteen: "学一",
    defCam: 2,
    db: "canteen",
    coll: "traffic",
    bufferFile: "flow.json",
    //bufferFile在logs文件夹下,以后应该是每层楼和每个摄像头都有一个文件
    topkFlows:1 //每次读出发送回前端的数据条数
}

//一些配置