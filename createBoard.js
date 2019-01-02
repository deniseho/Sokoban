"use strict";
// Create Board
function createBoard(num) {
    var selectedLevel;

    if (num == levels.length || num == undefined) {
        selectedLevel = levels[0];
    } else {
        selectedLevel = levels[num];
    }

    var boardHeight = selectedLevel.length;
    var boardWidth = selectedLevel[0].length;

    var walls = [];
    var player = [];
    var boxes = [];
    var goals = [];

    for (var i = 0; i < boardWidth; i++) {
        for (var j = 0; j < boardHeight; j++) {
            var elem = selectedLevel[j][i];
            if (elem == "#") {
                walls.push({x: i, y: j});
            } else if (elem == "@") {
                player.push({x: i, y: j});
            } else if (elem == "$") {
                boxes.push({x: i, y: j});
            } else if (elem == ".") {
                goals.push({x: i, y: j});
            } else if (elem == "+") {
                goals.push({x: i, y: j});
                player.push({x: i, y: j});
            }
        }
    }

    var level = {
        gameboard: {
            width: boardWidth,
            height: boardHeight
        },
        player: player,
        walls: walls,
        goals: goals,
        boxes: boxes,
        levelNum: num,
        steps: 0
    };

    document
        .getElementById("Playground")
        .innerHTML = createBoardGrid(boardWidth, boardHeight);

    // create board grid
    function createBoardGrid(width, height) {
        var output = "";
        for (var i = 0; i < height; i++) {
            output += "<div class='boardRow'>";
            for (var j = 0; j < width; j++) {
                if (i % 2 === 0) {
                    output += "<div class='boardCell'></div>";
                } else {
                    output += "<div class='boardCell'></div>";
                }
            }
            output += "</div>";
        }
        return output;
    }

    return level;
}
