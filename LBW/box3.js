window.addEventListener("load", function () {
    const box = document.getElementById('box3');
    const hook = document.getElementById('hook');
    const boat = document.getElementById('boat');

    const minX = 0; // Minimum X position for box
    const maxX = 450; // Maximum X position for box
    const surfaceHeight = boat.offsetTop + boat.offsetHeight; // Height at which the box disappears (the surface)

    let boxX = Math.random() * (maxX - minX) + minX; // Random initial X position
    let boxY = 430 - Math.random() * 10; // Initial Y position for box
    let isHooked = false; // Box is initially not hooked

    function updateBoxPosition() {
        box.style.left = `${boxX}px`;
        box.style.top = `${boxY}px`;
    }

    function checkCollision() {
        const hookRect = hook.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();

        if (
            hookRect.left < boxRect.right &&
            hookRect.right > boxRect.left &&
            hookRect.top < boxRect.bottom &&
            hookRect.bottom > boxRect.top
        ) {
            isHooked = true; // Box is now hooked
        }
    }

    function moveBoxWithHook() {
        if (isHooked) {
            boxX = hook.offsetLeft + hook.offsetWidth / 2 - box.offsetWidth / 2; // Match hook's X position
            boxY = hook.offsetTop + hook.offsetHeight; // Match hook's Y position

            if (boxY <= surfaceHeight) {
                box.style.display = "none"; // Make the box invisible
                isHooked = false; // Unhook the box
                window.score = (window.score || 0) + 20; // Update global score
                updateScore();
            }
        }
        updateBoxPosition();
    }

    function updateScore() {
        const scoreDisplay = document.getElementById('score');
        scoreDisplay.innerText = `Score: ${window.score}`;
    }

    updateBoxPosition();

    setInterval(() => {
        if (!isHooked) checkCollision();
        moveBoxWithHook();
    }, 20);
});
