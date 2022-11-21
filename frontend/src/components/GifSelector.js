import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GifDisplay from './GifDisplay/GifDisplay'

const URL = "http://127.0.0.1:4000/gifs/random"

export default function GifSelector() {

  const [state, setState] = useState({
    gifs: [],
    validSelection: false
  })

  useEffect(() => {
    getGifs()
  }, [])

  const getGifs = async () => {
    const gifDocs = await axios.get(URL)
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
    const newValidSelection = state.gifs.filter(gif => gif.selected).length === 3 ? true : false
    setState({ ...state, gifs: updatedGifs, validSelection: newValidSelection })
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        {state.gifs.map(gif => <GifDisplay gif={gif} toggleSelectedGif={toggleSelectedGif} key={gif.url}></GifDisplay>)}
      </div>
      <button disabled={!state.validSelection}>GET MY SONG!</button>
      {!state.validSelection && <p>Please select 3 GIFs</p>}
    </>
  )
}


// flexbox -> 3x2 gifs
// each gif when clicked = toggleSelected state
// selected gif is outlined
// when 3 selected gifs, no more gifs are selectable
// press submit button when ready
// fetches database song link
// loads new route with suggested song
