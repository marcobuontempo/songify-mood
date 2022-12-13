import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import SongEmbed from './SongEmbed';
import spotifylogo from '../images/spotifylogo.png'


export default function SongDisplay() {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState({
    songData: null
  })


  useEffect(() => {
    const songData = location.state ? location.state.songData : null
    setState({ ...state, songData: songData })
  }, [])

  return (
    <div style={{position:"relative"}}>
      {state.songData ? <SongEmbed songData={state.songData}></SongEmbed> : <p>No song data provided</p>}
      <img src={spotifylogo} alt="Spotify Attribution" style={{width: "100px", position: "absolute", bottom: "0px", right: "0px", padding: "10px"}}></img>
      <Button variant="dark" onClick={() => navigate("/songify-mood/")}>Try a different combination?</Button>
    </div>
  )
}
