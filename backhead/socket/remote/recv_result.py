import socket
from cloudcam import recvBytes

def socket2cloud(host="0.0.0.0", port=9999, listen=1, sleep=0):
    s = socket.socket()
    # s.settimeout(CHECK_TIMEOUT)
    # s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
    s.bind((host, port))
    s.listen(listen)
    # verified
    slocal, addr = s.accept()
    print('locol pc:%s' % str(addr))
    

    while True:
        slocal.send('next'.encode('utf-8'))
        person = recvBytes(csocket=slocal,length=16)
        person = int(person.decode("utf-8")) # 
        print("current flow:%d"%person)

socket2cloud()