import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import GifDisplay from './GifDisplay/GifDisplay'

const GIF_URL = process.env.REACT_APP_EXPRESS_URL + "/gifs/random"
const SONG_URL = process.env.REACT_APP_EXPRESS_URL + "/songs/find"

export default function GifSelector() {
  const navigate = useNavigate()

  const [state, setState] = useState({
    gifs: [],
    amountSelected: 0,
    validSelection: false
  })

  const gifContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
    margin: '10px',
    border: '1px solid black',
    borderRadius: '25px',
    background: state.amountSelected > 3 ? 'red' : `linear-gradient(to right, black ${state.amountSelected*100/3}%, white 0%)`
  }

  const getGifs = async () => {
    const gifDocs = await axios.get(GIF_URL)
      .then(res => {
        return res.data.map(gif => {
          return {
            id: gif._id,
            url: gif.url,
            selected: false
          }
        })
      })
    setState({ ...state, gifs: gifDocs })
  }

  const toggleSelectedGif = (clickedID) => {
    const updatedGifs = state.gifs.map(gif => {
      if (gif.id === clickedID) {
        gif.selected = !gif.selected
      }
      return gif
    })
    const newAmountSelected = state.gifs.filter(gif => gif.selected).length
    const newValidSelection =  newAmountSelected === 3 ? true : false
    setState({ 
      ...state, 
      gifs: updatedGifs,
      amountSelected: newAmountSelected,
      validSelection: newValidSelection })
  }

  const submitGifs = async () => {
    const selectedGifIDs = state.gifs.filter(gif => gif.selected).map(gif => gif.id)
    const songData = await axios.get(SONG_URL, {
      params: {
        id1: selectedGifIDs[0],
        id2: selectedGifIDs[1],
        id3: selectedGifIDs[2]
      }
    })
      .then(res => res.data)
      .then(data => data.song_data)
    navigate("/song", { state: { songData: songData } })
  }

  useEffect(() => {
    getGifs()
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p style={{margin: "0"}}>Select 3 GIFs based on your mood, and receive a song based on those selections!</p>
      <p style={{margin: "0"}}>There are 455 potential combinations to get :)</p>
      <div style={gifContainerStyle}>
        {state.gifs.map(gif => <GifDisplay gif={gif} toggleSelectedGif={toggleSelectedGif} key={gif.url}></GifDisplay>)}
      </div>
      <div style={{ textAlign: "center", height: "100px"}}>
        <button style={{fontSize:"20px"}} onClick={submitGifs} disabled={!state.validSelection}>GET MY SONG!</button>
        {state.validSelection && <p style={{color:"red", fontStyle:"italic"}}>Please select 3 GIFs</p>}
      </div>
    </div>
  )
}
