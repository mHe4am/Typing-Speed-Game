// Words array
let words = [
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
let lvlBtns = document.querySelectorAll(".select-lvl .lvl-btn");

// Setting => level name + seconds + score
lvlSpan.innerHTML = defaultLvl;
secondsSpan.innerHTML = defaultLvlSeconds;
timeLeft.innerHTML = defaultLvlSeconds;
totalScore.innerHTML = words.length;

// Level buttons click event
lvlBtns.forEach((btn) => {
  btn.onclick = function () {
    // Remove active class from all buttons
    lvlBtns.forEach((b) => {
      b.classList.remove("active");
    });

    // Add active class to clicked button
    this.classList.add("active");

    // Update default level
    defaultLvl = this.dataset.lvl;
    defaultLvlSeconds = lvls[defaultLvl];

    // Update display
    lvlSpan.innerHTML = defaultLvl;
    secondsSpan.innerHTML = defaultLvlSeconds;
    timeLeft.innerHTML = defaultLvlSeconds;
  };
});

// Disable paste event
inputField.onpaste = () => false;

// Start game
startBtn.onclick = function () {
  this.remove();
  inputField.focus();

  // Disable level buttons
  lvlBtns.forEach((btn) => {
    btn.disabled = true;
  });

  genWords();
};

function gameOver(isWin) {
  // Re-enable level buttons
  lvlBtns.forEach((btn) => {
    btn.disabled = false;
  });

  // Create finish message
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(isWin ? "Congratulations!" : "Game Over"));
  span.className = isWin ? "win" : "lose";

  let mainDiv = document.createElement("div");
  mainDiv.className = "finish main-sec";
  mainDiv.appendChild(span);
  container.appendChild(mainDiv);

  // Create retry button
  let retryBtn = document.createElement("div");
  retryBtn.className = "start";
  retryBtn.appendChild(document.createTextNode("Retry"));
  container.appendChild(retryBtn);

  // Retry button click event
  retryBtn.onclick = function () {
    // Remove finish message and retry button
    mainDiv.remove();
    this.remove();

    // Reset words array
    words = [
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

    // Reset score
    currentScore.innerHTML = 0;
    totalScore.innerHTML = words.length;

    // Reset time
    timeLeft.innerHTML = defaultLvlSeconds;

    // Reset input
    inputField.value = "";

    // Hide current word
    currentWord.style.display = "none";

    // Recreate upcoming words div if removed
    if (!document.querySelector(".upcoming-words")) {
      let newUpcoming = document.createElement("div");
      newUpcoming.className = "upcoming-words main-sec";
      newUpcoming.appendChild(document.createTextNode("Words Will Appear Here"));
      container.insertBefore(newUpcoming, document.querySelector(".statistics"));
      upcomingWords = newUpcoming;
    } else {
      upcomingWords.innerHTML = "Words Will Appear Here";
    }

    // Recreate start button
    let newStartBtn = document.createElement("div");
    newStartBtn.className = "start";
    newStartBtn.appendChild(document.createTextNode("Start Playing"));
    container.insertBefore(newStartBtn, currentWord);
    startBtn = newStartBtn;

    // Add click event to new start button
    startBtn.onclick = function () {
      this.remove();
      inputField.focus();

      // Disable level buttons
      lvlBtns.forEach((btn) => {
        btn.disabled = true;
      });

      genWords();
    };
  };
}

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
  // Reset time for each word
  timeLeft.innerHTML = defaultLvlSeconds;

  // Remove upcoming words when it runs out of words
  if (words.length <= 0) {
    upcomingWords.remove();
  }

  let start = setInterval(() => {
    timeLeft.innerHTML--;

    if (timeLeft.innerHTML <= 0) {
      clearInterval(start);
      if (inputField.value == currentWord.innerHTML) {
        inputField.value = "";
        currentScore.innerHTML++;

        if (words.length <= 0) {
          gameOver(true);
        } else {
          genWords();
        }
      } else {
        gameOver(false);
      }
    }
  }, 1000);
}
