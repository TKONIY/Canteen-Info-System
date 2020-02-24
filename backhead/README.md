## socket很多bug
* 每次断开之后就会持续很久的address already in use
    * 现在只能手动断开 lsof -i:9999
* 如果服务器的socket断开，local会不知所措
* 如果本地比服务器先开启链接，则会导致服务器一直增加进程而报错.
## 后端脚本运行方法
* pm2 stop app.js 先停止之前运行的代码，防止端口占用
* pm2 start app.js 
* 其中接收人数的脚本永远处于

## 未完善
* 响应前端请求
