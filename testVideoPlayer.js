Parse.initialize("mqzGZgOEytP3cZP5PELOrGi6wOrohw6jyZo3iRJc", "z8HMJaDGWSwxjJQQwGSRGS7N1hbRmdjw1w5SmegQ");

/*
 * Chromeless player has no controls.
 */

// Allows us to animate backgroundColor (copied from stackOverflow);

  (function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.css(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);
// End

// Set number of dummy comments
  var commentNum = 6;
  var commentNumArray = ["ph"];
  var commentArray = ["ph"];
  for (var i = 1; i <= commentNum; i++){
    commentNumArray.push(i);
  }
// End

// Set the video width (in pixels) below

var videoWidth = 1080;
var aspectRatio = 1.6271186440677966101694915254237;
/*$(document).ready(function(){
  if ($("body").width() - $("#commentsContainer").width() <= videoWidth){
    videoWidth = $("body").width() - parseInt($("#commentsContainer").css("width"));
    console.log($("body").width());
    console.log(videoWidth)
  }
})*/
 
var videoHeight = videoWidth/aspectRatio;
// Update a particular HTML element with a new value;
function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
  alert("An error occured of type:" + errorCode);
}

// This function is called when the player changes state
function onPlayerStateChange(newState) {
  updateHTML("playerState", newState);
}

// Display information about the current state of the player
function updatePlayerInfo() {
  // Also check that at least one function exists since when IE unloads the
  // page, it will destroy the SWF before clearing the interval.
  if(ytplayer && ytplayer.getDuration) {
    updateHTML("videoDuration", ytplayer.getDuration());
    updateHTML("videoCurrentTime", ytplayer.getCurrentTime());
    updateHTML("bytesTotal", ytplayer.getVideoBytesTotal());
    updateHTML("startBytes", ytplayer.getVideoStartBytes());
    updateHTML("bytesLoaded", ytplayer.getVideoBytesLoaded());
    updateHTML("volume", ytplayer.getVolume());
  }
}

function updateProgressBar(){
  var percentage = 100*ytplayer.getCurrentTime()/ytplayer.getDuration();
  $("#progressbarVal").width($("#progressbar").width()/100*percentage);
  // $("#progressbar").progressbar("option","value", percentage);
}
function updateTime(){
  var time = ytplayer.getCurrentTime();
  var minutes = Math.floor(time/60);
  var seconds = Math.floor(time % 60);
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  $("#minutes").html(minutes);
  $("#seconds").html(seconds);

}
// Allow the user to set the volume from 0-100
function setVideoVolume() {
  var volume = parseInt(document.getElementById("volumeSetting").value);
  if(isNaN(volume) || volume < 0 || volume > 100) {
    alert("Please enter a valid volume between 0 and 100.");
  }
  else if(ytplayer){
    ytplayer.setVolume(volume);
  }
}

function playVideo() {
  if (ytplayer) {
    ytplayer.playVideo();
  }
}

function pauseVideo() {
  if (ytplayer) {
    ytplayer.pauseVideo();
  }
}

function playORpause(){
  if ($(".playORpause").attr("src") == "images/PlayIcon.png"){
    console.log("play");
    $(".playORpause").attr("src", "images/PauseIcon.png").attr("class", "playORpause controlImg");
    playVideo();
  }else if($(".playORpause").attr("src") == "images/PauseIcon.png"){
    console.log("pause");
    $(".playORpause").attr("src", "images/PlayIcon.png").attr("class", "playORpause controlImg");
    pauseVideo();
  }
}

function muteVideo() {
  if(ytplayer) {
    ytplayer.mute();
  }
}

function unMuteVideo() {
  if(ytplayer) {
    ytplayer.unMute();
  }
}

function muteORunmute(){
  if ($(".muteORunmute").attr("src") == "images/VolumeIcon.png"){
    $(".muteORunmute").attr("src", "images/MuteIcon.png").attr("class", "muteORunmute controlImg");
    muteVideo();
  }else{
    $(".muteORunmute").attr("src", "images/VolumeIcon.png").attr("class", "muteORunmute controlImg");
    unMuteVideo();
  }
}

// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("ytPlayer");

  // Instantly starts loading the video
  window.setTimeout(function() {
    ytplayer.playVideo();
      ytplayer.pauseVideo();
  }, 0);
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  setInterval(updateTime, 1000);
  setInterval(updateProgressBar, 1000);
  setInterval(updatePlayerInfo, 250);
  updatePlayerInfo();
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
  //Load an initial video into the player
  ytplayer.cueVideoById("gAYL5H46QnQ");
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                     "version=3&enablejsapi=1&playerapiid=player1", 
                     "videoDiv", String(videoWidth), String(videoHeight), "9", null, null, params, atts);
}
function _run() {
  loadPlayer();
  /*$("#progressbar").progressbar();
  $("#progressbar").progressbar("option", "value", 0);*/
}
google.setOnLoadCallback(_run);

// Progress Bar
  function progressbar_click(mouseX){
    var percentage = mouseX/$("#progressbar").width();
    console.log($("#progressbar").width())
    $("#progressbarVal").width($("#progressbar").width()/100*percentage); //updates progressbar location
    var currentSec = percentage*ytplayer.getDuration();
    ytplayer.seekTo(currentSec, true); //updates ytplayer location in video
    updateTime();
  }

  jQuery(document).ready(function(){
    /* $(document).mousemove(function(e){
        $('#status').html(e.pageX +', '+ e.pageY);
     }); */

     //update progressbar if clicked
     $("#progressbar").click(function(e){
      var parentOffset = $(this).parent().offset(); 
      //or $(this).offset(); if you really just want the current element's offset
      var relX = e.pageX - parentOffset.left;
      var relY = e.pageY - parentOffset.top;
      $('#offset').html(relX + ', ' + relY);
      progressbar_click(relX);
    });
    // setupAccordion();
    // addTicks();
  })
// End

// Tick Bar
  function createTick(commentType, commentNum, timeInSecs){
    var percentage = timeInSecs/ytplayer.getDuration();
    var tickHeight = $("#tickBar").height();
    var tickBarWidth = $("#tickBar").width();
    var tickPosition = percentage * tickBarWidth;
    if (commentType == "C"){
      var newTick = $("<div style = 'position: relative'><div id = 'tick_" + commentNum + "' class = 'tickMark' style = 'position: absolute; margin-left: " + tickPosition + "px; width: 1px; height: " + tickHeight + "px; background-color: #26af00'></div></div>");
    }else if (commentType == "Q"){
      var newTick = $("<div style = 'position: relative'><div id = 'tick_" + commentNum + "' class = 'tickMark' style = 'position: absolute; margin-left: " + tickPosition + "px; width: 1px; height: " + tickHeight + "px; background-color: #007BF8'></div></div>");
    }else if (commentType == "IN"){
      var newTick = $("<div style = 'position: relative'><div id = 'tick_" + commentNum + "' class = 'tickMark' style = 'position: absolute; margin-left: " + tickPosition + "px; width: 1px; height: " + tickHeight + "px; background-color: #ffa100'></div></div>");
    }
    
    $("#tickBar").append(newTick);
    $(".tickMark").on("mouseenter", function(){
      $(this).css("width", 7).css("margin-left", parseFloat($(this).css("margin-left")) - 3);
      // $(this).animate({"width": 7, "margin-left": parseFloat($(this).css("margin-left")) - 3}, 500);
      var thisID = JSON.stringify($(this).attr("id"));
      console.log(thisID);
      for (var i = 0; i <= thisID.length - 1; i++){
        if (thisID[i] == "_"){
          var numStart = i + 1;          
        }
      }
      var tickNum = parseInt(thisID.slice(numStart, thisID.length));
      console.log(tickNum);

      for (var i = 1; i <= commentArray.length - 1; i++){
        console.log(commentArray[i].commentNum);
        console.log(tickNum);
        if (commentArray[i].commentNum == tickNum){
          var tickContent = commentArray[i].commentText;
          var tickTitle = commentArray[i].userName;
          console.log(tickContent);
          $(".tickMark").popover({trigger: "hover", placement: "bottom",title: tickTitle, content: tickContent});
          $(this).popover("show");
        }else{
          console.log("tickContent not found");
        }
      }
      
    })
    $(".tickMark").on("mouseleave", function(){
      // $(this).animate({"width": 1, "margin-left": parseFloat($(this).css("margin-left")) + 3}, 500);
      $(this).css("width", 1).css("margin-left", parseFloat($(this).css("margin-left")) + 3);
      $(this).popover("hide");
    })

  }
