import React, { useContext } from "react";
import closeMore from "../Images/close.png";
import { GameContext } from "../Context/ContextProvider";

export default function Hint() {
  const { currentChar, setHintOpen } = useContext(GameContext);
  return (
    <div className="HintContainer">
      <div className="hintHead">
      <h1>Hint</h1>
        <img src={closeMore} onClick={() => setHintOpen(false)} />
        
      </div>

      <p>{currentChar.Hint}</p>
    </div>
  );
}
