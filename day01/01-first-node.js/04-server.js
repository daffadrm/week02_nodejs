// load module http= core module
const fs = require('fs');
const http = require ('http');


//set port default in 1337
const port = process.env.PORT || 1337;

const product ={
    id: 1 ,
    name: "Laptop Dell",
    price: 1500.00,
    variant :{
        type: "gamer",
        core : "i7 Core"
    }
}

//create server method has 2 param => reques(req) respond(res)
const server = http.createServer(function(req,res){
    if (req.url == '/') return responceText(req,res);
    if (req.url == '/json') return responceJson(req,res);
    if (req.url.match(/^?static/)) return responceStatic(req,res);
    responceNotFound(req,res);

});

function responceStatic(req,res){
    const filename = `${__dirname}/public${req.url.split('static')[1]}`;
    fs.createReadServer(filename)
    .on("Error",()=> responceNotFound(req,res))
    .pipe(res);


}
function responceText(req,res){
    res.setHeader("Content-Type","text/plain");
    res.end("js Bootcamp Node Js");

}

function responceJson(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify(product));

}
server.listen(port);
console.log(`server listening on port ${port}`)

function responceNotFound(req,res){
    res.writeHead(404,{"content-type":"application/json"});
    res.end("page Not found");
}
