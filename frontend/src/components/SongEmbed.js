import React, { useEffect, useState } from 'react'

export default function SongEmbed(props) {
  const [spotifyURL, setSpotifyURL] = useState("")

  useEffect(() => {
    const spotifyURL = new URL(props.songData.url)
    setSpotifyURL(spotifyURL.pathname)
  }, [])


  return (
    <div>

      <iframe as="player"
        title="Spotify Web Player"
        src={`https://open.spotify.com/embed${spotifyURL}?utm_source=oembed`}
        width="100%"
        height="500px"
        frameBorder="0"
        allow="encrypted-media"
        style={{ borderRadius: 5 }} />

      <p>Tags Used:</p>
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>

      <button>Try a different combination?</button>

    </div>
  )
}
