const container = document.querySelector(".music-container");

const audioElement = document.getElementById("audio-el");
const musicInfo = document.querySelector(".music-info");
const img = document.querySelector(".img-cnt img");
const progressCnt = document.querySelector(".progress-conatiner");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const songsData = [
  {
    audioUrl: "assets/audio/Cairokee - Samurai.mp3",
    imgUrl: "assets/imgs/hey.jpg",
    name: "Samurai",
  },
  {
    audioUrl: "assets/audio/Cairokee - Ya Abyad Ya Eswed.mp3",
    imgUrl: "assets/imgs/summer.jpg",
    name: "Ya Abyad Ya Eswed",
  },
  {
    audioUrl:
      "assets/audio/Cairokee Ft. Abdelrahman Roshdy - A Drop of White.mp3",
    imgUrl: "assets/imgs/ukulele - Copy.jpg",
    name: "A Drop of White",
  },
  {
    audioUrl: "assets/audio/Cairokee Kan Lak Ma aya.mp3",
    imgUrl: "assets/imgs/ukulele.jpg",
    name: "Kan Lak Ma aya",
  },
];

let currSongIdx = 1;

function updateUI() {
  const header = musicInfo.querySelector("h2");
  header.innerText = songsData[currSongIdx].name;
  audioElement.setAttribute("src", songsData[currSongIdx].audioUrl);
  img.setAttribute("src", songsData[currSongIdx].imgUrl);
  img.setAttribute("alt", songsData[currSongIdx].name);
}

function pauseSong() {
  container.classList.remove("play");
  const icon = playBtn.querySelector("i");
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
  audioElement.pause();
}

function playSong() {
  container.classList.add("play");
  const icon = playBtn.querySelector("i");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
  audioElement.play();
}

function handlePlaySong() {
  updateUI();
  if (container.classList.contains("play")) pauseSong();
  else playSong();
}

function updateProgess() {
  const currTime = audioElement.currentTime;
  const duration = audioElement.duration;
  const currProgress = progressCnt.querySelector(".progress");
  const percentage = (currTime / duration) * 100;
  currProgress.style.width = `${percentage}%`;
  if (percentage === 100) {
    currSongIdx = (currSongIdx + 1) % songsData.length;
    updateUI();
    playSong();
  }
}

updateUI();

playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handlePlaySong();
});
prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const len = songsData.length;
  currSongIdx = (((currSongIdx - 1) % len) + len) % len;
  updateUI();
  playSong();
});
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const len = songsData.length;
  currSongIdx = (currSongIdx + 1) % len;
  updateUI();
  playSong();
});
audioElement.addEventListener("timeupdate", updateProgess);
progressCnt.addEventListener("click", (e) => {});
progressCnt.addEventListener("click", function (event) {
  // Get the position of the click relative to the element
  const fullWidth = progressCnt.offsetWidth;
  const xPosition = event.clientX - progressCnt.getBoundingClientRect().left;
  const currTime = (xPosition / fullWidth) * audioElement.duration;
  audioElement.currentTime = currTime;
});
