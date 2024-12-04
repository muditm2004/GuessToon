import React, { useContext, useEffect } from "react";
import { GameContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function Keyboard() {
  const {
    isNewHighScore,
    setIsNewHighScore,
    HighScore,
    setHighScore,
    currentChar,
    setGuessedChars,
    guessedChars,
    lives,
    setLives,
    PlayerScore,
    setPlayerScore,
    Loading,
    setLoading,
    setIsCharacterGuessed,
    hintUsed,
    setHintUsed,
    hintOpen,
  } = useContext(GameContext);

  const navigate = useNavigate();

  const word = currentChar ? currentChar.Character : "";

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      // Map the keyboard key to the button's ID
      const key = e.key.toLowerCase();
      const button = document.getElementById(key);

      if (button) {
        // Create and dispatch a 'mousedown' event
        const mousedownEvent = new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        button.dispatchEvent(mousedownEvent);

        setTimeout(() => {
          const mouseupEvent = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          button.dispatchEvent(mouseupEvent);
        }, 200);
      }
      // Create and dispatch a 'mouseup' event
    });

    // const handleTouchStart = (e) => mouseDown(e);
    // const handleTouchEnd = (e) => mouseUp(e);

    // document.addEventListener("touchend", (e) => {
    //   const btn = e.target.id;

    //   if (btn) {
    //     const mousedownEvent = new MouseEvent("mousedown", {
    //       bubbles: true,
    //       cancelable: true,
    //       view: window,
    //     });
    //     btn.dispatchEvent(mousedownEvent);

    //     setTimeout(() => {
    //       const mouseupEvent = new MouseEvent("mouseup", {
    //         bubbles: true,
    //         cancelable: true,
    //         view: window,
    //       });
    //       btn.dispatchEvent(mouseupEvent);
    //     }, 200);
    //   }
    // });

    // return () => {
    //   document.removeEventListener('touchstart', mouseDown);
    //   document.removeEventListener('touchend', mouseUp);
    // }
  }, []);

  //   words=word.split(' ')
  const t = word.length;
  const characters = word.split("");
  // console.log(characters);
  let initialGuessedChars;

  //   let initialDahses=[]

  useEffect(() => {
    setIsCharacterGuessed(false);
    if (Loading) {
      // console.log("Loading");
      return;
    } else {
      // console.log("2233");
      initialGuessedChars = characters.map((char) => {
        if (char === "." || char === "-") {
          return char;
        } else if (char === " ") {
          console.log("Spced");

          return "\u00A0".repeat(5);
        } else {
          return " _ ";
        }
      });
      if (
        JSON.stringify(initialGuessedChars) !== JSON.stringify(guessedChars)
      ) {
        setGuessedChars(initialGuessedChars);
      }
    }

    // Only update state if it's different to avoid unnecessary renders
  }, [Loading, word]);

  useEffect(() => {
    if (guessedChars.length > 0) {
      if (!guessedChars.includes(" _ ")) {
        console.log(guessedChars);

        if (hintUsed) {
          setPlayerScore((prevScore) => prevScore + 2);
          setHintUsed(false);
        } else {
          setPlayerScore((prevScore) => prevScore + 5);
        }
        setIsCharacterGuessed(true);
      }
    }
  }, [guessedChars]);

  useEffect(() => {
    if (lives === 0) {
      navigate("/gameover");
      if (PlayerScore > HighScore) {
        setIsNewHighScore(true);
        setHighScore(PlayerScore);
      }
    }
  }, [lives]);

  function mouseDown(e) {
    let btn = e.target.id;

    document.querySelector(`#${btn}`).style.boxShadow = "none";
    // e.preventDefault();
  }

  function mouseUp(e) {
    if (e.type === "touchend") return;

    let btn = e.target.id;
    document.querySelector(`#${btn}`).style.boxShadow = "1px 4px black";
    document.querySelector(`#${btn}`).style.border = "2px solid black";
    document.querySelector(`#${btn}`).style.backgroundColor = "white";

    let isCorrectGuess = characters.some(
      (element) => element.toLowerCase() === btn
    );

    if (isCorrectGuess) {
      if (guessedChars.includes(btn.toUpperCase())) {
        setLives((prevLives) => prevLives - 1);
      } else {
        characters.forEach((element, index) => {
          if (element.toLowerCase() === btn) {
            setGuessedChars((prevGuessedChars) => {
              const updatedArray = [...prevGuessedChars];
              updatedArray[index] = btn.toUpperCase();
              return updatedArray;
            });
          } else if (element === " ") {
            setGuessedChars((prevGuessedChars) => {
              const updatedArray = [...prevGuessedChars];
              updatedArray[index] = "\u00A0".repeat(5);
              return updatedArray;
            });
          }
        });
      }
    } else {
      document.querySelector(`#${btn}`).style.backgroundColor = "white";
      document.querySelector(`#${btn}`).style.boxShadow = "1px 4px black";
      document.querySelector(`#${btn}`).style.border = "2px solid black";
      document.querySelector(`#${btn}`).style.color = "black";

      // document.querySelector(`#${btn}`).disabled = true;
      setLives((prevLives) => prevLives - 1);
    }
    // e.preventDefault();
  }

  return (
    <>
      <div className="word-keyboardWrapper">
        <div className="dash">{guessedChars}</div>
        <div className="keyboard-row">
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="q"
          >
            q
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="w"
          >
            w
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="e"
          >
            e
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="r"
          >
            r
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="t"
          >
            t
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="y"
          >
            y
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="u"
          >
            u
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="i"
          >
            i
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="o"
          >
            o
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="p"
          >
            p
          </button>
        </div>

        <div className="keyboard-row">
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="a"
          >
            a
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="s"
          >
            s
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="d"
          >
            d
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="f"
          >
            f
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="g"
          >
            g
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="h"
          >
            h
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="j"
          >
            j
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="k"
          >
            k
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="l"
          >
            l
          </button>
        </div>

        <div className="keyboard-row">
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="z"
          >
            z
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="x"
          >
            x
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="c"
          >
            c
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="v"
          >
            v
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="b"
          >
            b
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="n"
          >
            n
          </button>
          <button
            className="keyboardBtn"
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            id="m"
          >
            m
          </button>
        </div>
      </div>
    </>
  );
}
