import React, { useState, useEffect } from 'react'
import axios from 'axios'

const URL = "http://127.0.0.1:4000/gifs/random"

export default function GifSelector() {

  const [gifs, setGifs] = useState([])
  const [selectedGifs, setSelectedGifs] = useState([])

  return (
    <div>
      GifSelector
      <button onClick={() => console.log(gifs)}>Test</button>
    </div>
  )
}
