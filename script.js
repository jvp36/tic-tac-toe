// player one form variables
const $playerOneForm = document.getElementById("player-one-form");
const $playerOneName = document.getElementById("player-one-name");
const $playerOneSymbol = document.getElementById("player-one-symbol");
const $humanOpponent = document.getElementById("human");
const $machineOpponent = document.getElementById("machine");
const $pOneSave = document.getElementById("p-one-save");
//player two form variables
const $playerTwoForm = document.getElementById("player-two-form");
const $playerTwoName = document.getElementById("opponent-name");
const $playerTwoSymbol = document.getElementById("player-two-symbol");
const $pTwoSave = document.getElementById("p-two-save");
const $crossOption = document.getElementById("cross1");
const $circleOption = document.getElementById("circle1");
const $heartOption = document.getElementById("heart1");
const $happyFaceOption = document.getElementById("happy-face1");
// result variables
const $result = document.getElementById("result");
const $resultText = document.getElementById("result-text");
const $playAgain = document.getElementById("replay");
const $reload = document.getElementById("reload");
// Global variables for selected symbols
let playerOneSymbol;
let playerTwoSymbol;
// Global variables for selected names
let playerOneName;
let playerTwoName;
//Global variable for start with array of nine positions, each containing an empty string
let gameBoard = new Array(9).fill("");
//Global variable for the game to be started by player p1
let stateOfPlay = "p1";
// Get player one data function
const getPlayerOneData = function(e) {
  e.preventDefault();
  if($playerOneName.value.trim() === "") {
    alert("The player name cannot is empty.")
  } else {
    playerOneName = $playerOneName.value; 
  }
  if($playerOneSymbol.value === "empty") {
    alert("You shoud to select a symbol");
  } else {
    switch ($playerOneSymbol.value) {
      case "cross":
      playerOneSymbol = "×";
      $crossOption.setAttribute("disabled", true);
      break;
    case "circle":
      playerOneSymbol = "○";
      $circleOption.setAttribute("disabled", true);
      break;
    case "heart":
      playerOneSymbol = "𖹭";
      $heartOption.setAttribute("disabled", true);
      break;
    case "happy-face":
      playerOneSymbol = "☺︎";
      $happyFaceOption.setAttribute("disabled", true);
      break;
    default:
      break;
    }
  }  
  const playerOne = createPlayer(playerOneName, playerOneSymbol);
  if ($humanOpponent.checked && $playerOneName.value.trim() !== "" && $playerOneSymbol.value !== "empty") {
    $playerTwoForm.style.display = "block";
  } else if($machineOpponent.checked) {
    playerTwoName = "Robot";
    playerTwoSymbol = "☼";
    alert("We can't play with a robot yet." + "\n" + "Please make the robot movements");
  }
  console.log(playerOne);
  console.log(playerOne.name);
  console.log(playerOne.selectedSymbol);
  return playerOne;  
}
// get player two data function
const getPlayerTwoData = function(e) {
  e.preventDefault();
  if($playerTwoName.value.trim() === "") {
    alert("The opponent name cannot is empty")
  } else {
    playerTwoName = $playerTwoName.value;
  }
  if($playerTwoSymbol.value === "empty") {
    alert("Opponent shoud to select a symbol")
  }
  switch ($playerTwoSymbol.value) {
    case "cross":
      playerTwoSymbol = "×";
      break;
    case "circle":
      playerTwoSymbol = "○";
      break;
    case "heart":
      playerTwoSymbol = "𖹭";
      break;
    case "happy-face":
      playerTwoSymbol = "☺︎";
      break;
    default:
  }
  const playerTwo = createPlayer(playerTwoName, playerTwoSymbol);
  console.log(playerTwo);
  console.log(playerTwo.selectedSymbol);
  console.log(playerTwo.name);
  return playerTwo;  
} 
// Save player one data Event
$pOneSave.addEventListener("click", getPlayerOneData);
// Save player two data Event
$pTwoSave.addEventListener("click", getPlayerTwoData);

