const buttons = document.querySelectorAll('.btn');
const blueSound = document.getElementById('blue-sound');
const redSound = document.getElementById('red-sound');
const greenSound = document.getElementById('green-sound');
const yellowSound = document.getElementById('yellow-sound');
const wrongSound = document.getElementById('wrong-sound')
let arrayUserInput =[];
let arrayAutoGenerated =[];
let count=0;

document.addEventListener('keydown', startGame);

//start game by setting count to 1
function startGame() {
  if (count == 0) {
    count += 1;
    currentLevel();
    generatedArray();
  }
}

//set level
function currentLevel() {
  if (count > 0) {
      document.getElementById('level-title').textContent = `Level ${count}`;
  }
}

//creating random array
function getRandomItem(randomArray) {
  const index = Math.floor(Math.random() * randomArray.length);
  return randomArray[index];
}

//array with random color after each level
function generatedArray() {
  if(count > 0) {
      const randomButton = getRandomItem(buttons);
      const randomColor = randomButton.id;
      arrayAutoGenerated.push(randomColor);
      generatedArrayEffects();
  }
}

 // apply effects on last element of the random array
function generatedArrayEffects() {
  const color = arrayAutoGenerated[arrayAutoGenerated.length - 1];
  const button = document.querySelector(`.btn.${color}`);

  if (button) {
    button.classList.add('pressed');

    if (color == 'green') {
      greenSound.play();
    }
    if (color == 'red') {
        redSound.play();
    }
    if (color == 'blue') {
        blueSound.play();
    }
    if (color == 'yellow') {
        yellowSound.play();
    }

    setTimeout(() => {
      button.classList.remove('pressed');
    }, 150);
  }
}

//an array of the color clicked by user
buttons.forEach(button => {
  button.addEventListener('click', function (e) {
    if (count > 0) {
      button.classList.add('pressed');
      let clickedColor;

      if (button.classList.contains('green')) {
        clickedColor = 'green';
        greenSound.play();
      } else if (button.classList.contains('red')) {
        clickedColor = 'red';
        redSound.play();
      } else if (button.classList.contains('yellow')) {
        clickedColor = 'yellow';
        yellowSound.play();
      } else if (button.classList.contains('blue')) {
        clickedColor = 'blue';
        blueSound.play();
      }
      // push colors to the array
      if (clickedColor) {
        arrayUserInput.push(clickedColor);
        compareArrays();
      }
      //bottom effect remove
      setTimeout(() => {
        button.classList.remove('pressed');
      }, 150);
    }
  });
});

function compareArrays() {
  for (let i = 0; i < arrayUserInput.length; i++) {
    // exit the function early
    if (arrayUserInput[i] !== arrayAutoGenerated[i]) {
      restartGame();
      return; 
    }
  }

  //arrays matches -> level is incremented
  if (arrayUserInput.length == arrayAutoGenerated.length) {
    setTimeout(() => {
      count += 1;
      arrayUserInput = [];
      currentLevel();
      generatedArray();
    }, 700);
  }
}

// reset the game after losing
function restartGame() {
  arrayUserInput = [];
  arrayAutoGenerated = [];
  count = 0;
  document.getElementById('level-title').textContent = "Game Over, Press Any Key to Restart";
  wrongSound.play();
  const gameContainer = document.body;
  gameContainer.classList.add('game-over');
  setTimeout(()=>{
    gameContainer.classList.remove('game-over');
  }, 250);
}