import React from "react";

export default function Stats({ lives, score }) {
  return (
    <div className="stats">
      {lives &&
        Array(lives)
          .fill("🤍")
          .map((heart, index) => (
            <span className="textShadow" key={index}>{heart}</span>
          ))}

      {score && <span>Score: {score}</span>}
    </div>
  );
}
