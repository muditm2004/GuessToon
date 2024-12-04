import React from "react";

export default function HowtoPlay() {
  return (
    <div id="OtherPage">
      <h1>How to Play Guess Toon</h1>
      {/* <p>
        Welcome to <strong>Guess Toon</strong>, where your cartoon knowledge is
        the star! Here's everything you need to know to get started:
      </p> */}
      <ul>
        <li>
          <strong>Lives:</strong> You start with 3 lives.🤍🤍🤍 Every wrong letter
          guess will cost you 1 life. So, choose wisely!
        </li>
        <li>
          <strong>Guess the Toon:</strong> A silhouette of a cartoon character
          will appear on your screen. Your job is to guess the character's name,
          one letter at a time!
        </li>
        <li>
          <strong>Scoring:</strong>
          <ul>
            <li>
              <strong>Correct Guess:</strong> Get it right, and you earn 5
              points!
            </li>
            <li>
              <strong>Hint:</strong> Need a little help? Use a hint—but beware!
              Using a hint will reduce your score for that guess to only 2
              points.
            </li>
          </ul>
        </li>
        <li>
          <strong>Game Over:</strong> The game ends when you've used up all 3
          lives. So, be careful with those wrong guesses!
        </li>
      </ul>
      {/* <p>
        Keep an eye on your lives and points, and try to guess as many cartoon
        characters as you can. It's a race against time, and the more you know,
        the better you'll score! Ready to play? Let’s see if you're the ultimate
        cartoon expert!
      </p> */}
      <p>
        Designed & Developed by <a href="muditmehta.onrender.com"> <strong>Mudit Mehta</strong></a>.
      </p>
    </div>
  );
}
