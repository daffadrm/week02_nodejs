// load module http= core module
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
    res.setHeader("Content-type", "application/json")

});

server.listen(port);
console.log(`server listening on port ${port}`)

