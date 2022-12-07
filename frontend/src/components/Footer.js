import React from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
  return (
    <footer style={{background:"#38a3a5", padding: "20px", bottom: "0px", marginTop:"10px"}}>
      <p>
        <a href="https://github.com/marcobuontempo/spotify-mood" target="_blank" rel="noreferrer" style={{color:"#22577A"}}><i className="bi bi-github"> Github Source</i></a>
      </p>
      <p>
        <a href="https://www.linkedin.com/in/marcobuontempo" target="_blank" rel="noreferrer" style={{color:"#22577A"}}><i className="bi bi-linkedin"> Created by Marco Buontempo (2022)</i></a>
      </p>
    </footer>
  )
}
