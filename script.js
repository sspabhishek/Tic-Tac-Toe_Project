let currentPlayer = "X";
let arr = Array(9).fill(null);
let gameActive = true;

function resetGame() {
    arr = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "";
    resultElement.classList.remove('winner', 'draw');
    const cells = document.querySelectorAll('.col');
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('clicked');
    });
    document.getElementById('fireworks-container').innerHTML = '';
}

function startFireworks() {
    const container = document.getElementById('fireworks-container');
    const fireworks = new Fireworks(container, {
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 100,
        trace: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: { min: 0, max: 360 },
        delay: { min: 15, max: 30 },
        rocketsPoint: { min: 50, max: 50 },
        lineWidth: { explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } },
        brightness: { min: 50, max: 80 },
        decay: { min: 0.015, max: 0.03 },
        mouse: { click: false, move: false, max: 1 },
        boundaries: { x: 0, y: 0, width: container.clientWidth, height: container.clientHeight },
        sound: { enable: true, files: ['explosion0.mp3', 'explosion1.mp3', 'explosion2.mp3'], volume: { min: 4, max: 8 } }
    });
    fireworks.start();
}

function checkWinner() {
    const resultElement = document.getElementById("result");
    if (
        (arr[0] != null && arr[0] == arr[1] && arr[1] == arr[2]) ||
        (arr[3] != null && arr[3] == arr[4] && arr[4] == arr[5]) ||
        (arr[6] != null && arr[6] == arr[7] && arr[7] == arr[8]) ||
        (arr[0] != null && arr[0] == arr[3] && arr[3] == arr[6]) ||
        (arr[1] != null && arr[1] == arr[4] && arr[4] == arr[7]) ||
        (arr[2] != null && arr[2] == arr[5] && arr[5] == arr[8]) ||
        (arr[0] != null && arr[0] == arr[4] && arr[4] == arr[8]) ||
        (arr[2] != null && arr[2] == arr[4] && arr[4] == arr[6])
    ) {
        gameActive = false;
        resultElement.innerHTML = `Winner is ${currentPlayer}`;
        resultElement.classList.add('winner');
        startFireworks();
        setTimeout(resetGame, 5000); // Restart the game after 5 seconds
        return;
    }
    if (!arr.some(e => e === null)) {
        gameActive = false;
        resultElement.innerHTML = `Draw !!`;
        resultElement.classList.add('draw');
        setTimeout(resetGame, 5000); // Restart the game after 5 seconds
        return;
    }
}

function handleClick(el) {
    if (!gameActive) return;
    const id = Number(el.id);
    if (arr[id] != null) return;
    arr[id] = currentPlayer;
    el.innerText = currentPlayer;
    el.classList.add('clicked');
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}