// End

// Comments
  

// End

$(document).ready(function(){
  /*var TestObject = Parse.Object.extend("TestObject");
  var testObject = new TestObject();
  testObject.save({foo: "bar"}, {
    success: function(object) {
      alert("yay! it worked");
    }
  })*/
  
  
  // Initializes Test Comments
    for (var i = 1; i <= commentNumArray.length - 1; i++){
      var testComment = 
      '<div id = "comment_' + i + '" class = "newComment">'
        + '<span style = "position: relative"><div class = "userNameAndTime"><span id = "username">Dsan10s</span><span id = "userTime" style = "float: right;">00:00</span></div></span>'
        + "<img src = 'images/QuestionIcon.png' class = 'icon' style = 'margin-left: 5px; margin-right: 4px;'/>"
        + "<img src = 'images/GoToTimeIcon.png' class = 'icon goToTime' style = 'margin-left: 5px; margin-right: 4px;'/>"
        + '<div class = "icon" style = "margin-left: 5px; margin-right: 4px;"></div>'
        + '<div class = "icon" style = "margin-left: 5px; margin-right: 4px;"></div>'
        + '<textarea readonly class = "commentText" style = "cursor: default">Here you will see a bunch of text.  Sup.  If this formatted correctly then huzzah.</textarea>'
      + "</div>";
      $(".comments").append(testComment);
      var testCommentObj = {commentNum: 0, commentType: "C", upvotes: 0, commentText: "", time: 0, userName: "Dsan10s"};
      testCommentObj.commentNum = i;
      testCommentObj.commentText = "Here you will see a bunch of text.  Sup.  If this formatted correctly then huzzah.";
      commentArray.push(testCommentObj);
    }
  // End
  /*<div id = "comment_1" class = "newComment">
    <span style = "position: relative"><div class = "userNameAndTime"><span id = "username">Dsan10s</span><span id = "userTime" style = "float: right;">00:00</span></div></span>

    <img src = 'images/QuestionIcon.png' class = 'icon' style = 'margin-left: 5px; margin-right: 4px;'/>
    <img src = 'images/GoToTimeIcon.png' class = 'icon goToTime' style = 'margin-left: 5px; margin-right: 4px;'/>
    <div class = "icon"></div>
    <div class = "icon"></div>
    <textarea readonly class = "commentText" style = "cursor: default">Here you will see a bunch of text.  Sup.  If this formatted correctly then huzzah.</textarea>
    
  </div>*/

  var tickTimes = [];
  

  function resizePlayer(width, height){
    var playerObj = document.getElementById("ytPlayer");
    console.log(playerObj);
    console.log(playerObj.height);
    playerObj.height = height;
    playerObj.width = width;
  }

  // Setting up sizes of elements with respect to other elements and window size
  
    $("#videoControls").width(videoWidth - (parseInt($("#videoControls").css("padding")) * 2));
    $("#tickContainer").width(videoWidth - (parseInt($("#tickContainer").css("padding")) * 2));
    var videoControlsPadding = parseInt($("#videoControls").css("padding")) * 2;
    var videoControlsWidth = $("#videoControls").width();
    var playBtnWidth = parseInt($(".playORpauseBtn").css("width"));
    var volBtnWidth = parseInt($(".muteORunmuteBtn").css("width"));
    $(".progressbar_container").width(videoControlsWidth - playBtnWidth - volBtnWidth - videoControlsPadding - 4);
    var progressbar_containerWidth = $(".progressbar_container").width();
    var timeWidth = $("#videoTimeDisplay").width();
    $("#progressbar").width(progressbar_containerWidth - timeWidth - 25);
    $("#tickBar").width(progressbar_containerWidth - timeWidth - 25);

    

    
    $("#videoContainer").width(videoWidth);

    $("#commentsContainer").css("margin-top", -(videoControlsPadding + videoHeight + $("#videoControls").height()))
    $("#commentsContainer").height(videoHeight + $("#videoControls").height())
    
    // $(".commentsDisplay").css("height", $("#commentsContainer").height() - $("#commentsLegend").height() - $("#commentButtons").height() - 45);

    $(window).resize(function(){
      if ($("body").width() - $("#commentsContainer").width() <= videoWidth){
        var newWidth = $("body").width() - $("#commentsContainer").width();
        var newHeight = newWidth/aspectRatio;
        resizePlayer(newWidth, newHeight);
        $("#videoControls").width(newWidth - (parseInt($("#videoControls").css("padding")) * 2));
        $("#tickContainer").width(videoWidth - (parseInt($("#tickContainer").css("padding")) * 2));
        var videoControlsWidth = $("#videoControls").width();
        $(".progressbar_container").width(videoControlsWidth - playBtnWidth - volBtnWidth - videoControlsPadding - 4);
        var progressbar_containerWidth = $(".progressbar_container").width();
        $("#progressbar").width(progressbar_containerWidth - timeWidth - 25);
        $("#tickBar").width(progressbar_containerWidth - timeWidth - 25);
        $("#commentsContainer").css("margin-top", -(videoControlsPadding + newHeight + $("#videoControls").height()))
      
      }
    });
    
  // End

  // Stylistic Hover Functions
    $(".previousComments").on("mouseenter", function(){
      $(this).animate({backgroundColor: "rgba(255, 255, 255, 0.8)"}, 200);
      $(this).css("cursor", "pointer");
    })
    $(".previousComments").on("mouseleave", function(){
      $(this).animate({backgroundColor: "rgba(255, 255, 255, 0.4)"}, 200);
    })

     $(".futureComments").on("mouseenter", function(){
      $(this).animate({backgroundColor: "rgba(255, 255, 255, 0.8)"}, 200);
      $(this).css("cursor", "pointer");
    })
    $(".futureComments").on("mouseleave", function(){
      $(this).animate({backgroundColor: "rgba(255, 255, 255, 0.4)"}, 200);
    })
    
  // End

  // Creating a new Comment

    var commentsHeight = parseInt($(".comments").css("height"));
    $("#newCommentBtn").on("click", function(){
      
      var currentTimeString = $("#minutes").html() + ":" + $("#seconds").html()
      $("#commentMinutesInput").val($("#minutes").html());
      $("#commentSecondsInput").val($("#seconds").html());

      console.log("click");
      $("#newCommentBtn").html("Retract Comment");
      
      
      $(".newCommentInput").css("display", "");
      $(".comments").height(commentsHeight - $(".newCommentInput").height());
      $("#cmtTypeBtn").on("click", function(){
        
        $("#cTypeQ").on("click", function(){
          $("#cmtTypeBtn").html("Question");
          // commentObj.commentType = "Q";
          // console.log(commentObj);
        });
        $("#cTypeC").on("click", function(){
          $("#cmtTypeBtn").html("Comment");
          // commentObj.commentType = "C";
          // console.log(commentObj);
        });
        $("#cTypeIN").on("click", function(){
          $("#cmtTypeBtn").html("Instructor Note");
          // commentObj.commentType = "IN";
          // console.log(commentObj);
        });
      });
      
      // $("#newCommentBtn").attr("id", "retractCommentBtn");
    });
  // End

  // Posting a new comment
    $("#cmtPostBtn").on("click", function(){
    // Initialize the new comment html 
      var newComment = $("<div id = 'newComment'></div>");
      var relativeSpan = $("<span style = 'position: relative'></span>")
      var userNameAndTime = $("<div class = 'userNameAndTime'></div>");
      var username = $("<span id = 'username'></span>");
      var userTime = $("<span id = 'userTime' style = 'float: right'></span>")
      var icon1 = $("<img src = 'images/CommentIcon.png' class = 'icon' style = 'margin-left: 5px; margin-right: 4px;'/>");
      var icon2 = $("<img src = 'images/GoToTimeIcon.png' class = 'icon goToTime' style = 'margin-left: 5px; margin-right: 4px;'/>");
      var icon3 = $("<div class = 'icon' style = 'margin-left: 5px; margin-right: 4px;'></div>");
      var icon4 = $("<div class = 'icon' style = 'margin-left: 5px; margin-right: 4px;'></div>");
      var commentText = $("<textarea readonly class = 'commentText' style = 'cursor: default'></textarea>");
    // End
      var currentTime = (parseInt($("#minutes").html()) * 60) + parseInt($("#seconds").html());
      var commentObj = {commentNum: 0, commentType: "", upvotes: 0, commentText: "", time: currentTime, userName: "User1"};
      var commentString = $("#minutes").html() + ":" + $("#seconds").html()
      //var NewCommentObj = Parse.Object.extend("NewCommentObj");
      //var newCommentObj = new NewCommentObj();

      commentObj.commentNum = commentNumArray[commentNumArray.length - 1] + 1;
      //newCommentObj.save("commentNum", commentNumArray[commentNumArray.length - 1] + 1);

      commentNumArray.push(commentObj.commentNum);
      commentObj.commentType = "C";
      if ($("#cmtTypeBtn").html() == "Question"){
        commentObj.commentType = "Q";
       // newCommentObj.save("commentType", "Q");
        $(icon1).attr("src", "images/QuestionIcon.png")
      }
      else if ($("#cmtTypeBtn").html() == "Comment"){
        commentObj.commentType = "C";
        //newCommentObj.save("commentType", "C");
      }
      else if ($("#cmtTypeBtn").html() == "Instructor Note"){
        commentObj.commentType = "IN";
        //newCommentObj.save("commentType", "IN");
        $(icon1).attr("src", "images/InstructorNoteIcon.png");
      }
      commentObj.commentText = $("#cmtTextInput").val();
      commentObj.time = $("#commentTimeInput").val();

      console.log(commentObj);
      commentArray.push(commentObj);

      $(relativeSpan).append(userNameAndTime)
      $("commentText").html("<p>" + commentObj.commentText + "</p>");
      $(".comments").append(newComment);
      $(username).append(commentObj.userName);
      $(userTime).append(commentString);

    // Creates the Ticks
      createTick(commentObj.commentType, commentObj.commentNum, currentTime);

      $(newComment).attr("id", "comment_" + commentObj.commentNum);
      console.log("#comment_" + commentObj.commentNum + " .userNameAndTime");
      $(userNameAndTime).append(username, userTime);
      console.log(commentObj)
      $(newComment).append(relativeSpan, icon1, icon2, icon3, icon4, commentText);
      
      $(newComment).attr("class", "newComment");
      $(commentText).html(commentObj.commentText);
      


      $(".comments").height(490);
      
      
      $("#newCommentBtn").html("New Comment");
      $(".newCommentInput").css("display", "none");
      $("#cmtTextInput").val("");
    })
  // End

    /*console.log("Retract");
    $("#retractCommentBtn").on("click", function(){
      $("#retractCommentBtn").attr("id", "newCommentBtn")
      $("#newCommentBtn").html("New Comment");
      $(".newCommentInput").css("display", "none");
    }) */
  // End

  // Gives Clock Icons functionality (goes to point in video where comment was created)
    $(".goToTime").on("click", function(){
      var thisID = JSON.stringify($(this).parent("span").parent("div").attr("id"));
      var thisNum = parseInt(thisID.slice(8, thisID.length));
      for (var i = 1; i <= commentArray.length; i++){
        if (commentArray[i].commentNum == thisNum){

        }
      }
    })
  // End
});
