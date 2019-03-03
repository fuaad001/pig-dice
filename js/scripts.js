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

Player.prototype.tally = function(){
  this.rolls = [];
  this.tallys.push(parseInt(this.score));
  var sum = 0;
  this.tallys.forEach(function(tally){
    sum += tally;
  })
  var score1 = 0;
  score1 = score1 + sum;
  this.finalScore = [];
  this.finalScore.push(score1);
};

Player.prototype.finish = function(){
  var check = this.score + this.finalScore;
  if(check >= 100){
    $(document).ready(function(){
      $(".celebration").fadeIn();
      $(".player1-board").slideUp();
      $(".player2-board").slideUp();
      $(".roll-one1").hide();
      $(".roll-one2").hide();
    });
    document.getElementById("celebration").src = "images/celebration.gif";
    document.getElementById("winner").innerHTML = this.name;
  };
};

var play1 = function(){
  var dice = [1,2,3,4,5,6];

  var diceRoll = dice[Math.floor(Math.random() * dice.length)];

  document.getElementById("turn-count1").innerHTML = diceRoll;

  if(diceRoll === 1){
    document.getElementById("dice1").src = "images/dice1.png";
    newPlayer1.lose();
    pass1();
    $(document).ready(function(){
      $(".roll-one1").show();
      $(".roll-one2").hide();
    });
  }
  else{
    newPlayer1.rolls.push(diceRoll);
    newPlayer1.win();
    newPlayer1.finish();
    if(diceRoll === 2){
      document.getElementById("dice1").src = "images/dice2.png";
    }
    else if(diceRoll === 3){
      document.getElementById("dice1").src = "images/dice3.svg";
    }
    else if(diceRoll === 4){
      document.getElementById("dice1").src = "images/dice4.png";
    }
    else if(diceRoll === 5){
      document.getElementById("dice1").src = "images/dice5.png";
    }
    else if(diceRoll === 6){
      document.getElementById("dice1").src = "images/dice6.png";
    }
  };
};
