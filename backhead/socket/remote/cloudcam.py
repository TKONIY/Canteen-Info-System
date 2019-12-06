# env: cv2, socket, numpy, python=3.6
# --encoding:utf-8--
# author : TKONIY  time: 2019/12/5
import cv2
import socket
import numpy as np


def recvBytes(csocket, length):
    data = bytes()
    while len(data) < length:
        data = data + csocket.recv(1024)
    return data


def socket2cloud(host="0.0.0.0", port=9999, listen=1, sleep=25):
    # 新建socket
    s = socket.socket()
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)  # 重置端口
    s.bind((host, port))
    s.listen(listen)

    # verified
    slocal, addr = s.accept()
    print('locol pc:%s' % str(addr))
    # 补充地址识别

    while True:
        # 发送接收长度请求，长度为4
        slocal.send('next'.encode('utf-8'))

        # 接收长度,长度固定为16字节字符串
        length = recvBytes(csocket=slocal, length=16)
        length = int(length.decode('utf-8'))
        print("length received: %d" % length)  # 检查收到的长度信息L

        # 发送接收图片的请求，长度为2
        slocal.send('ok'.encode('utf-8'))

        # 接收图片
        jpg = recvBytes(csocket=slocal, length=length)
        print(len(jpg))  # 检查收到的字节长度
        arr = np.fromstring(jpg, dtype='uint8')
        img = cv2.imdecode(arr, 1)
        print(img.shape)

        # 休眠线程
        cv2.waitKey(sleep)


socket2cloud()
