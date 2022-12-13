import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import GifDisplay from './GifDisplay';
import tenorlogo from '../images/tenorlogo.png'

const GIF_URL = process.env.REACT_APP_EXPRESS_URL + "/gifs/random"
const SONG_URL = process.env.REACT_APP_EXPRESS_URL + "/songs/find"

export default function GifSelector() {
  const navigate = useNavigate()

  const [state, setState] = useState({
    gifs: [],
    amountSelected: 0,
    validSelection: false,
    loadingGifs: true,
    gifsError: false
  })

  const gifContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: "100%",
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #22577A',
    borderRadius: '25px',
    background: "white",
    minHeight: "352px",
    position: "relative",
    boxShadow: "0 0 15px black"
  }

  const getGifs = async () => {
    axios.get(GIF_URL)
      .then(res => {
        return res.data.map(gif => {
          return {
            id: gif._id,
            url: gif.url,
            selected: false
          }
        })
      })
      .then(gifDocs => {
        setState({ ...state, gifs: gifDocs })
      })
      .catch(err => {
        setState({ ...state, gifsError: true })
      })
    setState({ ...state, loadingGifs: false })
  }

  const fillBackgroundContainer = (amountSelected) => {
    if (amountSelected === 3) {
      return "#22577A"
    } else if (amountSelected > 3) {
      return "#FF595E"
    } else {
      const calc = amountSelected * 100 / 3
      return `linear-gradient(to right, #22577A ${calc-5}%, #57cc99 ${calc}%, #57cc99 0%)`
    }
  }

  const toggleSelectedGif = (clickedID) => {
    const updatedGifs = state.gifs.map(gif => {
      if (gif.id === clickedID) {
        gif.selected = !gif.selected
      }
      return gif
    })
    const newAmountSelected = state.gifs.filter(gif => gif.selected).length
    const newValidSelection = newAmountSelected === 3
    setState({
      ...state,
      gifs: updatedGifs,
      amountSelected: newAmountSelected,
      validSelection: newValidSelection
    })
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0px 10px" }}>
      <div style={{ padding: "10px" }}>
        <p style={{ margin: "0" }}>Select 3 GIFs based on your mood, and receive a song suggestion based on those selections!</p>
        <p style={{ margin: "0" }}>There are 455 unique combinations to explore, refreshed daily :)</p>
      </div>
      <div style={{ ...gifContainerStyle, background: fillBackgroundContainer(state.amountSelected) }}>
        {!state.loadingGifs && <Spinner animation="border" variant="success" />}
        {state.gifsError && <p>Error loading gifs...</p>}
        {state.gifs.map(gif => <GifDisplay gif={gif} toggleSelectedGif={toggleSelectedGif} key={gif.url}></GifDisplay>)}
        <img src={tenorlogo} alt="Tenor Attribution" style={{maxWidth: "100px", position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,0.8)", padding: "5px", borderRadius: "5px" }}></img>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button variant="dark" onClick={submitGifs} disabled={!state.validSelection}>{state.validSelection ? "Get my song!" : "Please select 3 GIFs"}</Button>
      </div>
    </div>
  )
}
