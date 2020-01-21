var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

var Game=require("./mygame");

app.use("/", function(req, res) {
    res.sendFile("public/splash.html", {root: "./"});
});
app.use(express.static(__dirname + "/public"));

app.get("/play", function(req, res){
    res.sendFile("game.html", { root: "./public" });
});
app.get("/", function(req, res){
    res.sendFile("splash.html", { root: "./public" });
});

var server=http.createServer(app);
const wss=new websocket.Server({server});

var websockets={}; //property: websocket, value: game

/*
 * regularly clean up the websockets object
 */
setInterval(function() {
    for (let i in websockets) {
      if (Object.prototype.hasOwnProperty.call(websockets,i)) {
        let gameObj = websockets[i];
        //if the gameObj has a final status, the game is complete/aborted
        if (gameObj.finalStatus != null) {
          delete websockets[i];
        }
      }
    }
  }, 50000);

  var thisGame=new Game(1);
  var connectionID = 0; //each websocket receives a unique ID

wss.on("connection",function(ws){
    /*
   * two-player game: every two players are added to the same game
   */
  
  let con = ws;
  con.id = connectionID++;
  let playerType = thisGame.addPlayer(con);
  websockets[con.id] = thisGame;

  console.log("Player "+con.id+" placed in game "+thisGame.id+" as "+playerType);

  /*
   * once we have two players, there is no way back;
   * a new game object is created;
   * if a player now leaves, the game is aborted (player is not preplaced)
   */
  if (thisGame.hasTwoConnectedPlayers()) {
    thisGame = new Game(2);
  }

  /*
   * message coming in from a player:
   *  1. determine the game object
   *  2. determine the opposing player OP
   *  3. send the message to OP
   */
  con.on("message", function incoming(message) {
    let oMsg = JSON.parse(message);

    let gameObj = websockets[con.id];

    //Here the server should forward the new gamestate to the other player
  });

  con.on("close", function(code) {
    /*
     * code 1001 means almost always closing initiated by the client;
     * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
     */
    console.log(con.id + " disconnected ...");

    if (code == "1001") {
      /*
       * if possible, abort the game; if not, the game is already completed
       */
      let gameObj = websockets[con.id];
    }
    })
});

http.createServer(app).listen(port);