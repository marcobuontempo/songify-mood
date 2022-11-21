import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function SongDisplay(props) {

  const location = useLocation();

  const [state, setState] = useState({
    gifs: null,
    songData: null
  })


  useEffect(() => {
    const gifs = location.state ? location.state.gifs : null
    setState({...state, gifs: gifs})
  }, [])

  return (
    <div>
      <a href={props.url}>Click here to see your song!</a>
      {state.gifs ? <p>{state.gifs[0].url}</p> : <p>No gif input</p>}
    </div>
  )
}
