//import * as fs from 'fs'

//import { getLevel } from "./getLevel.js";

import { levelArray } from "./getLevel.js"


let x = 13;
let y = 13;
let board = [];

let player = {
    x: 0,
    y: 0,
    moves: 0, // May add as part of scoreboard
    time: 0,
    won: false, // If true, stop the game, make something pop up either going to next level or restarting the maze
    level: 1 // starting level
}

// Backend either have text file of mazes or stored as 2d array to save processing time
// Store minimum moves required to run checker;  

let minMove = 3; // one less than winning move, different for all boards

let speed = 10; // speed of animation

let doneMove = true; // important for one move at a time

let firstMove = true; //variable for stopwatch

let stopWatch; // same

$(function () {
    loadGame();
})

export async function loadGame() {
    const $root = $('#root')
    $root.append(levelBuild(player.level))


    $(document).keydown(async function (e) {
        switch (e.keyCode) { // move to seperate function and make it return something
            case 39:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        await move('right');
                    }
                }

                break;
            case 38:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        await move('up');
                    }
                }
                break;
            case 37:
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        await move('left');
                    }
                }
                break;
            case 40:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        await move('down');
                    }
                }
                break;

            case 78: // Press N to go to next level
                console.log('nextLevel')
                player.level += 1; // Go to Next Level
                player.won = false;
                player.time = 0;
                stopWatch = 0;
                firstMove = true;
                console.log(player.level)
                $('#board').replaceWith(levelBuild(player.level)) //temp 

                break;
        }
    })

}

export const levelBuild = function (number) {
    number -= 1;

    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('id', 'board')

    let levelTable = document.createElement('table');
    tableDiv.append(levelTable);

    //let level = getLevel();
    let count = 0;

    board = JSON.parse(JSON.stringify(levelArray[number]))
    for (let i = 0; i < y; i++) {

        let row = document.createElement('tr');
        row.setAttribute('class', i)
        for (let j = 0; j < x; j++) {
            let rowFiller = document.createElement('td');
            rowFiller.setAttribute('class', j)

            if (board[i][j] == 0) {
                rowFiller.setAttribute('style', 'background-color: gray');
            } else if (board[i][j] == 1) {
                rowFiller.setAttribute('style', 'background-color: white');
            } else if (board[i][j] == 2) {
                //Player
                rowFiller.setAttribute('class', j + ' filled');
            }

            if (board[i][j] == 2) {
                player.y = i;
                player.x = j;
                rowFiller.setAttribute('id', 'player')
            }

            row.append(rowFiller);

            //count++;
        }
        tableDiv.append(row);
        //count += 2;
    }
    return tableDiv;
}

export async function move(dirction) {
    let findY;
    let findX;

    if (dirction == 'right') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y][player.x + 1] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker()
                    if (player.won) {
                        console.log('Won')
                        stopWatch = Date.now() - stopWatch;
                        player.time = stopWatch / 1000;
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.x += 1;
            }
            $(findY).find(findX).attr('id', 'player')

        }, speed)
    } else if (dirction == 'up') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y - 1][player.x] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker()
                    if (player.won) {
                        console.log('Won')
                        stopWatch = Date.now() - stopWatch;
                        player.time = stopWatch / 1000;
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.y -= 1;
            }
            $(findY).find(findX).attr('id', 'player')
        }, speed)
    } else if (dirction == 'left') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y][player.x - 1] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker()
                    if (player.won) {
                        console.log('Won')
                        stopWatch = Date.now() - stopWatch;
                        player.time = stopWatch / 1000;
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.x -= 1;
            }
            $(findY).find(findX).attr('id', 'player')
        }, speed)
    } else if (dirction == 'down') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y + 1][player.x] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                //$(findY).find(findX).attr('class', player.x + ' filled')

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker();
                    if (player.won) {
                        console.log('Won')
                        stopWatch = Date.now() - stopWatch;
                        player.time = stopWatch / 1000;
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.y += 1;
            }
            $(findY).find(findX).attr('id', 'player')
        }, speed)
    }
}

export const boardChecker = function () {
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (board[i][j] == 1) {
                return player.won = false;

            }
        }
    }
    return player.won = true;
}
