import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SongLink from './SongLink';

export default function SongDisplay(props) {

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
      {state.songData ? <SongLink songData={state.songData}></SongLink> : <p>No song data provided</p>}
    </div>
  )
}
