window.addEventListener("load", function () {
    const box = document.getElementById('box1');
    const hook = document.getElementById('hook');
    const boat = document.getElementById('boat');
    if (!window.score) window.score = 0; // Initialize global score if it doesn't exist

    const minX = 0;
    const maxX = 450;
    const surfaceHeight = boat.offsetTop + boat.offsetHeight;

    let boxX = Math.random() * (maxX - minX) + minX;
    let boxY = 430 - Math.random() * 10;
    let isHooked = false;

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
            isHooked = true;
        }
    }

    function moveBoxWithHook() {
        if (isHooked) {
            boxX = hook.offsetLeft + hook.offsetWidth / 2 - box.offsetWidth / 2;
            boxY = hook.offsetTop + hook.offsetHeight;

            if (boxY <= surfaceHeight) {
                box.style.display = "none";
                isHooked = false;
                window.score += 20; // Update global score
                updateScoreDisplay(); // Update score display
            }
        }

        updateBoxPosition();
    }

    function updateScoreDisplay() {
        let scoreDisplay = document.getElementById('score');
        if (!scoreDisplay) {
            scoreDisplay = document.createElement('div');
            scoreDisplay.id = 'score';
            scoreDisplay.style.position = 'absolute';
            scoreDisplay.style.top = '10px';
            scoreDisplay.style.right = '10px';
            scoreDisplay.style.fontSize = '24px';
            scoreDisplay.style.color = 'white';
            document.body.appendChild(scoreDisplay);
        }
        scoreDisplay.innerText = `Score: ${window.score}`;
    }

    updateBoxPosition();
    updateScoreDisplay();

    setInterval(() => {
        if (!isHooked) checkCollision();
        moveBoxWithHook();
    }, 20);
});
