let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy, imgTomoto;
const gridLength = 100;

//initial
$(function(){
    // 0 : available, 1 : Mountain, 2 : Final Stop, 3 : Enemy , 4 : Tomoto
    mapArray = [
        [0, 0, 1, 0, 0, 0, 1, 4],
        [1, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [3, 0, 1, 1, 1, 1, 0, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d"); //可以把canvas想成畫布，getContext可以想成是畫的呈現方式，這邊是2D

    imgMain = new Image();
    imgMain.src = "../images/spriteSheet.png";
    currentImgMain = {
        x:0,
        y:0
    };

    //優化圖片的載入流程指的是在程式碼中更有效地管理圖片載入的方法，以確保在圖片被使用之前已經完全載入，從而避免載入中斷或錯誤。這對於網頁或應用程式的性能和使用者體驗都很重要。
    //1. 預先載入圖片：在程式開始執行之前，預先載入所有需要的圖片。這樣可以確保所有圖片都已經載入完成，並且可以立即使用。
    //2. 等待所有圖片載入完成後再進行後續處理：在所有圖片都載入完成後，再執行後續的程式碼，例如繪製畫布上的圖像。這樣可以確保所有圖片都已經可用，避免出現錯誤或未加載的圖片。
    //3. 使用回調函式處理圖片載入完成事件：在每張圖片載入完成後觸發回調函式，以便通知程式該圖片已經可用。
    //確定圖片跑出來才執行下面
    
    //這段屬於預先載入圖片，這邊每個都設置了 src 屬性，指定了每張圖片的路徑。這樣做的好處是在程式執行時，這些圖片已經開始載入，而不是在需要使用時才開始下載
    imgMountain = new Image();
    imgMountain.src = "../images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "../images/poor.png";
    imgTomoto = new Image();
    imgTomoto.src = "../images/food.png";

    //一樣是預先載入圖片，但還包含了設置回調函數
    //這是一個自定義的函式，用於載入多個圖片。
    //它接受兩個參數，第一個參數是一個對象，其中包含了要載入的圖片的路徑，第二個參數是一個回調函式，當所有圖片載入完成後會調用這個回調函式
    //loadImages 函式內部的操作：
    //創建了一個空對象 images 來保存載入完成的圖片。
    //初始化 loadedImages 變數為 0，用於計數已經載入完成的圖片數量。
    //遍歷傳入的圖片路徑對象 sources，並為每個圖片路徑創建了一個圖片對象。在每個圖片對象的 onload 事件中，對 loadedImages 變數進行加一操作，當所有圖片都載入完成後，調用傳入的回調函式。
    //回調函式：在所有圖片載入完成後，會執行這個回調函式。在這個回調函式中，將載入完成的圖片對象作為參數傳遞給它。然後將這些圖片對象賦值給事先定義的全局變數（例如 imgMain、imgMountain、imgEnemy、imgTomoto）。最後，調用 drawCanvas 函式，進行畫布上的繪製操作
    loadImages({
        imgMain: imgMain.src,
        imgMountain: imgMountain.src,
        
    }, function(images) {
        imgMain = images.imgMain;
        imgMountain = images.imgMountain;
        
        
        drawCanvas();
    });
    imgEnemy.onload = function() {
        ctx.drawImage(imgEnemy, 0, 500, gridLength, gridLength); // 調整敵人的位置
    };
    imgTomoto.onload = function() {
        ctx.drawImage(imgTomoto, 700, 0, gridLength, gridLength);
    };

});

//這段程式碼的功能是預先載入一組圖片，並在所有圖片都載入完成後執行指定的回調函式。
function loadImages(sources, callback) 
{
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

function drawCanvas() {
    for(let x in mapArray){
        for(let y in mapArray[x]){
            if(mapArray[x][y] == 1){                     //x座標         y座標
                ctx.drawImage(imgMountain, 32, 65, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
            }else if(mapArray[x][y] == 3){
                ctx.drawImage(imgEnemy, 7, 40, 104, 135, y*gridLength, x*gridLength, gridLength, gridLength);
            }else if(mapArray[x][y] == 4){
                ctx.drawImage(imgTomoto, 65, 65, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
            }
        }
    }
}

//Click Event
//使用者按下按鍵
$(document).on("keydown", function(event) {
    console.log(event.code);
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        x: -1,
        y: -1
    };
    targetBlock = {
        x: -1,
        y: -1
    };
    event.preventDefault();
    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if (targetImg.x <= 700 && targetImg.x >= 0 && targetImg.y <= 500 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1; // Abnormal value for out-of-bounds
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0: // Empty tile
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: // Mountain
                $("#talkBox").text("有障礙");
                break;
            case 2: // Final Stop
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: // Enemy
                $("#talkBox").text("分發食物");
                break;
            case 4: // Tomato
                $("#talkBox").text("拿取糧食物資!");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;

                // Clear the tomato from the canvas
                ctx.clearRect(targetImg.x, targetImg.y, gridLength, gridLength);

                // Update mapArray to turn the tomato tile into an empty tile
                mapArray[targetBlock.x][targetBlock.y] = 0;
                break;
        }
    } else {
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(
        imgMain,
        cutImagePositionX,
        0,
        80,
        130,
        currentImgMain.x,
        currentImgMain.y,
        gridLength,
        gridLength
    );
});
