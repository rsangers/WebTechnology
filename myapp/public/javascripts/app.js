var main = function () {
    "use strict";

    //Create column and tile elements
    for(let i=0;i<7;i++){
        var $newColumn=$("<div>");
        $newColumn.id="c"+i;
        $newColumn.addClass("column");
        for(let j=0;j<6;j++){
            var $newTile=$("<div>");
            $newTile.id="t"+i*6+j;
            console.log($('#'+$newTile.id));
            $newTile.css({
                top: 10+j*10,
                left: 7
            })
            $newTile.addClass("tile");
            $newColumn.css({
                left:0
            })
            $newColumn.append($newTile);
        }
        $(".board").append($newColumn);
    }
    $(".gamearea").append($(".board"));

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
        if (i<1){$newPlayerTile.css({background: '#0059b3'})}
        $newPlayer.append($newPlayerTile);

        //Counter


        //Name box
        var $newName = $("<p>");
        $newName.addClass("name");
        $newName.text("name "+(i+1));
        $newPlayer.append($newName);

        $(".gamearea").append($newPlayer);
        
    };


    
    

    //Add column interactivity
    $(".column").click(function() {
        $(this).find(".tile","background-color:gray").last().css("background-color", "red");
        console.log($(this).find(".tile").first().attr("background-color"));
    });

    /*
    $(".comment-input button").on("click", function (event) {
      var $new_comment = $("<p>"),
      comment_text = $(".comment-input input").val();
      $new_comment.text(comment_text);
      $(".comments").append($new_comment);
    });
    */
  };
  $(document).ready(main);