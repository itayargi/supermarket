// import { createServer } from 'http'; // 1 - Import Node.js core module
const http = require("http");
var server = http.createServer(function (req, res) {   // 2 - creating server

    //handle incomming requests here..
    res.writeHead(200);
    res.end("My first server!");
});

server.listen(5000); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')