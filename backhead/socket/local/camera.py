# env: cv2, socket,  python=3.6
# --encoding:utf-8--
# author : TKONIY  time: 2019/12/5

import cv2
import socket


def cam2cloud(show=True, sleep=33, host="49.234.121.191", port=9999):
    # show  表示是否展示视频
    # sleep 表示1000/fps
    cap = cv2.VideoCapture(0)
    if not cap.isOpened(): return 0

    # connect and verified
    s = socket.socket()
    s.connect((host, port))

    while True:
        # 取流
        ret, frame = cap.read()
        w, h, c = frame.shape  # w = 480, h = 640
        frame = cv2.resize(frame, (h // 2, w // 2))
        if show:
            cv2.imshow("local_cam", frame)

        # 编码
        ret, jpg = cv2.imencode('.jpg', frame)
        string_data = jpg.tostring()
        # print(len(string_data))

        reply = s.recv(2)
        if reply.decode('utf-8') == 'ok':
            # 收到请求则发送，首先发送字符串大小，转换为字符串左对齐
            trash = s.recv(100)
            s.send(str(len(string_data)).ljust(16).encode('utf-8'))
        reply = s.recv(2)
        if reply.decode('utf-8') == 'ok':
            # 发送图片，多送20个空格避免出错
            s.send(string_data)


cam2cloud()