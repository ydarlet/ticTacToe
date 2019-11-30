



//
//  TIMER RELATED FUCNTIONS
//

// setRemainingTime() ==> 
// Here you can set the duration of the timer.
function setRemainingTime() {
  return (60 * 3);
}

// setupMinutesSeconds(timeRemaining) ==>
// return the new string to display to actualise the timer countdown.
function setupMinutesSeconds(timeRemaining) {
  var minutes = Math.floor(timeRemaining / 60);
  var seconds = Math.floor(timeRemaining % 60);
  var minutes = '0' + minutes;
  var seconds = seconds < 10 ? '0' + seconds : seconds;

  return (minutes + ':' + seconds);
}




//
//  GAME MECHANIC RELATED FUCNTIONS
//

// resetGameBoard(boxes) ==> 
// wait one second to let the user see the recent game displays,
// then, reset all the boxes config to the starting state (no colors and no signs).
function resetGameBoard(boxes) {
  setTimeout(function(){
      boxes.forEach((box) => {
        box.innerHTML = '';
        box.style.backgroundColor = '';
      });
  }, 1000);
}

// isEmpty(box) ==>
// return true if the box isn't ticked yet.
function isEmpty(box) {
  return box.innerHTML.length == 0;
}

// tickBox(box, playerSign) ==> 
// tick the box with the sign corresponding to the actual player.
function tickBox(box, playerSign) {
  box.innerHTML = playerSign;
}

// tieGame(boxes) ==> 
// return true if it is a tie game, return false if it is'nt.
function tieGame(boxes) {
  for (var i = 0, len = boxes.length; i < len; i++) {
    if (boxes[i].innerHTML.length == 0)
      return false;
  }
  return true;
}

// winnerSearch(boxes, players, turn) ==>
// return true if a player wins, and change the corresponding boxes color.
function winnerSearch(boxes, players, turn) {
  var boxColorWin = "#81e6d9"

  if (boxes[0].innerHTML == players[turn] &&
      boxes[1].innerHTML == players[turn] &&
      boxes[2].innerHTML == players[turn]) {
    boxes[0].style.backgroundColor = boxColorWin;
    boxes[1].style.backgroundColor = boxColorWin;
    boxes[2].style.backgroundColor = boxColorWin;
    return true;
  }
  if (boxes[0].innerHTML == players[turn] &&
      boxes[3].innerHTML == players[turn] &&
      boxes[6].innerHTML == players[turn]) {
    boxes[0].style.backgroundColor = boxColorWin;
    boxes[3].style.backgroundColor = boxColorWin;
    boxes[6].style.backgroundColor = boxColorWin;
    return true;
  }
  if (boxes[0].innerHTML == players[turn] &&
      boxes[4].innerHTML == players[turn] &&
      boxes[8].innerHTML == players[turn]) {
    boxes[0].style.backgroundColor = boxColorWin;
    boxes[4].style.backgroundColor = boxColorWin;
    boxes[8].style.backgroundColor = boxColorWin;
    return true;
  }
  if (boxes[1].innerHTML == players[turn] &&
      boxes[4].innerHTML == players[turn] &&
      boxes[7].innerHTML == players[turn]) {
    boxes[1].style.backgroundColor = boxColorWin;
    boxes[4].style.backgroundColor = boxColorWin;
    boxes[7].style.backgroundColor = boxColorWin;
    return true;
  }
  if (boxes[2].innerHTML == players[turn] &&
      boxes[4].innerHTML == players[turn] &&
      boxes[6].innerHTML == players[turn]) {
    boxes[2].style.backgroundColor = boxColorWin;
    boxes[4].style.backgroundColor = boxColorWin;
    boxes[6].style.backgroundColor = boxColorWin;
    return true;
  }
  if (boxes[2].innerHTML == players[turn] &&
      boxes[5].innerHTML == players[turn] &&
      boxes[8].innerHTML == players[turn]) {
    boxes[2].style.backgroundColor = boxColorWin;
    boxes[5].style.backgroundColor = boxColorWin;
    boxes[8].style.backgroundColor = boxColorWin;
    return true;
  }
  if (boxes[3].innerHTML == players[turn] &&
      boxes[4].innerHTML == players[turn] &&
      boxes[5].innerHTML == players[turn]) {
    boxes[3].style.backgroundColor = boxColorWin;
    boxes[4].style.backgroundColor = boxColorWin;
    boxes[5].style.backgroundColor = boxColorWin;
    return true;
  }
  if (boxes[6].innerHTML == players[turn] &&
      boxes[7].innerHTML == players[turn] &&
      boxes[8].innerHTML == players[turn]) {
    boxes[6].style.backgroundColor = boxColorWin;
    boxes[7].style.backgroundColor = boxColorWin;
    boxes[8].style.backgroundColor = boxColorWin;
    return true;
  }
  return false;
}




//
//  GAME DISPLAYS RELATED FUCNTIONS
//

// detailsDisplayer() ==>
// return a function to be user directly in the game to display messages during the game
var detailsDisplayer = function(elem) {
  function setText(text) {
    elem.innerHTML = text;
  }
  return { sendText: setText };
}

// toggleArrowDisplay(turn) ==>
// toggle the visibility state of the arrow according to which player turn it is.
function toggleArrowDisplay(turn) {
  var player = turn + 1;
  var arrowA = document.getElementById("arrowPlayer1");
  var arrowB = document.getElementById("arrowPlayer2");

  if (player == 1) {
    arrowA.classList.remove("invisible");
    arrowB.classList.add("invisible");
  }
  else if (player == 2) {
    arrowA.classList.add("invisible");
    arrowB.classList.remove("invisible");
  }
}

