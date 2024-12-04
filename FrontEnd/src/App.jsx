import React, { useContext } from "react";
import Home from "./assets/Components/Home";
import ContextProvider  from "./assets/Context/ContextProvider";
import Game from "./assets/Components/Game";
import NavScoreLyf from "./assets/Components/NavScore";
import Hint from "./assets/Components/Hint";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameOver from "./assets/Components/GameOver";
import HowtoPlay from "./assets/Components/HowtoPlay";
import About from "./assets/Components/About";

export default function App() {
  return (
    <ContextProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="/howtoplay" element={<HowtoPlay />} />
        </Routes>
      </BrowserRouter>

      {/* <Home /> */}
      {/* <Game/> */}
      {/* <NavScoreLyf/> */}
    </ContextProvider>
  );
}
