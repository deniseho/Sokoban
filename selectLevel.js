"use strict";

// select level
function selectLevel() {
  var levelNum = 0;

  // select level
  var levelSelect = document.getElementById("LevelSelect");
  for (var i = 0; i < levels.length; i++) {
      var option = document.createElement("option");
      option.text = "Level " + (i + 1);
      option.value = i;
      levelSelect.add(option);
  }

  levelSelect
      .addEventListener("change", function () {
          levelNum = document
              .getElementById("LevelSelect")
              .value;
      })

  // click select level button events
  document
      .getElementById("SelectLevel")
      .addEventListener("click", function () {
          new Sokoban(createBoard(levelNum));
          $("#LevelSelectModal").modal("hide");

          document
              .getElementById("CurrLevel")
              .innerHTML = parseInt(levelNum) + 1;
      })

  // show current level
  document
      .getElementById("CurrLevel")
      .innerHTML = levelNum + 1;

  // play again
  document
      .getElementById("PlayAgain")
      .addEventListener("click", function () {
          new Sokoban(createBoard(levelNum));
      })
}