// Setting up player factory function
const createPlayer = function (name, selectedSymbol) {
  const getPlayerName = () => {
    console.log(
      `This is the name of player: ${name} and the selected simbol is: ${selectedSymbol}`
    );
  };
  return { getPlayerName, name, selectedSymbol };
};
// End setting up player factory function
// Setting up the game board Module
const gameBoardModule = (function () {
  //place the symbol in the array according to the index
  const updatePlay = function (index, symbol) {
    gameBoard.splice(index, 1, symbol);
    console.log(gameBoard);
    return gameBoard;
  };
  return { updatePlay };
})();
// End setting up the game board Module

// Setting up the screen controler display driver Module
const screenControlerModule = (function () {  
  $boxs = document.querySelectorAll(".box");
  const updateBox = function () {    
    // add symbol function
    const addSymbol = function (e) {
      if (e.target.textContent !== "") {
        e.target.textContent = e.target.textContent;
      } else if (stateOfPlay === "p1") {
        e.target.textContent = playerOneSymbol;
        const game = gameBoardModule.updatePlay(e.target.id, playerOneSymbol);
        let player = playerOneName;
        console.log(getWinnerModule.decision(game, player));
        stateOfPlay = "p2";
      } else {
        e.target.textContent = playerTwoSymbol;
        const play = gameBoardModule.updatePlay(e.target.id, playerTwoSymbol);
        let player = playerTwoName;
        console.log(getWinnerModule.decision(play, player));
        stateOfPlay = "p1";
      }
      return e.target.textContent;
    };
    $boxs.forEach((box) => {
      box.addEventListener("click", addSymbol);
    });
    // Setting up the game winner decision Module
    const getWinnerModule = (function () {
      let winner = "";
      const decision = function (game, player) {
        // Horizontal line
        for (let index = 0; index < game.length; index += 3) {
          if (
            game[index] !== "" &&
            game[index] === game[index + 1] &&
            game[index] === game[index + 2]
          ) {
            winner = `The winner is ${player}`;
            $resultText.textContent = winner;
            $result.style.display = "block"; 
            $boxs.forEach((box) => {
              box.removeEventListener("click", addSymbol);
            });
          }
        }
        // Vertical line
        for (let index = 0; index < game.length; index++) {
          if (
            game[index] !== "" &&
            game[index] === game[index + 3] &&
            game[index] === game[index + 6]
          ) {
            winner = `The winner is ${player}`;
            $resultText.textContent = winner;
            $result.style.display = "block"; 
            $boxs.forEach((box) => {
              box.removeEventListener("click", addSymbol);
            });
          }
        }
        // oblique line
        for (let index = 0; index < game.length; index += 6) {
          if (
            (game[index] !== "" &&
              game[index] === game[index + 4] &&
              game[index] === game[index + 8]) ||
            (game[index] !== "" &&
              game[index] === game[index - 2] &&
              game[index] === game[index - 4])
          ) {
            winner = `The winner is ${player}`;
            $resultText.textContent = winner;
            $result.style.display = "block"; 
            $boxs.forEach((box) => {
              box.removeEventListener("click", addSymbol);
            });
          }
        }
        // There isn't winner
        if (game.indexOf("") === -1 && winner === "") {
          winner = `There isn't winner`;
          $resultText.textContent = winner;
          $result.style.display = "block"; 
        }
        return winner;
      };
      return { decision };
    })();
  };
  return { updateBox };
})();
// End setting up the screen controler display driver Module
// Play again
$playAgain.addEventListener("click", () => {  
  $boxs.forEach((box) => {
    box.textContent = "";
  })
  $result.style.display = "none";
  //Restart it with array of nine positions, each containing an empty string
  gameBoard = new Array(9).fill("");
  //The game is restarted by player p1
  stateOfPlay = "p1";
  screenControlerModule.updateBox();
  console.log("Playing Again...");
});
// Reload game
$reload.addEventListener("click", () => {
  location.reload();
}) 

screenControlerModule.updateBox();


