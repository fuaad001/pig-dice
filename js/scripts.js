//Global variables
var newPlayer1 = "";
var newPlayer2 = "";

//User Interface logic
$(document).ready(function(){
  $(".player-one").submit(function(event){
    event.preventDefault();
    var name = $(".player1-name").val();
    newPlayer1 = new Player(name);
    $(".login-player-one").slideUp();
    $(".player1-board").fadeIn();
    $("#name1").text(newPlayer1.name);
    $("#turn-count1").text(0);
    $("#total-score1").text(0);
    $("#total-points1").text(0);
  });
  $(".player-two").submit(function(event){
    event.preventDefault();
    var name = $(".player2-name").val();
    newPlayer2 = new Player(name);
    $(".pig-image").slideUp();
    $(".login-player-two").slideUp();
    $(".player2-board").fadeIn();
    $("#name2").text(newPlayer2.name);
    $("#turn-count2").text(0);
    $("#total-score2").text(0);
    $("#total-points2").text(0);
  });
  $("#roll-dice1").click(function(){
    play1();
    $("#total-score1").text(newPlayer1.score);
  });
  $("#pass1").click(function(){
    newPlayer1.tally();
    $("#total-points1").text(newPlayer1.finalScore);
    pass1();
  });
  $("#roll-dice2").click(function(){
    play2();
    $("#total-score2").text(newPlayer2.score);
  });
  $("#pass2").click(function(){
    newPlayer2.tally();
    $("#total-points2").text(newPlayer2.finalScore);
    pass2();
  });
});

var pass1 = function(){
  $(document).ready(function(){
    $(".player1-board").addClass("inactive");
    $(".player1-board").removeClass("active");
    $(".player2-board").addClass("active");
    $(".player2-board").removeClass("inactive");
    $(".submit1").attr("disabled", true);
    $(".submit2").attr("disabled", false);
    $(".pass1").attr("disabled", true);
    $(".pass2").attr("disabled", false);
    $(".roll-one2").hide();
  });
};

var pass2 = function(){
  $(document).ready(function(){
    $(".player1-board").addClass("active");
    $(".player1-board").removeClass("inactive");
    $(".player2-board").addClass("inactive");
    $(".player2-board").removeClass("active");
    $(".submit2").attr("disabled", true);
    $(".submit1").attr("disabled", false);
    $(".pass2").attr("disabled", true);
    $(".pass1").attr("disabled", false);
    $(".roll-one1").hide();
  });
};




//Bussines logic
var Player = function(name){
  this.name = name;
  this.score = [];
  this.rolls = [];
  this.tallys = [];
  this.finalScore = [];
};

Player.prototype.win = function(){
  var total = 0;
  this.rolls.forEach(function(roll){
    total += roll;
  })
  var score = 0;
  score = score + total;
  this.score = [];
  this.score.push(score);
};

Player.prototype.lose = function(){
  this.rolls = [];
};
