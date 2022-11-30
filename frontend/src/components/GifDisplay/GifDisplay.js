import React from 'react'

export default function GifDisplay(props) {
  const { id, url, selected } = props.gif

  const style = {
    border: selected ? "5px solid blue" : "5px solid rgba(0,0,0,0)",
    borderRadius: "25px",
    scale: selected && "1.02",
    maxWidth: "250px",
    maxHeight: "100px",
    cursor: "pointer"
  }

  const handleOnClick = () => {
    props.toggleSelectedGif(id)
  }

  return (
    <img src={url} onClick={handleOnClick} style={style} alt=""></img>
  )
}