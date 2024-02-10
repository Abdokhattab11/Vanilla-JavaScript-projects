const startBtn = document.getElementById("start-btn");
const sentenceCnt = document.querySelector(".sentence");
const timer = document.querySelector(".timer-seconds span");
const textarea = document.getElementById("user-input");
const resultCnt = document.querySelector(".result-cnt");
const speedResult = document.querySelector(".result .speed");
const accuracyResult = document.querySelector(".result .acc");
const playAgainBtn = document.querySelector(".play-again-btn");

let intervalId;
let currIdx;
let currSentence;
let currSentenceSpans;

const data = [
  {
    sentence:
      "The cat sat on the mat. The dog barked at the cat. The cat jumped off the mat and ran away.",
  },
  {
    sentence:
      "She sells seashells by the seashore. The shells she sells are surely seashells. So if she sells shells on the seashore, I'm sure she sells seashore shells.",
  },
  {
    sentence:
      "Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked. If Peter Piper picked a peck of pickled peppers, where's the peck of pickled peppers Peter Piper picked?",
  },

  {
    sentence:
      "Sally sells sea shells by the seashore. The shells Sally sells are surely seashells. So if Sally sells shells on the seashore, I'm sure she sells seashore shells.",
  },
  {
    sentence:
      "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
  },
  {
    sentence:
      "The job requires extra pluck and zeal from every young wage earner.",
  },
  {
    sentence:
      "The explorer was frozen in his big kayak just after making queer discoveries.",
  },
  {
    sentence:
      "A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.",
  },
  {
    sentence: "Few black taxis drive up major roads on quiet hazy nights.",
  },
  {
    sentence: "How razorback-jumping frogs can level six piqued gymnasts!",
  },
  {
    sentence:
      "The job requires extra pluck and zeal from every young wage earner.",
  },
  {
    sentence: "The hungry purple dinosaur ate the kind, zebra.",
  },
  {
    sentence:
      "The explorer was frozen in his big kayak just after making queer discoveries.",
  },
  {
    sentence:
      "A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.",
  },
  {
    sentence: "Few black taxis drive up major roads on quiet hazy nights.",
  },
  {
    sentence: "How razorback-jumping frogs can level six piqued gymnasts!",
  },
  {
    sentence: "Crazy Frederick bought many very exquisite opal jewels.",
  },
  {
    sentence: "My girl wove six dozen plaid jackets before she quit.",
  },
  {
    sentence: "Five or six big jet planes zoomed quickly by the tower.",
  },
  {
    sentence: "Jinxed wizards pluck ivy from the big quilt.",
  },
  {
    sentence: "The quick brown fox jumps over a lazy dog.",
  },
  {
    sentence: "A large fawn jumped quickly over white zinc boxes.",
  },
  {
    sentence:
      "The job requires extra pluck and zeal from every young wage earner.",
  },
  {
    sentence: "The hungry purple dinosaur ate the kind, zebra.",
  },
  {
    sentence:
      "The explorer was frozen in his big kayak just after making queer discoveries.",
  },
  {
    sentence:
      "A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.",
  },
  {
    sentence: "Few black taxis drive up major roads on quiet hazy nights.",
  },
  {
    sentence: "How razorback-jumping frogs can level six piqued gymnasts!",
  },
  {
    sentence:
      "The job requires extra pluck and zeal from every young wage earner.",
  },
  {
    sentence: "The hungry purple dinosaur ate the kind, zebra.",
  },
  {
    sentence:
      "The explorer was frozen in his big kayak just after making queer discoveries.",
  },
  {
    sentence:
      "A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.",
  },
  {
    sentence: "Few black taxis drive up major roads on quiet hazy nights.",
  },
  {
    sentence: "How razorback-jumping frogs can level six piqued gymnasts!",
  },
  {
    sentence: "Crazy Frederick bought many very exquisite opal jewels.",
  },
  {
    sentence: "My girl wove six dozen plaid jackets before she quit.",
  },
  {
    sentence: "Five or six big jet planes zoomed quickly by the tower.",
  },

  {
    sentence:
      "The job requires extra pluck and zeal from every young wage earner.",
  },
];
function parseIntoHtml(sentence) {
  const words = sentence.split(" ");
  let res = ``;
  for (const word of words) {
    let internalRes = ``;
    for (const letter of word) {
      internalRes += `<span>${letter}</span>`;
    }
    res += `<p>${internalRes}</p>
            <p><span> </span><p>`;
  }
  return res;
}

function handleFinshTimer() {
  clearInterval(intervalId);
  resultCnt.classList.remove("hidden");
  const len = currSentence.length;
  let correct = 0;
  let notFinished = len - currIdx;
  let period = 60 - +(timer.textContent ? timer.textContent : 60);
  for (const el of currSentenceSpans) {
    if (el.classList.contains("correct")) correct++;
  }
  speedResult.textContent = ((len - notFinished) / period).toFixed(2);
  accuracyResult.textContent = Math.floor((correct / len) * 100);
}

function updateTime() {
  // Handle Game Finish
  if (+timer.textContent === 0) {
    handleFinshTimer();
    return;
  }
  timer.textContent = `${+timer.textContent - 1}`;
}

function startGame() {
  // Get the Sentence
  const idx = getRandomIdx();
  sentenceCnt.innerHTML = parseIntoHtml(data[idx].sentence);
  // reset result
  resultCnt.classList.add("hidden");
  // Set inital Values
  textarea.value = ``;
  timer.textContent = "60";
  currSentence = data[idx].sentence;
  currSentenceSpans = sentenceCnt.querySelectorAll("span");
  currSentenceSpans[0].classList.add("current");
  textarea.readOnly = false;
  textarea.setAttribute("placeholder", "Start Typing");
  textarea.focus();
  currIdx = 0;
  // Start the timer
  intervalId = setInterval(updateTime, 1000);
  updateUI();
}

function updateUI(inputStr) {
  if (!inputStr) return;
  currSentenceSpans[currIdx].classList.remove("current");
  if (inputStr.charAt(inputStr.length - 1) === currSentence.charAt(currIdx)) {
    currSentenceSpans[currIdx].classList.add("correct");
  } else {
    currSentenceSpans[currIdx].classList.add("wrong");
  }
  currIdx++;
  if (currIdx === currSentence.length) {
    handleFinshTimer();
    return;
  }
  currSentenceSpans[currIdx].classList.add("current");
}

startBtn.addEventListener("click", startGame);
textarea.addEventListener("input", (e) => {
  // Handle Entering backspace
  if (e.inputType === "deleteContentBackward") {
    console.log("BackSpace");
    currSentenceSpans[currIdx].className = "";
    currIdx--;
    if (currIdx < 0) return;
    currSentenceSpans[currIdx].className = "current";
  } else if (textarea.value) {
    console.log("Not Backspace");
    updateUI(textarea.value);
  }
});
playAgainBtn.addEventListener("click", startGame);
function getRandomIdx() {
  return Math.floor(Date.now() / 1000) % data.length;
}
