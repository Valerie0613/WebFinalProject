// Shared value for game state
let gameState = 1; // Start directly at Level 1
let score = 0; // Initialize score
let clickCount = 0;

const dialogues = {
    1: "Xiao Mei is a highschool student looking to join a club to know more people,would you suggest her to join:\n(1) Static activity club\n(2) Dynamic activities club\n(3) Whatever Xiao Mei has taken interest in at the time.",
    2: "Xiao Mei isn't that far away from getting a job,\nwhat do you think her boss should consider when considering to hire her?\n(1) 'I can save some money with this'\n(2) 'It is good for the company's face'\n(3) Hire her depending on her career skill and the offer she produces.",
    3: "Over the years, Xiao Mei has grown curious about what her future partner would be like.\nWill she be able to find the right one?\nShould they:\n(1) Leave all the house chores to one, while the other focuses on career\n(2) Both do nothing all day and be lazy\n(3) Discuss a balanced schedule of chores and rest that fits well for each other.",
    4: "Congratulations! You have completed the game with a score of: " // Final dialogue with score
};

const stageImages = {
    1: "../images/1000002190.png",
    2: "../images/下載.png",
    3: "../images/專案 (20241129061103).png",
    4: "../images/chain.png" // Image for Level 4
};

function updateDialogue(message) {
    // 將 \n 替換為 <br>
    const formattedMessage = message.replace(/\n/g, '<br>');
    document.getElementById('dialogue-text').innerHTML = formattedMessage;
}

function updateImage(gameState) {
    const stageImageElement = document.getElementById('stage-image');
    
    // Manually set images for each game state (optional)
    if (gameState < 1) {
        stageImageElement.style.visibility = 'hidden';
    }
}


function handleItemClick(item) {
    updateScore(item); // Update the score based on the clicked item
    advanceGameState(); // Advance the game state if conditions are met
    updateGameUI(); // Update the dialogue, image, and score on the UI
}

function updateScore(item) {
    if (gameState === 4) {
        return; // Don't add points once you're in Level 4
    }

    if (item === 'Item 1') {
        score += 0; // No points for Item 1
    } else if (item === 'Item 2') {
        score += 20; // 20 points for Item 2
    } else if (item === 'Item 3') {
        if (gameState === 3) {
            score += 40; // 40 points for Item 3 in Level 3
        } else {
            score += 30; // 30 points for Item 3 in other levels
        }
    }
}

function advanceGameState() {
    // Only advance if we are not at the last level (level 4)
    if (gameState < 4) {
        gameState++;
    }
}

function updateGameUI() {
    // Update the dialogue based on the current game state
    if (gameState === 1) {
        updateDialogue(dialogues[gameState]);
    } else if (gameState === 2) {
        updateDialogue(dialogues[gameState]);
    } else if (gameState === 3) {
        updateDialogue(dialogues[gameState]);
    } else if (gameState === 4) {
        updateDialogue(dialogues[gameState] + score); // Show score in the final dialogue
    }

    // Update score display
    document.getElementById('score').textContent = "Score: " + score;

    // Update stage image based on current game state
    updateImage(gameState);
}

function handleClick() {
    gameState = 1; // Reset game state to Level 1
    score = 0; // Reset score
    updateGameUI(); // Update the dialogue, image, and score to initial state
}


// Initialize game state
updateDialogue(dialogues[gameState]);
updateImage(gameState);

// Event listeners for items and button
document.getElementById('item1').addEventListener('click', () => handleItemClick('Item 1'));
document.getElementById('item2').addEventListener('click', () => handleItemClick('Item 2'));
document.getElementById('item3').addEventListener('click', () => handleItemClick('Item 3'));
document.getElementById('resetButton').addEventListener('click', handleClick);
