function createGameBoard(){
    const board = ["0","0","0",
                   "0","0","0",
                   "0","0","0"];
    function printBoard(){
        console.log(board);
    };

    function getBoardCell(i){
        return board[i];
    };

    function editBoardCell(i, input){
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
    

    return {board, getBoardCell, printBoard, editBoardCell, getBoardRow, getBoardCol, getMainDiag, getOppDiag};
}

function createPlayer(name,input){
    return {name, input};
}

(function gameController(){
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

    const gameBoard = createGameBoard();
    gameBoard.printBoard();
    console.log(gameBoard.board)

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
            console.log(`${activePlayer.name} Wins`);
        } else if(gameBoard.board.every(cell => cell !== "0")) {
            console.log("It's a draw!");
        } else{
            switchPlayerTurn();
            playRound();
        }; 
    };

    function playRound(){
        console.log(`${activePlayer.name}'s Turn`);
        position = prompt("Enter a position");
        gameBoard.editBoardCell(position, activePlayer.input);
        gameBoard.printBoard();
        checkWin(activePlayer.input);
    };

    playRound();

})();