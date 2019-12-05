# ! .conda/envs/pytorch-gpu/bin/env python
# --encoding:utf-8--
# author : TKONIY  time: 2019/12/5
import cv2
import socket
import numpy as np


def socket2cloud(host="0.0.0.0", port=9999, listen=1, w=480 / 2, h=640 / 2, sleep=33):
    # 新建socket
    s = socket.socket()
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)  # 重置端口
    s.bind((host, port))
    s.listen(listen)

    # verified
    slocal, addr = s.accept()
    print('locol pc:%s' % str(addr))
    # if addr=='59.64.129.168'
    slocal.send('ok'.encode('utf-8'))

    while True:
        # 接收长度与数据
        reply = slocal.recv(16)

        length = reply.decode('utf-8')
        print(reply)
        slocal.send('ok'.encode('utf-8'))

        jpg = slocal.recv(int(length))
        # 解码
        arr = np.fromstring(jpg,dtype='uint8')
        img = cv2.imdecode(arr, 1)
        print(img.shape)
        cv2.waitKey(sleep)
        slocal.send('ok'.encode('utf-8'))


socket2cloud()
