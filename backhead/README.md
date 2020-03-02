## socket很多bug
* 每次断开之后就会持续很久的address already in use
    * 现在只能手动断开 lsof -i:9999
* 如果服务器的socket断开，local会不知所措
* 如果本地比服务器先开启链接，则会导致服务器一直增加进程而报错.
## 后端脚本运行方法
* mongod --dbpath database --fork --logpath logs/dblog后台运行数据库(如果没开)
* conda activate opencv(还没找到好的实现方法)
* pm2 stop app.js 先停止之前运行的代码，防止端口占用
* pm2 start app.js 
* 其中接收人数的脚本永远处于运行状态，由pm2守护不断执行,等待local的连接
## 未完善
* 响应前端请求
* 现在是默认饭堂和默认摄像头,如果集成多个摄像头还需要写很多漂亮的接口(还没想到实现方法,可能要跑多个进程?)
* 防止重复，在摄像头掉线后不再读取

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
```js
{
    stamp: "2020/02/26-16:25:05",

    date: "2020/02/26",
    hour: 16,
    minute: 25,
    second: 5,

    flow: 15,
    location: "学一",
    cam: 2 //摄像头在该楼层的编号
}
```



## 其他:
实时人数的更新暂定使用ws协议实时传送,后端实现有两种方式
1. 将20fps的输出信息直接转发到ws，可能会有点眼花缭乱。
2. 每隔一秒从数据库中读出最新人数.
3. 同时使用一个文件作为缓存如果不加锁会很危险，所以我选择直接存入数据库。

## 前端websocket通信的坑
暂时的解决方法:
1. 现在设定30s/1min内的数据没有就表示摄像头掉线，因而我只在数据库里面找30s以内的
2. 然后将这些存在的各拿一条最新的返回给前端，{a:1,b:2,c:3},后端还需要将同一层楼的摄像头求和，仅返回饭堂的给前端。