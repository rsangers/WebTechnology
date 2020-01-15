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
                top: 15+j*15,
                left: 8
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


    for(let i=0; i<2;i=i+1)
        var $newPlayer = $("<div>");
        $newPlayer.id="p"+i;
        $newPlayer.addClass("player");
        $newPlayer.css({
            left: 245+(i*200),
            top: 500
        })
        $(".gamearea").append($newPlayer);

    }

    
    

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