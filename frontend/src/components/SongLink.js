import React from 'react'

export default function SongLink(props) {
  const { songData } = props
  return (
    <div>
      <p>{songData.name}</p>
      <p>{songData.artist}</p>
      <p>{songData.url}</p>
      <p>{songData.preview_url}</p>
    </div>
  )
}
