const signupBtn = document.getElementById("sign-up");
const signupSection = document.querySelector(".sign-pop-up");
const closeSignupBtn = document.querySelector(".close-signup");
const navBarBtn = document.getElementById("toggle");
const body = document.querySelector("body");

function toggleSignup() {
  signupSection.classList.toggle("hidden");
}
function toggleNavBar() {
  body.classList.toggle("hidden-nav");
}
signupBtn.addEventListener("click", toggleSignup);
closeSignupBtn.addEventListener("click", toggleSignup);
signupSection.addEventListener("click", (e) => {
  if (e.target === signupSection) toggleSignup();
});
navBarBtn.addEventListener("click", toggleNavBar);
