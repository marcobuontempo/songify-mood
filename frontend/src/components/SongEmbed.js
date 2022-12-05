import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function SongEmbed(props) {
  const [state, setState] = useState({
    spotifyURL: "",
    isLoading: true
  })

  useEffect(() => {
    const spotifyURL = new URL(props.songData.url)
    setState({
      ...state,
      spotifyURL: spotifyURL.pathname
    })
  }, [])

  return (
    <div style={{textAlign: "center"}}>
      <div style={{ padding: "10px" }}>
        <iframe as="player"
          title="Spotify Web Player"
          src={`https://open.spotify.com/embed${state.spotifyURL}?utm_source=oembed`}
          width="100%"
          height="352px"
          frameBorder="0"
          allow="encrypted-media"
          style={{ borderRadius: 5 }}
          display={state.isLoading ? "none" : "block"}
          onLoad={() => { setState({ ...state, isLoading: false }) }} />
        {state.isLoading && <Spinner animation="border" variant="info" />}
      </div>


      <button>Try a different combination?</button>

    </div>
  )
}
