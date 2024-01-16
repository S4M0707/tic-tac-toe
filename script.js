let gameboard = function () {
    let board = [];
    let isPlayerStart = 'player';

    function _boardReset() {
        // Resetting the board to have '.' in each index
        board = [];
        for (let i = 0; i < 9; i++) {
            board.push('.');
        }

        // Randomly select if the computer goes first or the player
        isPlayerStart = Math.random() < 0.5;

        return isPlayerStart;
    }

    function _computerMove() {
        // Creating a pool of available cells of Board
        let pool = []
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '.') {
                pool.push(i);
            }
        }

        // Selecting a random index inside the pool
        let randNum = Math.floor(Math.random() * (pool.length));

        // Putting 'O' in the selected board cell
        board[pool[randNum]] = 'O';

        _render();
        return _isGameOver();
    }

    // Writing a function that checks all the possible victories or losses or draws or to continue
    function _isGameOver() {
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '.') {
            return board[0];
        }
        if (board[3] === board[4] && board[4] === board[5] && board[3] !== '.') {
            return board[3];
        }
        if (board[6] === board[7] && board[7] === board[8] && board[6] !== '.') {
            return board[6];
        }
        if (board[0] === board[3] && board[3] === board[6] && board[0] !== '.') {
            return board[0];
        }
        if (board[1] === board[4] && board[4] === board[7] && board[1] !== '.') {
            return board[3];
        }
        if (board[2] === board[5] && board[5] === board[8] && board[2] !== '.') {
            return board[6];
        }
        if (board[0] === board[4] && board[4] === board[8] && board[0] !== '.') {
            return board[0];
        }
        if (board[2] === board[4] && board[4] === board[6] && board[2] !== '.') {
            return board[2];
        }
        for (let i = 0; i < 9; i++) {
            if (board[i] === '.') {
                return 'again';
            }
        }
        return 'DRAW';
    }

    function _render() {
        let s = `
        ${board[0]}, ${board[1]}, ${board[2]},
        ${board[3]}, ${board[4]}, ${board[5]},
        ${board[6]}, ${board[7]}, ${board[8]},
        `;
        console.log(s);
    }

    function play() {
        _boardReset();
        if (!isPlayerStart) {
            _computerMove();
        }
    }

    function playerMove(move) {
        move = parseInt(move);

        board[move] = 'X';
        _render();
        let isOver = _isGameOver();

        if (isOver === 'again') {
            isOver = _computerMove();
        }
        return isOver;
    }

    return {play, playerMove};
};

let x = gameboard();