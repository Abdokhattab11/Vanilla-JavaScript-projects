const container = document.querySelector(".container");
const countSeates = document.querySelector(".selected-seats span");
const totalPrice = document.querySelector(".total-price span");
const selectedMovie = document.querySelector("#movie-name");
const chairsArr = [...document.querySelectorAll(".row .chair")];
let moviePrice = +selectedMovie.value;

function storeMovieData(moviePrice, movieIdx) {
  localStorage.setItem("moviePrice", moviePrice);
  localStorage.setItem("movieIdx", movieIdx);
}
const updateTotalPrice = (totalSeats) => {
  countSeates.innerText = totalSeats;
  totalPrice.innerText = totalSeats * moviePrice;
};

/* Get data from Local Storage and render it on the screen */
const populateLS = () => {
  const selectedSeatIdx = JSON.parse(localStorage.getItem("selectedSeats"));
  for (const idx of selectedSeatIdx) chairsArr[idx].classList.add("selected");
  moviePrice = localStorage.getItem("moviePrice");
  selectedMovie.selectedIndex = localStorage.getItem("movieIdx");
  updateTotalPrice(selectedSeatIdx.length);
};
populateLS();

const updateUI = () => {
  const selectedSeats = [...document.querySelectorAll(".row .chair.selected")];
  /*
    We want to store the state of seates inside local storage of 
    The Browser so that when we reload the page, we get can render them again
    - We dont need to store the DOM !
    - Insted we will sotre the Indecis of the seats
    - To achive that we will do the following 
      - Get all chairs and map them in one array
      - Then get index of each selected chair and store them in one array
  */
  const selectedSeatsIdx = [...selectedSeats].map((seat) => {
    return chairsArr.indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIdx));

  updateTotalPrice(selectedSeats.length);
};

selectedMovie.addEventListener("change", (e) => {
  moviePrice = +selectedMovie.value;
  storeMovieData(e.target.value, e.target.selectedIndex);
  updateUI();
});

container.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("chair") && !el.classList.contains("occupied")) {
    el.classList.toggle("selected");
    updateUI();
  }
});
