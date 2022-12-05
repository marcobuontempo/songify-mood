import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SongEmbed from './SongEmbed';


export default function SongDisplay() {

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
    </>
  )
}
