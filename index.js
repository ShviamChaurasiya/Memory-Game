$(document).ready(function () {
  let nextTile;
  let tileOrder = [];
  let userSequence = [];
  let level = 0;

  function generateNext() {
    nextTile = Math.floor(Math.random() * 4) + 1;
    tileOrder.push(nextTile);
  }

  function playSound(color) {
    const sounds = {
      1: "./assets/sound/red.mp3",
      2: "./assets/sound/green.mp3",
      3: "./assets/sound/blue.mp3",
      4: "./assets/sound/yellow.mp3",
    };
    const audio = new Audio(sounds[color]);
    audio.play();
  }

  function displaySequence() {
    let i = 0;
    const interval = setInterval(function () {
      if (i >= tileOrder.length) {
        clearInterval(interval);
        return;
      }
      const tile = tileOrder[i];
      switch (tile) {
        case 1:
          $(".top").addClass("activate");
          playSound(1);
          setTimeout(() => $(".top").removeClass("activate"), 1000);
          break;
        case 2:
          $(".left").addClass("activate");
          playSound(2);
          setTimeout(() => $(".left").removeClass("activate"), 1000);
          break;
        case 3:
          $(".right").addClass("activate");
          playSound(3);
          setTimeout(() => $(".right").removeClass("activate"), 1000);
          break;
        case 4:
          $(".bottom").addClass("activate");
          playSound(4);
          setTimeout(() => $(".bottom").removeClass("activate"), 1000);
          break;
      }
      i++;
    }, 1500);
  }

  function levelUpdate() {
    $(".controller").text("Level " + level);
  }

  function gameEnd() {
    alert("Game Over! You reached Level " + level);
    level = 0;
    tileOrder = [];
    userSequence = [];
    $(".controller").text("Start Game");
  }

  function checkOrder() {
    if (userSequence.length !== tileOrder.length) {
      return;
    }
    if (userSequence.every((val, index) => val === tileOrder[index])) {
      level++;
      userSequence = [];
      levelUpdate();
      setTimeout(function () {
        generateNext();
        displaySequence();
      }, 1000);
    } else {
      gameEnd();
    }
  }

  $(".btn").on("click", function () {
    const classList = $(this).attr("class").split(/\s+/);
    if (classList.includes("top")) {
      userSequence.push(1);
    } else if (classList.includes("left")) {
      userSequence.push(2);
    } else if (classList.includes("right")) {
      userSequence.push(3);
    } else if (classList.includes("bottom")) {
      userSequence.push(4);
    }
    playSound(userSequence[userSequence.length - 1]);
    checkOrder();
  });

  $(".controller").on("click", function () {
    if (level === 0) {
      level++;
      levelUpdate();
      generateNext();
      displaySequence();
    }
  });
});
