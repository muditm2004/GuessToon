import React,{useContext} from 'react'
import { GameContext } from '../Context/ContextProvider';
import GuessToon from '../Images/GuessToon.png'

export default function NavScore() {

    const {
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
        lives, setLives
      } = useContext(GameContext);


  return (
    <> <div className="NavCorner">
           <img src={GuessToon}/>
        </div> </>
  )
}
