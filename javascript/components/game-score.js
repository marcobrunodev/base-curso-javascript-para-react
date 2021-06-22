"use strict";
((doc) => {
  const $boardGame = doc.querySelector(".board-game");
  const $gameScore = doc.querySelector(".game-score");

  function changePlayer() {
    const player = $gameScore.getAttribute("data-currentIdPlayer");
    const selectCurrentPlayer = player == 1 ? 2 : 1;

    $gameScore.setAttribute("data-currentIdPlayer", selectCurrentPlayer);
  }

  function addScore() {
    const currentIdPlayer = $gameScore.getAttribute("data-currentIdPlayer");
    const $playerScore = $gameScore.querySelector(
      `[data-idPlayer="${currentIdPlayer}"] .player-score`
    );

    const currentScore = Number($playerScore.getAttribute("data-score"));
    $playerScore.setAttribute("data-score", currentScore + 1);

    if (++scoreTotal === 3) {
      const $player1 = $gameScore.querySelector('[data-idPlayer="1"]');
      const $player2 = $gameScore.querySelector('[data-idPlayer="2"]');
      const player1Score = $player1
        .querySelector(".player-score")
        .getAttribute("data-score");
      const player2Score = $player2
        .querySelector(".player-score")
        .getAttribute("data-score");
      const winnerPlayer =
        player1Score > player2Score
          ? $player1.querySelector(".title").textContent
          : $player2.querySelector(".title").textContent;

      $gameScore.dispatchEvent(
        new CustomEvent("winner", {
          detail: {
            winnerPlayer,
          },
        })
      );
    }
  }

  $boardGame.addEventListener("add-score", addScore);
  $boardGame.addEventListener("change-player", changePlayer);
})(document);
