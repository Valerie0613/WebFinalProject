window.addEventListener("load", function() {
    const fish = document.getElementById('fish');
    
    let fishX = 0;
    let fishY = 265; // Initial Y position, within water range
    const speed = 2;
    const minHeight = 0; // Minimum Y position (water surface)
    const maxHeight = 3000; // Maximum Y position (water depth)
    const minX = 0; // Minimum X position
    const maxX = 450; // Maximum X position

    let direction = 1; // 1 for right, -1 for left

    // Update the fish's position
    function updateFishPosition() {
        fish.style.left = `${fishX}px`;
        fish.style.top = `${fishY}px`;
    }

    // Function to make the fish move side to side and within height range
    function swim() {
        // Move fish side to side
        fishX += speed * direction;
        
        // Check for boundary collision on the X axis
        if (fishX <= minX || fishX >= maxX) {
            direction *= -1; // Reverse direction when hitting boundary
            fish.style.transform = 'scaleX(-1)'
        }

        // Simulate natural swimming up and down within height range
        if (fishY <= minHeight || fishY >= maxHeight) {
            direction *= -1; // Change direction vertically at boundaries
        }
        
        // Move the fish vertically in a random natural way
        fishY += Math.random() > 0.5 ? 1 : -1; // Random slight vertical movement

        updateFishPosition();
    }

    // Start the swimming loop
    setInterval(swim, 50); // Update every 50ms for smooth swimming

    updateFishPosition(); // Initialize fish position
});
