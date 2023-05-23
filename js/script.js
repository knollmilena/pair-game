/** @format */

(() => {
  const allCards = document.querySelectorAll(".cards");
  const container = document.querySelector(".container");

  function fillArray(n) {
    let array = [];
    for (let i = 1; i <= n; i += 1) array.push(i, i);

    return array;
  }

  function shuffle(arr) {
    let j;
    let temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
  const randomArr = shuffle(fillArray(8));

  function createCards() {
    for (let i = 0; i < 16; i++) {
      const div = document.createElement("div");
      div.classList.add("cards");
      div.textContent = randomArr[i];
      container.append(div);
    }
  }
  createCards();

  container.addEventListener("click", (ev) => {
    console.log(ev.target.classList.contains("cards"));
    if (ev.target.classList.contains("cards") && !bothCardsOpen()) {
      ev.target.classList.add("card--active");
      if (bothCardsOpen()) {
        matchNumbers();
      }
    }
    if (ev.target.classList.contains("btn-play")) {
      restarGame();
    }
  });

  const bothCardsOpen = () =>
    document.querySelectorAll(".card--active").length === 2;

  function closeCards() {
    const activCard = document.querySelectorAll(".card--active");
    activCard[0].classList.remove("card--error", "card--active");
    activCard[1].classList.remove("card--error", "card--active");
  }

  function removeRightCards() {
    const activCard = document.querySelectorAll(".card--active");
    activCard[0].classList.add("empty");
    activCard[1].classList.add("empty");
    activCard[0].classList.remove("cards", "card--active", "card--right");
    activCard[1].classList.remove("cards", "card--active", "card--right");

    const emptyCards = document.querySelectorAll(".empty");

    if (emptyCards.length === 16) {
      const buttonRevers = document.createElement("button");
      buttonRevers.classList.add("btn-play");
      buttonRevers.appendChild(document.createTextNode("Game again"));
      container.append(buttonRevers);
    }
  }
  function matchNumbers() {
    const activCard = document.querySelectorAll(".card--active");
    if (activCard[0].textContent === activCard[1].textContent) {
      activCard[0].classList.add("card--right");
      activCard[1].classList.add("card--right");

      setTimeout(removeRightCards, 300);
    } else {
      activCard[0].classList.add("card--error");
      activCard[1].classList.add("card--error");

      setTimeout(closeCards, 500);
    }
  }

  function restarGame() {
    const cardsEmpty = document.querySelectorAll(".empty");
    const buttonRevers = document.querySelector("btn-play");
    container.lastElementChild.remove();
    cardsEmpty.forEach((item) => {
      item.classList.remove("empty");
      item.classList.add("cards");
    });
  }
})();
