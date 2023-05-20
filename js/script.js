/** @format */

(() => {
  const allCards = document.querySelectorAll(".cards");
  const container = document.querySelector(".container");

  // Создаем массив с числами
  function fillArray(n) {
    let array = [];
    for (let i = 1; i <= n; i += 1) array.push(i, i);

    return array;
  }

  // Перемещиваем массив с числами
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

  // Создание карточек
  function createCards() {
    for (let i = 0; i < 16; i++) {
      const div = document.createElement("div");
      div.classList.add("cards");
      div.textContent = randomArr[i];
      container.append(div);
    }
  }
  createCards();
  // Прослушка на клик
  container.addEventListener("click", (ev) => {
    const activCard = document.querySelectorAll(".cards");

    if (
      ev.target !== container &&
      !ev.target.classList.contains("empty") &&
      !secondOpenCard()
    ) {
      ev.target.classList.add("card--active");
      if (secondOpenCard()) {
        doTheNumbersMatch();
      }
    }
    if (container.lastElementChild.classList.contains("btn-play")) {
      // ЗДЕСЬ ПЕРЕЗАПУСК ИГРЫ
      restarGame();
    }
  });

  // Открыто две карточки? да или нет
  function secondOpenCard() {
    const activCard = document.querySelectorAll(".card--active");
    if (activCard.length === 2) {
      return true;
    } else {
      return false;
    }
  }
  secondOpenCard();

  //Совпадают ли цифры на карточках?
  function doTheNumbersMatch() {
    // Функция закрытия карточек, у которых НЕ совпали цифры
    function closeTheCard() {
      activCard[0].classList.remove("card--error", "card--active");
      activCard[1].classList.remove("card--error", "card--active");
    }
    // Функция удаления карточек с поля, если у них совпали цифры
    function removeRightCards() {
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
    const activCard = document.querySelectorAll(".card--active");
    if (activCard[0].textContent === activCard[1].textContent) {
      activCard[0].classList.add("card--right");
      activCard[1].classList.add("card--right");

      setTimeout(removeRightCards, 300);
    } else {
      activCard[0].classList.add("card--error");
      activCard[1].classList.add("card--error");

      setTimeout(closeTheCard, 500);
    }
  }

  // Рестарт игры
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
