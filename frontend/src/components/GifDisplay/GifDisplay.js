import React from 'react'
import '../GifDisplay/GifDisplay.css'

export default function GifDisplay(props) {
  const { id, url, selected } = props.gif

  const handleOnClick = () => {
    props.toggleSelectedGif(id)
  }

  return (
    <img src={url} onClick={handleOnClick} className={`GifDisplay ${selected && " selected"}`} alt=""></img>
  )
}