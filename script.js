// Setting up the game board Module
const gameBoardModule = (function () {
  //start with array of nine positions, each containing an empty string
  const gameBoard = new Array(9).fill("");
  //place the symbol in the array according to the index
  const updatePlay = function (index, symbol) {
    gameBoard.splice(index, 1, symbol);
    return gameBoard;
  };
  return { updatePlay };
})();
// End setting up the game board Module

// Setting up the screen controler display driver Module
const screenControlerModule = (function () {
  const x = "×";  
  const o = "○";
  $boxs = document.querySelectorAll(".box");
  const updateBox = function () {
    let stateOfPlay = "p1";
    // add symbol function
    const addSymbol = function (e) {
      if (e.target.textContent !== "") {
        e.target.textContent = e.target.textContent;
      } else if (stateOfPlay === "p1") {
        e.target.textContent = x;
        const game = gameBoardModule.updatePlay(e.target.id, x);
        let player = stateOfPlay;
        console.log(getWinnerModule.decision(game, player));
        stateOfPlay = "p2";
      } else {
        e.target.textContent = o;
        const play = gameBoardModule.updatePlay(e.target.id, o);
        let player = stateOfPlay;
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
            $boxs.forEach((box) => {
              box.removeEventListener("click", addSymbol);
            })
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
            $boxs.forEach((box) => {
              box.removeEventListener("click", addSymbol);
            })
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
            $boxs.forEach((box) => {
              box.removeEventListener("click", addSymbol);
            })
          }
        }
        // There isn't winner
        if (game.indexOf("") === -1 && winner === "") {
          winner = `There isn't winner`;
        }
        return winner;
      };
      return { decision };
    })();
  };
  return { updateBox };
})();
// End setting up the screen controler display driver Module

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
// End setting up player factory function