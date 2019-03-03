//Global variables
var newPlayer1 = "";
var newPlayer2 = "";





//User Interface logic
//Submission of Player One Details & Navigating to playing board
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

//Submission of Player Two Details & Navigating to playing board
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

//Player One rolling the dice
  $("#roll-dice1").click(function(){
    play1();
    $("#total-score1").text(newPlayer1.score);
  });

//Player One holding and passing
  $("#pass1").click(function(){
    newPlayer1.tally();
    $("#total-points1").text(newPlayer1.finalScore);
    pass1();
  });

//Player Two rolling the dice
  $("#roll-dice2").click(function(){
    play2();
    $("#total-score2").text(newPlayer2.score);
  });

//Player Two holding and passing
  $("#pass2").click(function(){
    newPlayer2.tally();
    $("#total-points2").text(newPlayer2.finalScore);
    pass2();
  });
});

//Function of Player One pass & hold button
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
    $("#turn-count2").text(0);
    $("#total-score2").text(0);
  });
};

//Function of Player Two pass & hold button
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
    $("#turn-count1").text(0);
    $("#total-score1").text(0);
  });
};





//Bussines logic
//New Player Constructor
var Player = function(name){
  this.name = name;
  this.score = [];
  this.rolls = [];
  this.tallys = [];
  this.finalScore = [];
};

//Function to run if dice roll is above one to add all individual roll scores
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

//Function to run if dice roll is one to delete round score
Player.prototype.lose = function(){
  this.rolls = [];
};

//Function adding each round's score to get total score
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
  this.score = [];
  this.score.push(0);
};

//Function to test if a player has reached 100 points
Player.prototype.finish = function(){
  var check = parseInt(this.score) + parseInt(this.finalScore);
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

//Function to roll dice for Player One
var play1 = function(){
  var dice = [1,2,3,4,5,6];

  var diceRoll = dice[Math.floor(Math.random() * dice.length)];

  document.getElementById("turn-count1").innerHTML = diceRoll;

  if(diceRoll === 1){
    document.getElementById("dice1").src = "images/dice1.png";
    newPlayer1.lose();
    newPlayer2.score = [];
    newPlayer2.score.push(0);
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

//Function to roll dice for Player Two
var play2 = function(imageChanger){
  var dice = [1,2,3,4,5,6];

  var diceRoll = dice[Math.floor(Math.random() * dice.length)];

  document.getElementById("turn-count2").innerHTML = diceRoll;

  if(diceRoll === 1){
    document.getElementById("dice2").src = "images/dice1.png";
    newPlayer2.lose();
    newPlayer1.score = [];
    newPlayer1.score.push(0);
    pass2();
    $(document).ready(function(){
      $(".roll-one2").show();
      $(".roll-one1").hide();
    });
  }
  else{
    newPlayer2.rolls.push(diceRoll);
    newPlayer2.win();
    newPlayer2.finish();
    if(diceRoll === 2){
      document.getElementById("dice2").src = "images/dice2.png";
    }
    else if(diceRoll === 3){
      document.getElementById("dice2").src = "images/dice3.svg";
    }
    else if(diceRoll === 4){
      document.getElementById("dice2").src = "images/dice4.png";
    }
    else if(diceRoll === 5){
      document.getElementById("dice2").src = "images/dice5.png";
    }
    else if(diceRoll === 6){
      document.getElementById("dice2").src = "images/dice6.png";
    }
  }
};