// markThePoints(points, turn) ==>
// according to the player who win the turn, write down his new amount of points
// on the correct element.
function markThePoints(points, turn) {
  document.querySelector("#pointsPlayer" + (turn + 1)).innerHTML = points[turn] + ' Points';
}

// setWinnerDetailsToExAequo() ==>
// write the Ex Aequo infos on the winnerPannel elements
function setWinnerDetailsToExAequo() {
  document.getElementById("winnerTitle").innerHTML = "Tie Game";
  document.getElementById("theWinnerIs").innerHTML = "Player 1 & Player 2";
  document.getElementById("finalScore").innerHTML = "ex aequo";
}

// setWinnerDetails(points) ==>
// write the Winner infos on the winnerPannel elements
function setWinnerDetails(points) {
  var player = points[0] > points[1] ? 1 : 2 

  document.getElementById("winnerTitle").innerHTML = "Winner:";
  document.getElementById("theWinnerIs").innerHTML = "Player " + player;
  if (player == 1)
    document.getElementById("finalScore").innerHTML = points[0] + "/" + points[1];
  else if (player == 2)
    document.getElementById("finalScore").innerHTML = points[1] + "/" + points[0];
}

function timeElapsedSequence(points) {
  document.getElementById("winnerPannel").classList.remove("invisible");
  if (points[0] == points[1])
    setWinnerDetailsToExAequo();
  else
    setWinnerDetails(points);
}




//
//  GAME MAIN FUNCTION
//

// startGame() ==>
// launch the game (initializing vars, lauching the countdown, listenng the click events),
// and react to each clicks with the appropriate behavior to drive the game correctly.
function startGame() {
  var timeRemaining = setRemainingTime();
  var boxes = document.querySelectorAll("#game button");
  var players = ['X', 'O'];
  var points = [0, 0];
  var turn = 0;
  var winner = false;
  var tickable = true;
  var gameIsOn = true;
  var display = new detailsDisplayer (document.querySelector("#gamesDetails"));

  // Displays at the right moment (when the countdown starts),
  // the indication that the game is beginning.
  setTimeout(function(){
    display.sendText("Ready, Steady, Tick! <br /> Player " + (turn + 1) + "'s turn.");
  }, 1000);

  // Start the countdown
  var timeIsPassing = setInterval(function() {

    // Make the time pass, one second after an other
    var countdown = setupMinutesSeconds(timeRemaining);
    timeRemaining--;
    document.getElementById("timer").innerHTML = countdown;

    // If there is still some time to play (gameIsOn)
    if (gameIsOn) {
      for (var i = 0, len = boxes.length; i < len; i++) {
        boxes[i].addEventListener("click", function() {

          console.log('this', this);

          // If it is a Tie Game,
          // disable the possibility to tick a box,
          // display the appropriate message during 1 second then display the next player turn message,
          // reset the game,
          // allow again the player to tick a box.
          if (tieGame(boxes)) {
            tickable = false;
            display.sendText("<br /> Tie game!");
            resetGameBoard(boxes);
            setTimeout(function(){
              display.sendText("Ready, Steady, Tick! <br /> Player " + (turn + 1) + "'s turn.");
              toggleArrowDisplay(turn);
              tickable = true;
            }, 1000);
            turn = 0;
            return;
          }
        
          // if there is a Winner, 
          // return to avoid to toggle player's turn when not needed
          if (winner)
            return;

          // If the clicked box is free
          if (isEmpty(this)) {

            // If we are allowed to click right now to tick it,
            // then the box is ticked
            if(tickable)
              tickBox(this, players[turn]);

            // If there is a winner,
            // displays the right message during 1 second
            // and give him one more point,
            // then disable the possibility to click on a box,
            // displays the points on the page,
            // reset the game,
            // displays the beginning message,
            // enable again the possibility to clic on a box
            winner = winnerSearch(boxes, players, turn);
            if(winner) {
              display.sendText("<br /> Player " + (turn + 1) + " win!");
              if (tickable)
                points[turn]++;
              tickable = false;
              markThePoints(points, turn);
              resetGameBoard(boxes);
              setTimeout(function(){
                display.sendText("Ready, Steady, Tick! <br /> Player " + (turn + 1) + "'s turn.");
                toggleArrowDisplay(turn);
                tickable = true;
              }, 1000);
              turn = 0;
              winner = false;
              return;
            }
            
            // Toggle the player's turn (only if it's allowed to play when the user is clicking)
            // display the new player's turn message
            // toggle the new player's arrow on
            if (tickable){
              turn++;
              turn = turn % 2;
            }
            display.sendText("<br /> Player " + (turn + 1) + "'s turn.");
            toggleArrowDisplay(turn);
          }

          // If the clicked box is already ticked
          else {
            display.sendText("Box already ticked! <br /> Still Player " + (turn + 1) + "'s turn.");
          }

        });
      }
    }

    // If the time is elapsed (!gameIsOn),
    // displays the winnerPannel with all the winner infos,
    // - last sequence before clearInterval
    else {
      timeElapsedSequence(points);
      clearInterval(timeIsPassing);
    }

    // If the countdown is finished
    if (timeRemaining < 0) {
      gameIsOn = false;
      document.getElementById("timer").innerHTML = "time elapsed";
    }

  }, 1000);
}




//
//  GAME LAUCNH
//

startGame();