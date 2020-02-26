## socket很多bug
* 每次断开之后就会持续很久的address already in use
    * 现在只能手动断开 lsof -i:9999
* 如果服务器的socket断开，local会不知所措
* 如果本地比服务器先开启链接，则会导致服务器一直增加进程而报错.
## 后端脚本运行方法
* pm2 stop app.js 先停止之前运行的代码，防止端口占用
* pm2 start app.js 
* 其中接收人数的脚本永远处于运行状态，由pm2守护不断执行,等待local的连接
## 未完善
* 响应前端请求

## 前端脚本运行方法
* ./socket/local/local-detector 内是yolov3模型文件，大部分来自https://github.com/ayooshkathuria/pytorch-yolo-v3，我在他的基础上加上了socket。
* 本地运行摄像头的方法为: 
  * 下载yolov3权重到local-detector文件夹下,链接作者给出了
  * conda activate 环境名(需要pytorch1.0,python3.6+, opencv3+)
  * python cam_demo.py --host  服务器ip
  * 默认目标端口为9999

## mongodb数据库结构
* db:           canteen
* collection:   traffic
* document:     ↓
```json
{
    time:{
        date: "2020/2/26"
        hour: 16
        minute: 25
        second: 5
    }
    flow: 15
    location: "学一"
    cam: 2 //摄像头在该楼层的编号
}
```
> 格式说明:
> ```js
> doc.time.date:    (new Date()).toLocaleDateString()) 
> doc.time.hour:    (new Date()).getHours()
> doc.time.minute:  (new Date()).getMinutes()
> doc.time.second:  (new Date()).getSeconds()
> ```
> * language: `nodejs`  
> * 其他语言开发者可在命令行输入`node`启动nodejs环境，并执行以上命令进行测试。