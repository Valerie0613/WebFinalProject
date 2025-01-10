let score = 0; // Initialize score
let gameInterval; // Store the game loop interval

// Get the start button
const startButton = document.getElementById('start-button');

// Add an event listener to start the game when the button is clicked
startButton.addEventListener('click', function () {
    startGame();
});

// Start the game function
function startGame() {
    score = 0; // Reset the score to 0
    updateScoreDisplay(); // Update score on screen
    
    startButton.style.display = 'none'; // Hide the start button when the game starts

    // Start the game loop
    gameInterval = setInterval(function () {
        if (score >= 100) {
            stopGame(); // Stop the game when the score reaches 100
        } else {
            // Your game logic here, such as moving boxes, checking for collisions, etc.
            // Example: incrementScore();
        }
    }, 20); // Game loop interval (update every 20ms)
}

// Stop the game function
function stopGame() {
    clearInterval(gameInterval); // Clear the game loop interval
    alert('Game Over! You reached 100 points!');
    startButton.style.display = 'block'; // Show the start button again
}

// Update the score display
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    if (!scoreDisplay) {
        const scoreElement = document.createElement('div');
        scoreElement.id = 'score';
        scoreElement.style.position = 'absolute';
        scoreElement.style.top = '10px';
        scoreElement.style.right = '10px';
        scoreElement.style.fontSize = '24px';
        scoreElement.style.color = 'white';
        document.body.appendChild(scoreElement);
    }
    document.getElementById('score').innerText = `Score: ${score}`;
}

// Function to increment score (for example, when a box is caught)
function incrementScore() {
    score += 5; // Increment the score
    updateScoreDisplay(); // Update the display
}
