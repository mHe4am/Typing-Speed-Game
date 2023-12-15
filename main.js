// Words array
const words = [
  "Cat",
  "Dog",
  "Red",
  "Car",
  "Happy",
  "Flower",
  "Pencil",
  "Orange",
  "Window",
  "Music",
  "Water",
  "School",
  "Friend",
  "Phone",
  "Amazing",
  "Beautiful",
  "Challenge",
  "Delicious",
  "Elephant",
  "Furniture",
  "Giraffe",
  "Happiness",
  "Island",
  "Jewelry",
];

// Setting levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Default level
let defaultLvl = "Normal";
let defaultLvlSeconds = lvls[defaultLvl];

// Selectors
let container = document.querySelector(".container");
let lvlSpan = document.querySelector(".game-info .lvl");
let secondsSpan = document.querySelector(".game-info .seconds");
let startBtn = document.querySelector(".start");
let currentWord = document.querySelector(".the-word");
let inputField = document.querySelector("input");
let upcomingWords = document.querySelector(".upcoming-words");
let upcomingSpans = document.querySelectorAll(".upcoming-words span");
let timeLeft = document.querySelector(".statistics .time-left span");
let currentScore = document.querySelector(".statistics .score .current");
let totalScore = document.querySelector(".statistics .score .total");

// Setting => level name + seconds + score
lvlSpan.innerHTML = defaultLvl;
secondsSpan.innerHTML = defaultLvlSeconds;
timeLeft.innerHTML = defaultLvlSeconds;
totalScore.innerHTML = words.length;

// Disable paste event
inputField.onpaste = () => false;

// Start game
startBtn.onclick = function () {
  this.remove();
  inputField.focus();

  genWords();
};

function genWords() {
  currentWord.style.display = "block";

  // Get random word
  let randomWordIndex = Math.floor(Math.random() * words.length);
  let randomWord = words[randomWordIndex];
  currentWord.innerHTML = randomWord;
  words.splice(randomWordIndex, 1); // Remove selected word

  // Add upcoming words
  upcomingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(words[i]));

    upcomingWords.appendChild(span);
  }

  startPlay();
}

let starterLen = words.length;

function startPlay() {
  // Add more three seconds (+3) for the first word
  if (words.length == starterLen - 1) {
    timeLeft.innerHTML = defaultLvlSeconds + 3;
  } else {
    timeLeft.innerHTML = defaultLvlSeconds;
  }

  // Remove upcoming words when it runs out of words
  if (words.length <= 0) {
    upcomingWords.remove();
  }

  let start = setInterval(() => {
    timeLeft.innerHTML--;

    if (timeLeft.innerHTML <= 0) {
      clearInterval(start);
      if (
        inputField.value.toLowerCase() == currentWord.innerHTML.toLowerCase()
      ) {
        inputField.value = "";
        currentScore.innerHTML++;

        if (words.length <= 0) {
          let span = document.createElement("span");
          span.appendChild(document.createTextNode("Congratulations!"));
          span.className = "win";

          let mainDiv = document.createElement("div");
          mainDiv.className = "finish main-sec";
          mainDiv.appendChild(span);
          container.appendChild(mainDiv);
        } else {
          genWords();
        }
      } else {
        let span = document.createElement("span");
        span.appendChild(document.createTextNode("Game Over"));
        span.className = "lose";

        let mainDiv = document.createElement("div");
        mainDiv.className = "finish main-sec";
        mainDiv.appendChild(span);
        container.appendChild(mainDiv);
      }
    }
  }, 1000);
}
