//Global variable indicating whose turn it is (either 1 or 2)
var turn=1;

var main = function () {
    "use strict";
   
    //Give attribute to each column keeping track of lowest free tile, and position the elements
    for(let i=1;i<=7;i++){
       $("#c"+i).attr("freeTile",6);
       $("#c"+i).css("left",0);
       for(let j=1;j<7;j++){
          $("#t"+(j+(i-1)*6)).css({
            top: 10+(j-1)*10,
            left: 7
          });
       }
    }

    //Add player segments
    for(let i=0; i<2;i=i+1){
      var $newPlayer = $("<div>");
      $newPlayer.id="p"+i;
      $newPlayer.addClass("player");
      $newPlayer.css({
          left: 205+(i*280),
      });

      //Circle
      var $newPlayerTile = $("<div>");
      $newPlayerTile.id="pt"+i;
      $newPlayerTile.addClass("playertile");
      if (i<1){$newPlayerTile.css({background: 'rgb(0,89,179)'})}
      $newPlayer.append($newPlayerTile);

      //Name box
      var $newName = $("<p>");
      $newName.addClass("name");
      $newName.text("name "+(i+1));
      $newPlayer.append($newName);

      $(".gamearea").append($newPlayer);
      
  };

    //Counter
    var $newCounter = $("<p>");
    $newCounter.addClass("counter");
    $newCounter.text("10");
    $(".gamearea").append($newCounter);

    //Add column interactivity
    $(".column").click(function() {
        var freeTile=$(this).attr("freeTile");
        $(this).find(".tile:nth-child("+freeTile+")").css("opacity", "100%");
        
        //Check if move is valid
        if(freeTile>0){
          if(turn==1){
            $(this).find(".tile:nth-child("+freeTile+")").css("background-color", "rgb(0,89,179)");
            turn=2;
          }
          else{
            $(this).find(".tile:nth-child("+freeTile+")").css("background-color", "rgb(0,51,102)");
            turn=1;
          }
          $(this).attr("freeTile",freeTile-1);

          //Check if someone has won yet
          if(gameOver($(this).attr("id").replace('c',''),freeTile)){
            showGameOver();
          }
        }
    });

    $(".column").hover(function() {
      
      var freeTile=$(this).attr("freeTile");
      $(this).find(".tile:nth-child("+freeTile+")").css("opacity", "50%");
    },
    function(){
      var freeTile=$(this).attr("freeTile");
      $(this).find(".tile:nth-child("+freeTile+")").css("opacity", "100%");
    });
  }

  $(document).ready(main);

  function gameOver(myColumn,freeTile){
    var pColor;
    if(turn==2){
      pColor="rgb(0, 89, 179)";
    }
    else{
      pColor="rgb(0, 51, 102)";
    }
    
    var inARow=1;
    let thisColumn;
    let thisHeight;

    //Check left
    thisColumn=myColumn;
    thisColumn--;
    thisHeight=freeTile;
    while(thisColumn>0 && $("#c"+(thisColumn)).find(".tile:nth-child("+thisHeight+")").css("background-color")==pColor){
      inARow++;
      thisColumn--;
    }
    //Check right
    thisColumn=myColumn;
    thisColumn++;
    thisHeight=freeTile;
    while(thisColumn<=7 && $("#c"+(thisColumn)).find(".tile:nth-child("+thisHeight+")").css("background-color")==pColor){
      inARow++;
      thisColumn++;
    }
    if(inARow>=4){
      return true;
    }
    //Reset
    inARow=1;

    //Check up
    thisColumn=myColumn;
    thisHeight=freeTile;
    thisHeight--;
    while(thisHeight>0 && $("#c"+(thisColumn)).find(".tile:nth-child("+thisHeight+")").css("background-color")==pColor){
      inARow++;
      thisHeight--;
    }
    //Check down
    thisColumn=myColumn;
    thisHeight=freeTile;
    thisHeight++;
    while(thisHeight<=7 && $("#c"+(thisColumn)).find(".tile:nth-child("+thisHeight+")").css("background-color")==pColor){
      inARow++;
      thisHeight++;
    }
    if(inARow>=4){
      return true;
    }

    //Reset
    inARow=1;

    //Check upperleft
    thisColumn=myColumn;
    thisColumn--;
    thisHeight=freeTile;
    thisHeight--;
    while(thisColumn>0 && thisHeight>0 && $("#c"+(thisColumn)).find(".tile:nth-child("+thisHeight+")").css("background-color")==pColor){
      inARow++;
      thisColumn--;
      thisHeight--;
    }
    //Check downright
    thisColumn=myColumn;
    thisColumn++;
    thisHeight=freeTile;
    thisHeight++;
    while(thisColumn<=7 && thisHeight<=6 && $("#c"+(thisColumn)).find(".tile:nth-child("+thisHeight+")").css("background-color")==pColor){
      inARow++;
      thisColumn++;
      thisHeight++;
    }
    if(inARow>=4){
      return true;
    }

    //Reset
    inARow=1;

    //Check upperright
    thisColumn=myColumn;
    thisColumn++;
    thisHeight=freeTile;
    thisHeight--;
    while(thisColumn<=7 && thisHeight>0 && $("#c"+(thisColumn)).find(".tile:nth-child("+thisHeight+")").css("background-color")==pColor){
      inARow++;
      thisColumn++;
      thisHeight--;
    }
    //Check downleft
    thisColumn=myColumn;
    thisColumn--;
    thisHeight=freeTile;
    thisHeight++;
    while(thisColumn>0 && thisHeight<=6 && $("#c"+(thisColumn)).find(".tile:nth-child("+thisHeight+")").css("background-color")==pColor){
      inARow++;
      thisColumn--;
      thisHeight++;
    }
    if(inARow>=4){
      return true;
    }

  };

  function showGameOver(){
    $(".board").css("opacity","50%");
    
    var $popUp = $("<div>");
    $popUp.addClass("popUp");

    $popUp.text("Game Over");
    $(".gamearea").append($popUp);
  }