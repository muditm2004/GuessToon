import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAudioPlayer } from 'react-use-audio-player';
import bgm from '../Audio/summer-memories-270159.mp3';

export const GameContext = createContext();

export default function ContextProvider({ children }) {
  const { load,pause,play,playing } = useAudioPlayer();

  const [HighScore, setHighScore] = useState(0);
  const [Name, setName] = useState("");
  const [PlayerName, setPlayerName] = useState("");
  const [PlayerScore, setPlayerScore] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [lives, setLives] = useState(3);
  const [chars, setChars] = useState([]);
  const [currentChar, setCurrentChar] = useState();
  const [hintUsed, setHintUsed] = useState(false);
  const [guessedChars, setGuessedChars] = useState([]);
  const [isCharacterGuessed, setIsCharacterGuessed] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [hadPlayed, setHadPlayed] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
 

  const shuffleArray = (array) => {
    let shuffled = [...array]; // Create a copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  function nextChar(name) {
    const index = chars.findIndex((char) => char.Character === name);
    if (index !== -1 && index + 1 < chars.length) {
      return chars[index + 1];
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (newGame) {
    const fetchChars = async () => {
      try {
        const response = await fetch("/getchars");

        if (response.ok) {
          const data = await response.json();
          const shuffleChar = shuffleArray(data);
          setChars(shuffleChar);
          console.log(shuffleChar);

          if (shuffleChar.length > 0) {
            setCurrentChar(shuffleChar[0]); // Set the first character initially
          }
          console.log(currentChar);
        }
      } catch (error) {
        console.log("error");
      }
    };

    fetchChars();
    setCurrentChar(nextChar(0));}
  }, [newGame]);

  useEffect(() => { 
    load(bgm, {
      autoplay: true,
      loop: true
    });
  }, []);

  useEffect(() => {
    if (isCharacterGuessed && currentChar) {
      document.getElementById("image").style.filter =
        "drop-shadow(0px 3px black)";

      setTimeout(() => {
        document.getElementById("image").style.filter = "brightness(0%)";
        setCurrentChar(nextChar(currentChar.Character));
        if (currentChar===null) {
          navigate("/gameover");}
      }, 1000);
    }
  }, [isCharacterGuessed, chars]);



  useEffect(() => {
    // Attempt to get the data from localStorage
    const storedPlayerName = JSON.parse(localStorage.getItem("Player Name"));
    const storedHighScore = JSON.parse(localStorage.getItem("High Score"));
  

    if (storedPlayerName) {
      setPlayerName(storedPlayerName);
    }
    if (storedHighScore) {
      setHighScore(storedHighScore);
    }

    if (PlayerName !== storedPlayerName) {
      localStorage.setItem("Player Name", JSON.stringify(PlayerName));
    }
    if (HighScore > storedHighScore) {
      localStorage.setItem("High Score", JSON.stringify(HighScore));
    }
  
  }, [PlayerName, HighScore]);
  
  



  return (
    <GameContext.Provider
      value={{
    
        load,pause,play,playing,
        hintOpen, setHintOpen,
        newGame, setNewGame,
        hadPlayed, setHadPlayed,
        isNewHighScore, setIsNewHighScore,
        isCharacterGuessed,
        setIsCharacterGuessed,
        guessedChars,
        setGuessedChars,
        hintUsed,
        setHintUsed,
        lives,
        setLives,
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
        chars,
        setChars,
        currentChar,
        setCurrentChar,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
