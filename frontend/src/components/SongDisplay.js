import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
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
    <div>
      {state.songData ? <SongEmbed songData={state.songData}></SongEmbed> : <p>No song data provided</p>}
      <Button variant="dark" onClick={() => navigate("/")}>Try a different combination?</Button>
    </div>
  )
}
