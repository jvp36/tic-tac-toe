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
//console.log(gameBoardModule.updatePlay(0, "X"));
//console.log(gameBoardModule.updatePlay(3, 'O'));

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
          gameBoardModule.updatePlay(box.id, x);
          stateOfPlay = "p2";
          } else {
            box.textContent = o;
            gameBoardModule.updatePlay(box.id, o);
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



