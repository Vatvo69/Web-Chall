const express = require('express')
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer')
const https = require('https')
const fs = require('fs')
const request = require('request')
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const launchOptions = {
    ignoreHTTPErrors: true,
    args: [
        '--no-sandbox',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-extensions',
        '--disable-gpu',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-first-run',
        '--safebrowsing-disable-auto-update'
      ]
}

async function send(req,res){
    res.send("Sending...");
    console.log("Send: "+`${req.body.css}`);
    var payload = "http://127.0.0.1:9009/flag.html?css="+req.body.css+"\n";
    console.log("Run payload in localhost: "+payload);
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:9009/flag.html?css="+req.body.css,{waitUntil:"load"}).catch(e=>console.log(e))
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.close()
    console.log('Send End');
}

app.post('/send.html',send);

app.use("/",express.static('public'));

var server = app.listen(80,function(){
    var host = server.address().host;
    var port = server.address().port;
    console.log('Run Chall: http://127.0.0.1:80/');
})

const app1=express();

app1.get('/flag.html',function(req,res){
    req.query.css = req.query.css || "";
    console.log(req.query);
    if(req.query.css.startsWith("http://") || req.query.css.startsWith("https://")){
        res.send(`<html>
            <link rel="stylesheet" href=${encodeURI(req.query.css)}>
            <form>
                <input name="flag" value="${fs.readFileSync('flag.txt')}">
                <input type="submit" value="submit">
            </form>
        </html>`)
    }
    else{
        res.send("Bad request, Only allow http or https!")
    }
})
app1.listen(9009,()=>console.log("Server Flag: http://127.0.0.1:9009/"))