document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('game-board');
    const cells = [];
    let currentPlayer = 'X';
    let gameActive = true;

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i;
        cell.addEventListener('click', cellClickHandler);
        board.appendChild(cell);
        cells.push(cell);
    }

    // Handle cell click
    function cellClickHandler() {
        const cellIndex = parseInt(this.id);

        if (!gameActive || cells[cellIndex].textContent !== '') return;

        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].classList.add(currentPlayer === 'X' ? 'x' : 'o');

        if (checkWin()) {
            gameActive = false;
            showWinMessage();
        } else if (checkDraw()) {
            gameActive = false;
            showDrawMessage();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnIndicator();
        }
    }

    // Check for a win
    function checkWin() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return cells[a].textContent !== '' &&
                   cells[a].textContent === cells[b].textContent &&
                   cells[a].textContent === cells[c].textContent;
        });
    }

    // Check for a draw
    function checkDraw() {
        return cells.every(cell => cell.textContent !== '');
    }

    // Update turn indicator
    function updateTurnIndicator() {
        document.getElementById('turn-indicator').textContent = `${currentPlayer}'s turn`;
    }

    // Show win message
    function showWinMessage() {
        document.getElementById('turn-indicator').textContent = `${currentPlayer} wins!`;
    }

    // Show draw message
    function showDrawMessage() {
        document.getElementById('turn-indicator').textContent = `It's a draw!`;
    }

    // Reset game
    document.getElementById('reset-button').addEventListener('click', function() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        currentPlayer = 'X';
        gameActive = true;
        updateTurnIndicator();
    });
});
