function createGameBoard(){
    const board = ["0","0","0",
                   "0","0","0",
                   "0","0","0"];
    function printBoard(){
        console.log(`${board[0]},${board[1]},${board[2]}`);
        console.log(`${board[3]},${board[4]},${board[5]}`);
        console.log(`${board[6]},${board[7]},${board[8]}`);
    };

    function getBoard(){
        return board;
    };

    function getBoardCell(i){
        return board[i];
    };

    function editBoardCell(i, input){
        if(board[i] !== "0") return;
        return board[i] = input;
    };

    function getBoardRow(i){
        return [board[i],board[i+1],board[i+2]];
    };

    function getBoardCol(i){
        return [board[i],board[i+3],board[i+6]];
    };

    function getMainDiag(){
        return [board[0],board[4],board[8]];
    };

    function getOppDiag(){
        return [board[2],board[4],board[6]];
    };
    

    return {printBoard, getBoard, getBoardCell, editBoardCell, getBoardRow, getBoardCol, getMainDiag, getOppDiag};
}

function createPlayer(name,input){
    const editPlayerName = (name) => name;
    return {name, input, editPlayerName};
}

function gameController(){
    playerOne = createPlayer("Player One","X");
    playerTwo = createPlayer("Player Two","O");

    const players = [];
    players.push(playerOne);
    players.push(playerTwo);

    let activePlayer = players[0];
    function switchPlayerTurn(){
        if(activePlayer === players[0]){
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    };

    const getActivePlayer = () => activePlayer;
    const resetActivePlayer = () => activePlayer = players[0];


    const gameBoard = createGameBoard();
    gameBoard.printBoard();

    let position;

    function checkWin(input){
        let row1 = gameBoard.getBoardRow(0);
        let row2 = gameBoard.getBoardRow(3);
        let row3 = gameBoard.getBoardRow(6);

        let col1 = gameBoard.getBoardCol(0);
        let col2 = gameBoard.getBoardCol(1);
        let col3 = gameBoard.getBoardCol(2);

        let mainDiag = gameBoard.getMainDiag();
        let oppDiag = gameBoard.getOppDiag();

        if(row1.every(cell => cell === input) || row2.every(cell => cell === input) || row3.every(cell => cell === input) ||
            col1.every(cell => cell === input) || col2.every(cell => cell === input) || col3.every(cell => cell === input) ||
            mainDiag.every(cell => cell === input) || oppDiag.every(cell => cell === input))
            {
            alert(`${getActivePlayer().name} Wins!`);
            return 1;
        } else if(gameBoard.getBoard().every(cell => cell !== "0")){
            alert(`It's a draw!`);
            return 2;
        } else {
            return 0;
        }
    };

    const playRound = (position) => {
        console.log(`${getActivePlayer().name}'s Turn.`);
        if(gameBoard.getBoardCell(position) !== "0"){
            alert("Cell is already occupied.");
            return;
        }
        gameBoard.editBoardCell(position, getActivePlayer().input);
        if(checkWin(getActivePlayer().input) === 1 || checkWin(getActivePlayer().input) === 2){
            return;
        } else {
            switchPlayerTurn();
        }
        gameBoard.printBoard();  
    };
    return {playRound, checkWin, getActivePlayer, resetActivePlayer, getBoard: gameBoard.getBoard, getBoardCell: gameBoard.getBoardCell, players, editBoardCell: gameBoard.editBoardCell};
};

function consoleGameController(){
    const game = gameController();
    let winCondition
    let input;

    const playGame = () => {
        let winCheck = 0;
        while((winCheck === 0)){
            input = prompt(`${game.getActivePlayer().name}, Enter a Position.`);
            game.playRound(input);
            winCheck = game.checkWin(game.getActivePlayer().input);
            console.log(winCheck);
        }    
    };

    playGame();
}

function displayController(){
    const game = gameController();
    const boardDiv = document.querySelector(".game-board");
    const boardCellsDivs = document.querySelectorAll(".game-board > div");
    const container = document.querySelector(".container > .text-container");
    const form = document.querySelector("form");
    const resetButton = document.querySelector(".reset-button");
    const board = game.getBoard();

    const updateScreen = () => {
        const activePlayer = game.getActivePlayer();

        container.textContent = `${activePlayer.name}'s Turn`;

        boardCellsDivs.forEach((cell) => {
            cell.textContent = game.getBoardCell(cell.id);
            if(cell.textContent === "0"){
                cell.textContent = "";
            }
        }
        );
    };

    form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(form);
        const playerOneNewName = formData.get("player-1-name");
        const playerTwoNewName = formData.get("player-2-name");
        game.players[0].name = playerOneNewName;
        game.players[1].name = playerTwoNewName;
        form.reset();
        updateScreen();
    });

    resetButton.addEventListener('click', event => {
        board[0] = "0";
        board[1] = "0";
        board[2] = "0";
        board[3] = "0";
        board[4] = "0";
        board[5] = "0";
        board[6] = "0";
        board[7] = "0";
        board[8] = "0";
        game.resetActivePlayer();
        updateScreen();
    })

    boardDiv.addEventListener('click',((event) => {
        game.playRound(event.target.id);
        updateScreen();
    }));

    updateScreen();
};

displayController();

