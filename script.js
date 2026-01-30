const result=document.querySelector(".result");
const restartbtn=document.querySelector(".restart");
//Gameboard module
const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    function getBoard() {
        return board;
    }
    function setMark(index, mark) {
        if (board[index] !== "") return false;
        board[index] = mark;
        return true;
    }
    function reset() {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    return{
        getBoard,setMark,reset
    };

})();

function createPlayer(name, mark) {
    return { name, mark };
}

//Game Module
const Game = (function () {
    let player1;
    let player2;
    let currentPlayer;
    let gameOver=false;

    function startGame(name1,name2){
        player1=createPlayer(name1,"X");
        player2=createPlayer(name2,"O");
        currentPlayer=player1;
        Gameboard.reset();
    }

    function playRound(index){
        if(gameOver) return;
        const move=Gameboard.setMark(index,currentPlayer.mark);
        if(!move) return;
        const board=Gameboard.getBoard();
        if (checkWin(board, currentPlayer.mark)) {
            gameOver = true;
            console.log(`${currentPlayer.name} wins!`);
            result.textContent=`${currentPlayer.name} wins`;
            return;
  }

        if (checkTie(board)) {
            gameOver = true;
            console.log("It's a tie!");
            return;
        }
        currentPlayer=currentPlayer===player1?player2:player1;
    }
    return {startGame,playRound};

})();

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWin(board, mark) {
  return WIN_PATTERNS.some(pattern => {
    return pattern.every(index => board[index] === mark);
  });
}
function checkTie(board) {
  return board.every(cell => cell !== "");
}

const cells = document.querySelectorAll(".cell");

function render() {
  const board = Gameboard.getBoard();
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = Number(cell.dataset.index);
    Game.playRound(index);
    render();
  });
});

restartbtn.addEventListener("click",()=>{
  Gameboard.reset();
  result.textContent='';
  render();
});
Game.startGame("Player 1", "Player 2");
render();

