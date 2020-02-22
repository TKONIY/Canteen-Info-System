import cv2
import socket
import sys

def recvBytes(csocket, length):
    data = bytes()
    while len(data) < length:
        data = data + csocket.recv(1024)
    return data


def cam2cloud(host, show=True, sleep=15, port=9999):
    # 本地的sleep=15，是因为opencv的imshow函数至少需要这么多时间
    # 远程的sleep=25，摄像头视频流FPS=30，理论间隔33ms，这里取15+20=35ms纯粹是通过实验得出的结论
    
    # 从摄像头取流
    cap = cv2.VideoCapture(0)
    if not cap.isOpened(): return 0

    # 连接
    s = socket.socket()
    s.connect((host, port))

    while True:
        # 获取一帧图片并压缩一倍
        ret, frame = cap.read()
        w, h, c = frame.shape  # w = 480, h = 640
        frame = cv2.resize(frame, (h // 2, w // 2))
        if show:
            cv2.imshow("local_cam", frame)
            cv2.waitKey(sleep) # 给15毫秒给opencv画图 

        # 编码
        ret, jpg = cv2.imencode('.jpg', frame)
        string_data = jpg.tostring()
        length = len(string_data)
        print("frame's length:%d" % length)

        # 接收next请求
        request = recvBytes(csocket=s, length=4)
        request = request.decode('utf-8')

        # 发送数据长度
        if request=='next':
            s.send(str(length).ljust(16).encode('utf=8'))
        
        # 接收ok请求
        request = recvBytes(csocket=s, length=2)
        request = request.decode('utf-8')

        # 发送图片数据
        if request == 'ok':
            s.send(string_data)
            print("jpg already sent.")

serverip = sys.argv[1]
cam2cloud(host=serverip)
