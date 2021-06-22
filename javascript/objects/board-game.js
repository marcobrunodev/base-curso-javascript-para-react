"use strict";
((doc) => {
  const $boardGame = doc.querySelector(".board-game");
  const getActions = () => Number($boardGame.getAttribute("data-actions"));
  const setActions = (actions) =>
    $boardGame.setAttribute("data-actions", actions);
  const getIdCards = () => $boardGame.getAttribute("data-idCards");
  const setIdCards = (id) => $boardGame.setAttribute("data-idCards", id);

  function newActions() {
    const actions = getActions();

    if (actions < 2) {
      setActions(actions + 1);
    }
  }

  function verifyCard() {
    const idCards = getIdCards();
    const listIdCards = idCards ? idCards.split(",") : [];
    const cardsActiveSrc = [];
    const cardsActive = [];

    listIdCards.forEach((id) => {
      const cardActive = doc.querySelector(`[data-id="${id}"]`);
      cardsActive.push(cardActive);

      cardsActiveSrc.push(
        cardActive.querySelector(".-back .icon").getAttribute("src")
      );
    });

    if (cardsActiveSrc.length === 2) {
      if (cardsActiveSrc[0] === cardsActiveSrc[1]) {
        $boardGame.dispatchEvent(new CustomEvent("add-score"));
      } else {
        setTimeout(() => {
          cardsActive.forEach((card) => card.classList.remove("-active"));
          $boardGame.dispatchEvent(new CustomEvent("change-player"));
        }, 500);
      }

      setIdCards("");
    }
  }

  function turnCard($origin) {
    const $cardFrontBack = $origin.closest(".card-front-back");

    if ($cardFrontBack && !$cardFrontBack.classList.contains("-active")) {
      const idCards = getIdCards();
      const newIdCards = idCards ? [idCards] : [];
      const id = $cardFrontBack.getAttribute("data-id");
      newIdCards.push(id);

      $cardFrontBack.classList.add("-active");

      setIdCards(newIdCards);
      newActions();
      verifyCard();
    }
  }

  $boardGame.addEventListener("click", (event) => {
    const $origin = event.target;

    turnCard($origin);
  });
})(document);
