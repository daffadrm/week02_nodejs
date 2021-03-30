// load module http= core module
const http = require ('http');

//set port default in 1337
const port = process.env.PORT || 1337;

//create server method has 2 param => reques(req) respond(res)
const server = http.createServer(function(req,res){
    res.end("Hello bootcamp NodeJS");
});

server.listen(port);
console.log(`server listening on port ${port}`)