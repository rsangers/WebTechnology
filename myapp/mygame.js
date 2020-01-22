var Game=function(gameID){
    this.playerA=null;
    this.playerB=null;
    this.id=gameID;
    this.state="0 joined";
    this.changeState=function(state){
        this.state=state;
    };
    this.hasTwoConnectedPlayers = function() {
        return this.state == "2 joined";
    };
    this.addPlayer=function(player){
        if(this.state!="0 joined"&&this.state!="1 joined"){
            return new Error(
                "Already 2 players have joined this game!"
            );
        }
        if(this.state=="0 joined"){
            this.changeState("1 joined");
            this.playerA=player;
            return "A";
        }
        else{
            this.changeState("2 joined");
            this.playerB=player;
            return "B";
        }
    };
};

/*
Game.prototype.changeState=function(state){
    this.state=state;
};
Game.prototype.hasTwoConnectedPlayers = function() {
    return this.state == "2 joined";
};
Game.prototype.addPlayer=function(player){
    if(this.state!="0 joined"&&this.state!="1 joined"){
        return new Error(
            "Already 2 players have joined this game!"
        );
    }
    if(this.state=="0 joined"){
        this.changeState("1 joined");
        this.playerA=player;
        return "A";
    }
    else{
        this.changeState("2 joined");
        this.playerB=player;
        return "B";
    }
};
*/
module.exports = Game;


