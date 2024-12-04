import React, { useContext, useEffect } from "react";
import NavLogo from "./NavLogo";
import NavScoreLyf from "./NavScore";
import { GameContext } from "../Context/ContextProvider";
import Stats from "./Stats";
import GuessToon from "../Images/GuessToon.png";
import Keyboard from "./Keyboard";
import { useNavigate } from "react-router-dom";
import Hint from "./Hint";
import { VolumeMute } from "react-bootstrap-icons";
import { VolumeUp } from "react-bootstrap-icons";

export default function Game() {
  const {
    load,
    pause,
    play,
    playing,
  
    newGame,
    setNewGame,
    setHadPlayed,
    currentChar,
    lives,
    HighScore,
    setHighScore,
    Name,
    setName,
    PlayerName,
    setPlayerName,
    PlayerScore,
    setPlayerScore,
    Loading,
    setLoading,
    setHintUsed,
    hintUsed,
    hintOpen,
    setHintOpen,
  } = useContext(GameContext);

  const navigate = useNavigate();

  function mouseDown() {
    document.querySelectorAll(".btn").forEach((element) => {
      element.style.boxShadow = "none";
    });
  }

  function mouseUp() {
    document.querySelectorAll(".btn").forEach((element) => {
      element.style.boxShadow = "1px 4px 0px hsl(0, 0%, 0%)";
    });
    setHintOpen(true);
    setHintUsed(true);
  }

  useEffect(() => {
    if (PlayerName.length === 0) {
      navigate("/");
    }
    setHadPlayed(true);
    setNewGame(false);
  }, []);

  useEffect(() => {
    if (hintOpen) {
      document.querySelector(".Game").style.filter = "blur(7px)";
      document.querySelector("body").style.backgroundColor = "var(--bm-color)";
      document.querySelectorAll(".keyboardBtn").forEach((element) => {
        element.disabled = true;
      });
    } else {
      document.querySelector(".Game").style.filter = "none";
      document.querySelector("body").style.backgroundColor = "var(--bg-color)";
      document.querySelectorAll(".keyboardBtn").forEach((element) => {
        element.disabled = false;
      });
    }
  }, [hintOpen]);

  return (
    <>
      <div className="navbar">
        <Stats lives={lives} />
        <NavLogo />
        <Stats score={PlayerScore} />
      </div>
      {hintOpen && <Hint />}
      <div className="Game">
        <div className="imageSide">
          <div className="silhouette">
            <img
              id="image"
              src={currentChar ? currentChar.Image_2 : ""}
              alt="GuessToon"
            />

            <div className="sil-shadow"></div>
          </div>

          <div className="hint">
            {" "}
            <button
              className="btn HintBtn"
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
            >
              Hint
            </button>
            <div className="volume">
            {!playing ? (
              <VolumeUp
              size={30}
                color="black"
                onClick={() => {
              
                  play();
                }}
              />
            ) : (
              <VolumeMute
              size={30}
                color="black"
                onClick={() => {
            
                  pause();
                }}
              />
            )}</div>
          </div>
        </div>
        <div className="keyboard">
          <Keyboard />
        </div>
      </div>
    </>
  );
}
