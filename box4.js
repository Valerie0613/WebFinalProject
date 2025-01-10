window.addEventListener("load", function () {
    const box = document.getElementById('box4');
    const hook = document.getElementById('hook');
    const boat = document.getElementById('boat');

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
                window.score = (window.score || 0) + 20;
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
