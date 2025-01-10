window.addEventListener("load", function() {
 
    function updateDetectorPosition() {
        const boatRect = boat.getBoundingClientRect();
        const detectorWidth = 10; // 10px wide detector

        // Place the detector at the center of the boat
        const x = boat.offsetLeft + boat.offsetWidth / 2;
        const y = 10;

        // Set the detector's new position
        detector.style.left = `${x}px`;
        detector.style.top = `${y}px`; 

        // Show the detector for visibility
        detector.style.display = 'block';

        // Get the bounding rectangles
        
        // Check for collision
        if (
            fishRect.left < detectorRect.right &&
            fishRect.right > detectorRect.left &&
            fishRect.top < detectorRect.bottom &&
            fishRect.bottom > detectorRect.top
        ) {
            collisionStatus.textContent = "Collision detected!";
            collisionStatus.style.color = 'red';
        } else {
            collisionStatus.textContent = "No collision.";
            collisionStatus.style.color = 'green';
        }
    }

    // Update the detector's position every 16ms (60 FPS)
    setInterval(updateDetectorPosition, 16);
});
