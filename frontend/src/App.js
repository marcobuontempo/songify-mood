import './App.css';
import GifSelector from './components/GifSelector';
import SongDisplay from './components/SongDisplay'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1 style={{ textAlign: "center", color: "#38A3A5", fontFamily: "'Kalam', cursive", margin:"0", padding:"0.2em", fontSize: "3em", cursor: "default", textShadow: "-3px 3px 2px black" }}>SonGIFy Mood</h1>
        <Routes>
          <Route path='/' element={<GifSelector></GifSelector>} />
          <Route path="/song" element={<SongDisplay></SongDisplay>} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
