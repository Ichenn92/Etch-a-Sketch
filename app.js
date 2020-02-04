//------------------------------------------------
const gridGame_div = document.getElementById("grid-game");
const start_button = document.getElementById("start");
const resolution_button = document.getElementById("resolution");
const randomResolution_button = document.getElementById("random-resolution");
const clear_button = document.getElementById("clear");
const colors_button = document.getElementById("colors");
const controller_div = document.getElementsByClassName("controller");
//------------------------------------------------
const ColorBaseChoice = ["black", "grey", "random"];
let colorNumber = 0;
let colorUser = ColorBaseChoice[colorNumber];
let intervalTimer;
//------------------------------------------------
var mouseDown = 0;
document.body.onmousedown = function() { 
    mouseDown = 1;
}
document.body.onmouseup = function() {
    mouseDown = 0;
}

//------------------------------------------------
function resolution(resolution) {
    let last_div = gridGame_div.lastElementChild;
    while (last_div){
        gridGame_div.removeChild(last_div);
        last_div = gridGame_div.lastElementChild;
    }

    gridGame_div.style.gridTemplateColumns = "repeat("+resolution+", 1fr)";

    for (i = 0; i < resolution; i++){
        for ( j = 0; j < resolution; j++){
            var cell = document.createElement('div');
            gridGame_div.appendChild(cell);
        }
    }
    addEventToChild();
}

//------------------------------------------------
function changeColorVariable() {
    clearInterval(intervalTimer);
    colorUser=ColorBaseChoice[++colorNumber % 3 ];
    if (colorNumber == 0 || colorNumber == 1){
        colors_button.style.backgroundColor = colorUser;
    }
    else {
        getRandomColor();
        colorNumber = -1;
    }
}

//------------------------------------------------
function getRandomColor () {
    intervalTimer = setInterval ( function () {
        console.log("random color on");
        var letters = '0123456789ABCDEF';
        var colorRandom = '#';
        for (var i = 0; i < 6; i++) {
            colorRandom += letters[Math.floor(Math.random() * 16)];
        }
        colors_button.style.backgroundColor = colorRandom;
        colorUser = colorRandom;
    }, 300);
}

//------------------------------------------------
function getRandomNumber () {
    return Math.floor(Math.random() * 20);
}

//------------------------------------------------
function start () {
    controller_div[0].style.display = '';
    start_button.style.display = "none";
    addEventToChild();
}

//------------------------------------------------
function addEventToChild () {
    let nodes = gridGame_div.childNodes;
    for (i = 0 ; i < nodes.length ; i++) {
        nodes[i].addEventListener('mouseout', function() {
            if (mouseDown == 1){
                changeColor(this);
            }
        })
        nodes[i].addEventListener('click', function() {
            changeColor(this);
        })
    }
}

//------------------------------------------------
function changeColor(node) {
    if(node.style.backgroundColor == colorUser) {
        node.style.backgroundColor = "";
    }
    else {
        node.style.backgroundColor = colorUser;
    }
}

//------------------------------------------------
function clear() {
    let nodes = gridGame_div.childNodes;
    for (i = 0 ; i < nodes.length ; i++) {
        nodes[i].style.backgroundColor = "";
    }
}

function getResolution() {
    return prompt("What the size of the grid you want ?", 16);
    
}

//------------------------------------------------
function main () {
    start_button.addEventListener("click", function() {
        start();
        resolution(16);
        colors_button.style.backgroundColor = colorUser;
    })
    resolution_button.addEventListener("click", function() {
        resolution( getResolution() );
    })
    randomResolution_button.addEventListener("click", function() {
        resolution( getRandomNumber() );
    })
    clear_button.addEventListener("click", function() {
        clear();
    })
    colors_button.addEventListener("click", function() {
        changeColorVariable();
        colors_button.innerHTML = colorUser;
    })
}

//------------------------------------------------
//  MAIN
//------------------------------------------------
main();