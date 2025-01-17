// Setting up the gameBoard Module
const gameBoardModule = (function () {
  //start with array of nine positions, each containing an empty string
  //const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const gameBoard = new Array(9).fill("");
  //place the symbol in the array according to the index
  const updatePlay = function (index, symbol) {
    gameBoard.splice(index, 1, symbol);
    return gameBoard;
  };
  return { updatePlay };
})();
// Setting up the game winner decision
const getWinner = (function(){ 
  let winner = ""; 
  const decision = function(play) {
    if(play[0] !== "" && play[0] === play[1] && play[1] === play[2] || play[3] !== "" && play[3] === play[4] && play[4] === play[5] || play[6] !== "" && play[6] === play[7] && play[7] === play[8]) {
      winner = "There is a horizontal winner";
    } else if(play[0] !== "" && play[0] === play[3] && play[3] === play[6] || play[1] !== "" && play[1] === play[4] && play[4] === play[7] || play[2] !== "" && play[2] === play[5] && play[5] === play[8]) {
      winner = "There is a vertical winner";
    } else if(play[0] !== "" && play[0] === play[4] && play[4] === play[8] || play[2] !== "" && play[2] === play[4] && play[4] === play[6]) {
      winner = "There are a diagonal winner";
    } else {
      winner = "There are not winner"
    }
    return winner;
  }
  return {decision}
})(); 
// Setting up the screen controler display driver Module
const screenControlerModule = (function () {
  const x = "×";
  const o = "○";
  let stateOfPlay = "p1";
  $boxs = document.querySelectorAll(".box");
  //console.log($boxs);
  const updateBox = function() {
    $boxs.forEach((box) => {
      box.addEventListener("click", () => {
        if (box.textContent !== "") {
          box.textContent = box.textContent;          
        } else if(stateOfPlay === "p1"){
          box.textContent = x;
          const play = gameBoardModule.updatePlay(box.id, x);
          console.log(getWinner.decision(play));
          stateOfPlay = "p2";
          } else {
            box.textContent = o;
            const play = gameBoardModule.updatePlay(box.id, o);
            console.log(getWinner.decision(play));
            stateOfPlay = "p1";
          }
      return box.textContent
      });
    });    
  }
  return {updateBox};
})();
screenControlerModule.updateBox();

// Setting up player factory function
const createPlayer = function (name, selectedSymbol) {
  const getPlayerName = () => {
    console.log(
      `This is the name of player: ${name} and the selected simbol is: ${selectedSymbol}`
    );
  };
  return { getPlayerName, name, selectedSymbol };
};



