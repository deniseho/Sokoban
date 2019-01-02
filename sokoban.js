"use strict";

// update board content
function update(self) {
    //init
    for (var i = 0; i < self.gameboard.height; i++) {
        for (var j = 0; j < self.gameboard.width; j++) {
            document.getElementsByClassName("boardRow")[i].childNodes[j].className = "boardCell";
        }
    }

    //update elem classes
    draw(self.player, "player");
    draw(self.goals, "goals");
    draw(self.walls, "walls");
    draw(self.boxes, "boxes");

    function draw(item, className) {
        for (var i = 0; i < item.length; i++) {
            var x = item[i].x;
            var y = item[i].y;
            document
                .getElementsByClassName("boardRow")[y]
                .childNodes[x]
                .classList
                .add(className);
        }
    }

    document
        .getElementById("Steps")
        .innerHTML = self.steps;
}

var Sokoban = function (level) {
    var self = {
        gameboard: level.gameboard,
        player: level.player,
        walls: level.walls,
        goals: level.goals,
        boxes: level.boxes,
        levelNum: level.levelNum,
        steps: level.steps,

        isNextMoveFloor: function (player, dir) {
            var px = player.x + dir.x,
                py = player.y + dir.y;

            for (var i = 0; i < self.walls.length; i++) {
                if (px == self.walls[i].x && py == self.walls[i].y) 
                    return false;
                }
            
            for (var i = 0; i < self.goals.length; i++) {
                if (px == self.goals[i].x && py == self.goals[i].y) 
                    return false;
                }
            
            for (var i = 0; i < self.boxes.length; i++) {
                if (px == self.boxes[i].x && py == self.boxes[i].y) 
                    return false;
                }
            
            return true;
        },

        isNextMoveWalls: function (player, dir) {
            var px = player.x + dir.x;
            var py = player.y + dir.y;

            for (var i = 0; i < self.walls.length; i++) {
                if (px == self.walls[i].x && py == self.walls[i].y) {
                    return {x: px, y: py, i: i};
                }
            }
            return false;
        },

        isNextMoveGoal: function (player, dir) {
            var px = player.x + dir.x;
            var py = player.y + dir.y;

            for (var i = 0; i < self.goals.length; i++) {
                if (px == self.goals[i].x && py == self.goals[i].y) {
                    return {x: px, y: py, i: i};
                }
            }
            return false;
        },

        isNextMoveBox: function (player, dir) {
            var px = player.x + dir.x;
            var py = player.y + dir.y;

            for (var i = 0; i < self.boxes.length; i++) {
                if (px == self.boxes[i].x && py == self.boxes[i].y) {
                    return {x: px, y: py, i: i};
                }
            }
            return false;
        },

        movePlayer: function (e) {
            var moveDirection = {
                x: 0,
                y: 0
            };

            //e.keyCode: left 37, right 39, up 38, down 40
            if (e.keyCode >= 37 && e.keyCode <= 40) {
                if (e.keyCode % 2 == 1) {
                    moveDirection.x = e.keyCode - 38;
                } else {
                    moveDirection.y = e.keyCode - 39;
                }

                var isNextMoveFloor = self.isNextMoveFloor(self.player[0], moveDirection);
                var isNextMoveGoal = self.isNextMoveGoal(self.player[0], moveDirection);
                var isNextMoveBox = self.isNextMoveBox(self.player[0], moveDirection);

                if (isNextMoveFloor) {
                    self.player[0].x += moveDirection.x;
                    self.player[0].y += moveDirection.y;
                    self.steps++;
                }

                if (isNextMoveGoal && !isNextMoveBox) {
                    self.player[0].x += moveDirection.x;
                    self.player[0].y += moveDirection.y;
                    self.steps++;
                }

                if (isNextMoveBox) {
                    if (self.isNextMoveFloor(isNextMoveBox, moveDirection)) {
                        var i = isNextMoveBox.i;

                        if (!self.isNextMoveWalls(self.boxes[i], moveDirection)) {
                            self.player[0].x += moveDirection.x;
                            self.player[0].y += moveDirection.y;
                            self.boxes[i].x += moveDirection.x;
                            self.boxes[i].y += moveDirection.y;
                            self.steps++;
                        }
                    }

                    if (self.isNextMoveGoal(isNextMoveBox, moveDirection)) {
                        var i = isNextMoveBox.i;
                        self.player[0].x += moveDirection.x;
                        self.player[0].y += moveDirection.y;
                        self.boxes[i].x += moveDirection.x;
                        self.boxes[i].y += moveDirection.y;
                        self.steps++;
                        self.checkVictory();
                    }
                }

                update(self);
            }
        },

        checkVictory: function () {
            var allMatched = true;
            for (var j = 0; j < self.goals.length; j++) {
                var match = false;
                for (var i = 0; i < self.boxes.length; i++) {
                    if (self.goals[j].x == self.boxes[i].x && self.goals[j].y == self.boxes[i].y) {
                        match = true;
                    }
                }
                allMatched = allMatched && match;
            }

            if (allMatched) {
                $("#VictoryModal").modal();

                // check if there is next level
                var isNext = self.levelNum == levels.length - 1;

                document
                    .getElementById("NextLevel")
                    .innerHTML = isNext
                    ? "Start over"
                    : "Next level";

                document
                    .getElementById("NextLevel")
                    .addEventListener("click", function () {
                        self.levelNum = isNext
                            ? 0
                            : self.levelNum + 1;

                        new Sokoban(createBoard(self.levelNum));

                        $("#VictoryModal").modal("hide");

                        document
                            .getElementById("CurrLevel")
                            .innerHTML = self.levelNum + 1;
                    })
            }
        }
    }

    document.addEventListener("keydown", function (e) {
        self.movePlayer(e);
    });

    update(self);
}

// Load event
window
    .addEventListener("load", function () {
        var levelNum = 0;
        new Sokoban(createBoard(levelNum));
        selectLevel(levelNum);
    });
