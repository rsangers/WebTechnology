var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

//Use the game constructor of file 'mygame'
var Game=require("./mygame");

app.use(express.static(__dirname + "/public"));

//Request activated when someone clicks one of the starting buttons of the splash screen
app.get("/play", function(req, res){
    res.sendFile("game.html", { root: "./public" });
});
app.get("/", function(req, res){
    res.sendFile("splash.html", { root: "./public" });
});

//Create the server
var server=http.createServer(app).listen(port);
const wss=new websocket.Server({server});

var websockets={}; //Array containing the websockets

//Start up the first game
var gameID=1;
var thisGame=new Game(gameID);

//Every websocket gets an ID number
var connectionID = 0; //each websocket receives a unique ID

wss.on("connection",function(ws){
  //Upon connection, the player is added to the newest game
  let con = ws;
  con.id = connectionID++;
  let playerType = thisGame.addPlayer(con);
  websockets[con.id] = thisGame;

  console.log("Player "+con.id+" placed in game "+thisGame.id+" as "+playerType);

  //If a game is full, start the game for the two players and create a new empty game object
  if (thisGame.hasTwoConnectedPlayers()) {
    websockets[con.id].playerA.send(JSON.stringify("startgame"));
    websockets[con.id].playerB.send(JSON.stringify("startgame"));
    websockets[con.id].playerA.send(JSON.stringify("newturn")); //Player A starts the game

    gameID++;
    thisGame = new Game(gameID);
  }
  else{
    con.send(JSON.stringify("wait")); //If there is only one player in the game, send the waiting screen
  }

  con.on("message", function incoming(message) {
    let messageIn = JSON.parse(message);

    //Here the server should forward the new gamestate to the other player
    if(messageIn.type=="newgame"){
      console.log(messageIn.data);
    }
    else{
      console.log(messageIn.type);
    }
  });

  con.on("close", function(code) {
    console.log(con.id + " disconnected ...");
    //Implement code on what to do upon disconnection

    })
});
