import React, { useContext, useEffect } from "react";
import { GameContext } from "../Context/ContextProvider"; // Adjust import based on your file structure
import { useNavigate } from "react-router-dom";

const GameOver = () => {
  const {
    setLives,
    hadPlayed,
    lives,
    setPlayerScore,
    isNewHighScore,
    setIsCharacterGuessed,
    HighScore,
    setHighScore,
    setGuessedChars,
    setHintUsed,
    PlayerName,
    PlayerScore,
  } = useContext(GameContext);

  const navigate = useNavigate();

  function mouseDown() {
    document.querySelector(".btn").style.boxShadow = "none";
  }

  function mouseUp() {
    document.querySelector(".btn").style.boxShadow =
      "1px 4px 0px hsl(0, 0%, 0%)";

    window.location.reload();


  }

  useEffect(() => {
    if (!hadPlayed) {
      navigate("/");
    }
  }, []);

  return (
    <div className="game-over-container">
      <div className="game-over-content">
        <h1>{lives===0?("Out of Lives!"):("You Won!")}</h1>
        <p className="player-name">{PlayerName}</p>
        <p className="current-score">Your Score: {PlayerScore}</p>

        {isNewHighScore ? (
          <p className="new-high-score">New High Score!🎉🎉🎉</p>
        ) : (
          <p className="high-score">High Score: {HighScore}</p>
        )}
      </div>
      <button
        className="hint btn"
        onMouseDown={mouseDown}
        onTouchStart={mouseDown}
        onTouchEnd={mouseUp}
        onMouseUp={mouseUp}
      >
        Restart
      </button>
    </div>
  );
};

export default GameOver;
