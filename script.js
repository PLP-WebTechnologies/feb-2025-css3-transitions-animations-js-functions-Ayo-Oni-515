const data = {
    gameStatus: "", //Updates to Correct Guess or Wrong Guess or nil for a new game
    gameScore: 0, // Increments on correct guesses only
    // newGame: false // Determines the state of the game
};


// Predefined colors
const colors = [
    "#ff4821", //red
    "#ff9721", //orange
    "#fff821", //yellow
    "#3aff21", //green
    "#2189ff", //blue
    "#a521ff", //indigo
    "#fb21ff", //violet
    "#51fcff" //teal
];


// Guess display message
const correctGuess = "Correct Guess";
const wrongGuess = "Wrong Guess";


let colorBox = document.getElementById("color-box");

let colorButton = [
    document.getElementById("color-button-1"),
    document.getElementById("color-button-2"),
    document.getElementById("color-button-3"),
    document.getElementById("color-button-4"),
    document.getElementById("color-button-5"),
    document.getElementById("color-button-6")
]


let stat = document.getElementById("status");
let score = document.getElementById("score");
let newgame = document.getElementById("newgame");


function shuffle(iterable) {
    return iterable.sort(() => Math.random() - 0.5);
}

function generateColorBox() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    let bgColor = colors[randomIndex];
    colorBox.style.backgroundColor = bgColor;
    return bgColor
}


function generateColorButton() {
    let randomColor = generateColorBox();

    let randomIndex = Math.floor(Math.random() * colorButton.length);
    colorButton[randomIndex].style.backgroundColor = randomColor;

    let colorsCopy = shuffle(([...colors]).filter(item => item !== randomColor));
    let colorButtonCopy = shuffle(([...colorButton]).filter(item => item !== colorButton[randomIndex]));;

    for (let i = 0; i < colorButtonCopy.length; i++) {
        colorButtonCopy[i].style.backgroundColor = colorsCopy[i];
    }
}


function updateGameStatus(message) {
    data.gameStatus = message;

    if (message === wrongGuess) {
        stat.style.color = "red";
        stat.classList.add("fade-out");

        stat.textContent = data.gameStatus;    

        stat.addEventListener('animationend', () => {
            stat.classList.remove("fade-out");
        }, { once: true });  
    } else if (message === correctGuess) {
        stat.style.color = "green";
        stat.classList.add("celebration");
        
        stat.textContent = data.gameStatus;
        
        stat.addEventListener('animationend', () => {
            stat.classList.remove("celebration");
        }, { once: true }); 
    }
}


function updateGameScore() {
    data.gameScore += 1;
    score.textContent = data.gameScore;
}


function newGame() {
    data.gameStatus = "nil";
    stat.textContent = data.gameStatus;
    data.gameScore = 0;
    score.textContent = data.gameScore;
    stat.style.color = "black";
    // data.newGame = true
    // generateColorBox();
}


function pickColor(selectedColor) {
    if (selectedColor === colorBox.style.backgroundColor) {
        // if player selects a valid color
        updateGameStatus(correctGuess);
        updateGameScore();
        generateColorButton();        
    }
    else {
        // if player selects an invalid color
        updateGameStatus(wrongGuess);
    }
    // console.log('test');
}


// main event handlers
generateColorButton();

colorButton.forEach((colouredButton) => {
    colouredButton.addEventListener ("click", () => {
        selectedColor = colouredButton.style.backgroundColor
        pickColor(selectedColor);
    })
})

newgame.addEventListener("click", () => {
    newGame();
    generateColorButton();
});
