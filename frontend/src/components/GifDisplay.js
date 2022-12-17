import React from 'react'

export default function GifDisplay(props) {
  const { id, url, selected } = props.gif

  const style = {
    border: selected ? "5px solid #C7F9CC" : "5px solid rgba(0,0,0,0)",
    borderRadius: "25px",
    scale: selected && "1.03",
    height: "156px",
    cursor: "pointer",
    maxWidth: "100%"
  }

  const handleOnClick = () => {
    props.toggleSelectedGif(id)
  }

  return (
    <img src={url} onClick={handleOnClick} style={style} alt=""></img>
  )
}