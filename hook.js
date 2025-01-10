window.addEventListener("load", function () {
    const hook = document.getElementById("hook");
    const boat = document.getElementById("boat");

    let hookX = boat.offsetLeft + boat.offsetWidth / 2; // Initially at the boat's center
    let hookY = boat.offsetTop + 50  ; // Just below the boat
    let isMovingDown = false; // Initially not moving down
    const hookSpeed = 5; // Speed at which the hook moves
    const maxLength = 300; // Maximum hook length (distance from boat)
    const returnSpeed = 3; // Speed at which the hook returns to the boat

    // Global variable to track hook motion, shared with boat.js
    window.isHookInMotion = false; // Starts with the hook not in motion

    function updateHookPosition() {
        // Align hook X position with the boat's center
        hookX = boat.offsetLeft + boat.offsetWidth / 2 - hook.offsetWidth / 2;
        
        // Update the hook's CSS position
        hook.style.left = `${hookX}px`;
        hook.style.top = `${hookY+95}px`; // Adjust vertical position
    }

    function moveHook() {
        if (isMovingDown) {
            if (hookY < boat.offsetTop + maxLength) {
                hookY += hookSpeed; // Move down
                hook.style.visibility = 'visible'; // Or 'display: none' to remove it completely
            } else {
                isMovingDown = false; // Start returning the hook
            }
        } else {
            if (hookY > boat.offsetTop +50 ) {
                hookY -= returnSpeed; // Move up
            } else {
                window.isHookInMotion = false; // Hook has returned, allow boat movement
                hook.style.visibility = 'hidden'; // Or 'display: none' to remove it completely
            }
        }

        updateHookPosition();
    }
    // Cast the hook when "S" key is pressed
    document.addEventListener("keydown", function (event) {
        if (event.key === "s" && !window.isHookInMotion) {
            isMovingDown = true;
            window.isHookInMotion = true; // Mark hook as in motion
        }
    });
    setInterval(updateHookPosition, 20); // Update every 20ms
    setInterval(moveHook, 20); // Update hook movement every 20ms
});
