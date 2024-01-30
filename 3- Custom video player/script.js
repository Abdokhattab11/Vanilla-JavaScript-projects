const video = document.querySelector(".video");
const playBtn = document.querySelector(".play");
const stopBtn = document.querySelector(".stop");
const progressBar = document.querySelector(".progress");
const timestamp = document.querySelector(".timestamp");

function updateTimestamp() {
  let min = Math.floor(video.currentTime / 60);
  if (min < 10) min = `0${min}`;
  let sec = Math.floor(video.currentTime % 60);
  if (sec < 10) sec = `0${sec}`;
  timestamp.innerText = `${min}:${sec}`;
}

function toggleVideoStatus() {
  video.paused ? video.play() : video.pause();
}
function updateVideoIcon() {
  playBtn.innerHTML = video.paused
    ? ` <i class="fa-solid fa-pause fa-2x"></i>`
    : ` <i class="fa-solid fa-play fa-2x"></i>`;
}
function updateVideoprogess() {
  // console.log(progressBar);
  progressBar.value = (video.currentTime / video.duration) * 100;
  updateTimestamp();
}

function resetVideo() {
  video.currentTime = 0;
  video.pause();
}

function setVideoTime() {
  video.currentTime = (progressBar.value * video.duration) / 100;
  updateTimestamp();
}

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updateVideoIcon);
video.addEventListener("pause", updateVideoIcon);
video.addEventListener("timeupdate", updateVideoprogess);

playBtn.addEventListener("click", toggleVideoStatus);
stopBtn.addEventListener("click", resetVideo);

progressBar.addEventListener("change", setVideoTime);
