let gameboard = function () {
    let board = [];
    let isPlayerStart = 'player';

    const cells = document.querySelectorAll('.cell');
    const start = document.getElementById('start');

    function _boardReset() {
        // Resetting the board to have '.' in each index
        board = [];
        for (let i = 0; i < 9; i++) {
            board.push('.');
        }

        // Resetting the attribute and removing the SVGs
        cells.forEach(function (cell, index) {
            cell.setAttribute('value', '.');
            cell.innerHTML = '';
        });

        // Randomly select if the computer goes first or the player
        isPlayerStart = Math.random() < 0.5;
        if (!isPlayerStart) {
            start.innerHTML = 'Computer is Starting';
        }
        else {
            start.innerHTML = 'Player is Starting';
        }

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

        _render(pool[randNum], 'O');
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

    function _render(index, sign) {
        const cell = document.getElementById(`cell-${index}`);

        let xSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>window-close</title>
                <path
                    d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
            </svg>
        `;
        let oSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>checkbox-blank-circle-outline</title>
                <path
                    d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
        `;

        cell.setAttribute('value', sign);

        if (sign === 'X') {
            cell.innerHTML = xSVG;
        }
        else {
            cell.innerHTML = oSVG;
        }
    }

    function play() {
        _boardReset();
        if (!isPlayerStart) {
            _computerMove();
        }
    }

    function playerMove(event) {
        let move = parseInt((event.target.id).split('-')[1]);

        if (board[move] !== '.') {
            return 'again';
        }

        board[move] = 'X';
        _render(move, 'X');
        let isOver = _isGameOver();

        if (isOver === 'again') {
            isOver = _computerMove();
        }
        return isOver;
    }

    return { play, playerMove };
};

let inputs = (function () {
    let { play, playerMove } = gameboard();

    const cells = document.querySelector('.gameboard');
    const dialog = document.querySelector("dialog");
    const dialogH1 = dialog.querySelector('h1');
    const close = dialog.querySelector('button');
    const start = document.getElementById('start');

    function indexButtonEvents() {
        const github = document.getElementById('github');
        const source = document.getElementById('source');
        const reset = document.getElementById('reset');

        github.addEventListener('click', () => {
            window.open('https://github.com/S4M0707', '_blank');
        });

        source.addEventListener('click', () => {
            window.open('https://github.com/S4M0707/tic-tac-toe', '_blank');
        });

        reset.addEventListener('click', play);
    }

    // Event Listener for the gameboard cells
    cells.addEventListener('click', (event) => {
        const result = playerMove(event);

        if (result === 'again') {
            return result;
        }
        if (result === 'O') {
            dialogH1.innerHTML = "OOPS! Computer Won";
        }
        if (result === 'X') {
            dialogH1.innerHTML = "WOW! You Won";
        }
        if (result === 'DRAW') {
            dialogH1.innerHTML = "There is a DRAW";
        }
        dialog.showModal();
        start.innerHTML = 'Click Play to Start the Game';
    });

    // Event Listener to close dialog
    close.addEventListener('click', () => {
        dialog.close();
    });

    indexButtonEvents();
})();