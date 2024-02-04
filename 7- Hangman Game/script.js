const wordCnt = document.getElementById("word");
const winPopup = document.getElementById("popup-cnt");
const playAgainBtn = document.getElementById("play-again-btn");
const notification = document.getElementById("notification-cnt");
const wrongCnt = document.getElementById("wrong");
const svgBody = document.querySelectorAll(".figure-part");

const words = ["application", "wizard", "programming", "javascript"];
const correctLetters = new Set();
const wrongLetters = new Set();

let currentSvgIdx = 0;
let selcetdWord = words[Math.floor(Math.random() * 1000) % words.length];

async function getWord() {
  const result = await fetch("https://random-word-api.herokuapp.com/word");
  const data = await result.json();
  return data[0];
}

async function startTheGame() {
  correctLetters.clear();
  wrongLetters.clear();
  selcetdWord = await getWord();
  console.log(selcetdWord);
  displayWord();
  wrongCnt.querySelector("span").innerHTML = ``;
  svgBody.forEach((el) => el.classList.add("hidden"));
}

function gameResult(massage) {
  winPopup.classList.toggle("hidden");
  const p = winPopup.querySelector("div p");
  p.innerText = massage;
}
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function resetGame() {
  winPopup.classList.toggle("hidden");
  startTheGame();
}

function displayWord() {
  wordCnt.innerHTML = ``;
  for (const letter of selcetdWord) {
    const el = document.createElement("p");
    el.className = "letter";
    el.innerText = correctLetters.has(letter) ? letter : " ";
    wordCnt.append(el);
  }
  const currWord = wordCnt.innerText.replace(/\n/g, "");
  if (currWord === selcetdWord) {
    gameResult("You Have WON 😊");
  }
}
function updateWrongLetters(letter) {
  wrongLetters.add(letter);
  const el = wrongCnt.querySelector("span");
  if (!el.innerText) el.innerHTML = letter;
  else el.innerText += ` , ${letter}`;
  svgBody[currentSvgIdx++].classList.remove("hidden");
  // Pointing to last index so this will be game over
  if (currentSvgIdx === svgBody.length) gameResult("You Lost 😔");
}

// Initally Call display word
startTheGame();

window.addEventListener("keydown", (e) => {
  // If not a char then noting to do
  if (!("z" >= e.key && e.key >= "a")) return;
  if (selcetdWord.includes(e.key)) {
    if (correctLetters.has(e.key)) showNotification();
    else correctLetters.add(e.key);
  } else {
    // The
    if (wrongLetters.has(e.key)) showNotification();
    else updateWrongLetters(e.key);
  }
  displayWord();
});
playAgainBtn.addEventListener("click", resetGame);
