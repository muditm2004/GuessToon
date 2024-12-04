import React, { useContext, useEffect, useState } from "react";
import logo from "../Images/GuessToon.png";
import { GameContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useAudioPlayer } from 'react-use-audio-player';
import bgm from '../Audio/summer-memories-270159.mp3';
import { VolumeMute } from "react-bootstrap-icons";
import { VolumeUp } from "react-bootstrap-icons";

import more from '../Images/more.png';
import closeMore from "../Images/close.png";

export default function Home() {
  const navigate = useNavigate();

  const [navToggle, setNavToggle] = useState('closed');

  const {
    load,pause,play,playing,
    newGame,

    setNewGame,
    HighScore,
    setHighScore,
    Name,
    setName,
    setLives,
    PlayerName,
    setPlayerName,
    PlayerScore,
    setPlayerScore,
    Loading,
    setLoading,
    setHadPlayed,
  } = useContext(GameContext);

  function mouseDown() {
    document.querySelectorAll(".HomeBtns button").forEach((element) => {
      element.style.boxShadow = "none";
    });
  }

  function mouseUp() {
    document.querySelectorAll(".HomeBtns button").forEach((element) => {
      element.style.boxShadow = "1px 4px 0px hsl(0, 0%, 0%)";
    });
    // load(bgm, {
    //   autoplay: true
    // });
    if (PlayerName.length === 0) {
      if (Name.length > 0) {
        setPlayerName(Name);
        navigate("/game");
      } else {
        alert("Please enter your name to start the game");
      }
    } else {
      console.log(PlayerName);
      navigate("/game");
    }
  }

  useEffect(() => {
    // Define the Enter key press event handler
    const EnterPressed = (e) => {
      console.log(e);

      if (e.key === "Enter") {
        // Only handle name input if PlayerName is not set
        if (!PlayerName) {
          let val = document.querySelector(".HeroInput").value;
          if (val.length > 0 && val !== PlayerName) {
            // Ensure value is different before updating
            setPlayerName(val); // Set PlayerName if it's different
            document.querySelector(".btn").style.boxShadow = "none";
            setTimeout(() => {
              document.querySelector(".btn").style.boxShadow =
                "1px 4px 0px black";
              navigate("/game");
            }, 200);
          } else if (val.length === 0) {
            alert("Please enter your name");
          }
        } else {
          document.querySelector(".btn").style.boxShadow = "none";
          setTimeout(() => {
            document.querySelector(".btn").style.boxShadow =
              "1px 4px 0px black";
            navigate("/game");
          }, 200);
        }
      }
    };

    // Add the event listener
    document.addEventListener("keydown", EnterPressed);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", EnterPressed);
    };
  }, [PlayerName, navigate]);

  useEffect(() => {
    setHadPlayed(false);

    setNewGame(true);
  }, []);

  return (
    <>
    <div className="Homenavbar">
        <div className={`togglebtn`}>
          <img
            src={navToggle === "opened" ? closeMore : more}
            alt="toggle"
            onClick={() =>
              setNavToggle(navToggle === "opened" ? "closed" : "opened")
            }
          />
        </div>
        <div className="navlink"onClick={()=>navigate('/about')}>About</div>
        <div className="navlink" onClick={()=>navigate('/HowtoPlay')}>How to Play</div>
        <div className={`sidepanel panel${navToggle}`}>
          <div className="sidepanelNav">
            <div className="navlink" onClick={()=>navigate('/about')} >About</div>
            <div className="navlink" onClick={()=>navigate('/HowtoPlay')}>How to Play</div>
          </div>
        </div>
      </div>
      <div className="HomeContainer">
        <div className="HomeLogo">
          <img src={logo} alt="GuessToon Logo" />
        </div>
        <div className="HomeTexts">
          <h1>
            Hi,{" "}
            {PlayerName ? (
              PlayerName
            ) : (
              <>
                <input
                  className="HeroInput"
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}
          </h1>
        </div>

        {HighScore ? (
          <div className="HomeHighScore">
            <h2>
              High Score:{" "}
              {<div className="HighScoreValue">{`  ${HighScore} `}</div>}
            </h2>
          </div>
        ) : null}

        <div className="HomeBtns">
          <button
            className="btn"
            onMouseDown={mouseDown}
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseUp={mouseUp}
          >
            Play
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
    </>
  );
}
