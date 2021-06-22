"use strict";
((doc) => {
  const $winModal = doc.querySelector(".win-modal");
  const $subtitle = $winModal.querySelector(".subtitle");
  const $button = $winModal.querySelector(".button");
  const $gameScore = doc.querySelector(".game-score");
  const $cards = doc.querySelectorAll(".card-front-back");
  const $playersScore = doc.querySelectorAll(".player-score");

  $gameScore.addEventListener("winner", ({ detail }) => {
    const { winnerPlayer } = detail;

    $subtitle.textContent = winnerPlayer;
    $winModal.classList.add("-active");
  });

  $button.addEventListener("click", () => {
    scoreTotal = 0;
    $cards.forEach(($card) => $card.classList.remove("-active"));
    $playersScore.forEach(($playerScore) =>
      $playerScore.setAttribute("data-score", 0)
    );

    $winModal.classList.remove("-active");
  });
})(document);
