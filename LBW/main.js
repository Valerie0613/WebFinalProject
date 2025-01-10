window.addEventListener("load", function () {
    const gameContainer = document.querySelector('.game-container');
    const boat = document.getElementById('boat');

    let squareX = 0; // Boat's X-axis position
    let squareY = 10; // Boat's Y-axis position
    const speed = 5; // Movement speed
    let movementInterval = null;

    // Hook motion state (shared state with hook.js)
    window.isHookInMotion = false;

    // Get the container dimensions
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;

    // Update boat's position in the container
    function updateBoatPosition() {
        boat.style.left = `${squareX}px`;
        boat.style.top = `${squareY}px`;
    }

    // Start continuous movement when a key is pressed
    function startMovement(event) {
        if (movementInterval) return; // Prevent multiple intervals
        if (window.isHookInMotion) return; // Prevent movement if hook is in motion

        movementInterval = setInterval(() => {
            switch (event.key) {
                case "ArrowLeft":
                case "a":
                    if (squareX > 0) {
                        squareX -= speed; // Move left
                    }
                    break;
                case "ArrowRight":
                case "d":
                    if (squareX < containerWidth - boat.offsetWidth) {
                        squareX += speed; // Move right
                    }
                    break;
            }
            updateBoatPosition(); // Update boat's position continuously
        }, 20); // Update every 20ms (adjust this for speed)
    }

    // Stop movement when the key is released
    function stopMovement() {
        clearInterval(movementInterval);
        movementInterval = null;
    }

    // Event listeners for movement
    document.addEventListener('keydown', function (event) {
        startMovement(event); // Start moving when key is pressed
    });

    document.addEventListener('keyup', function () {
        stopMovement(); // Stop moving when key is released
    });

    // Initialize boat's position
    updateBoatPosition();
});
