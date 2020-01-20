var express = require("express");
var http = require("http");
var websocket = require("ws");

//var indexRouter = require("./routes/index");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
//app.get("/play", indexRouter);
app.get("/play", function(req, res){
    res.sendFile("game.html", { root: "./public" });
});
app.get("/", function(req, res){
    res.sendFile("splash.html", { root: "./public" });
});
http.createServer(app).listen(port);