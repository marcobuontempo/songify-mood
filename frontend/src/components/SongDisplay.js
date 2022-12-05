import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SongEmbed from './SongEmbed';


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
    <>
      {state.songData ? <SongEmbed songData={state.songData}></SongEmbed> : <p>No song data provided</p>}
      <button onClick={() => navigate("/")}>Try a different combination?</button>
    </>
  )
}
