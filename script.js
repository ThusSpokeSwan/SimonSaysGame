let body = document.querySelector('body');
let level = document.querySelector('h3');
let space = document.querySelector('.space');
let boxes = document.querySelectorAll('.box');
let help = document.querySelector('.help');
let rule = document.querySelector('.rules');

let started = false; // Game has not started
let memArr = [];  // Memory Array storing the order of the boxes to be clicked
let playerArr = []; // Player Array storing the order of the boxes clicked by the player
let levelNum = 0;

let num = 0;
let clicks = 0;
let score = 0;

// Function for storing the id of the box clicked by the player 
// and checking if it matches the id of the box clicked by the computer by calling the checker function
space.addEventListener('click',(event) => {
    if(started){
        if(event.target.className == 'box'){
            userFlash(event.target);
            clicks++;
            playerArr.push(event.target.id);
            checker();
        }
    }
});

// Function for flashing the box clicked by the player for a short duration
function userFlash(box){
    box.classList.add('userFlash');
    setTimeout(() => {
        box.classList.remove('userFlash');
    }, 200);
}

// Function for checking if the box clicked by the player matches the box clicked by the computer
// If it does not match, the game is over and the player is prompted to restart the game
// If it matches, the player is prompted to click the next box in the sequence
function checker(){
    if(playerArr[clicks - 1] != memArr[clicks - 1]){
        level.innerText = `Game Over! Your score is: ${score}. Press any key to restart`;
        started = false;
        playerArr = [];
        memArr = [];
        clicks = 0;
        num = 0;
        body.classList.add('gameOver');
        setTimeout(() => {
            body.classList.remove('gameOver');
        }, 300);
        levelNum = 1;
    }
    else {
        num++;}
        if(num == memArr.length && num != 0){
            score += 10;
            playerArr = [];
            clicks = 0;
            num = 0;
            setTimeout(selectBox,400)
        }
    }

    // Function for starting the game when any key is pressed
    body.addEventListener('keydown',() => {
        if(started == false){
            started = true;
            selectBox();
        }
    })

    // Function for starting the game when the screen is touched
    body.addEventListener('touchstart',() => {
        if(started == false){
            started = true;
            selectBox();
        }
    })

// Function for selecting a random box and calling the flashRand function
// The id of the box is stored in the memory array
// The level is incremented
function selectBox(){
    level.innerText = `Level: ${levelNum}`;
    levelNum++;
    let random = Math.floor(Math.random() * 4);
    flashRand(random);
    memArr.push(boxes[random].id);
}

// Function for flashing the box selected by the computer for a short duration
function flashRand(random){
    boxes[random].classList.add('memFlash');
    setTimeout(() => {
        boxes[random].classList.remove('memFlash');
    }, 250);
}

// Function for displaying the memory array when the help button is clicked
help.addEventListener('click',() => {
    let initText = level.innerText;
    level.innerText = `Memory Array is : ${memArr}`;
    setTimeout(() => {
        level.innerText = initText;
    }, 2000);
});

// Function for displaying the rules when the rules button is clicked
rule.addEventListener('click', () => {
    let initText = level.innerText;
    level.innerText = "Click the boxes in the same sequence they were flashed, each new flash adds to the sequence. Good Luck!";
    setTimeout(() => {
        level.innerText = initText;
    }, 2500);
});