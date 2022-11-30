import './App.css';
import GifSelector from './components/GifSelector';
import SongDisplay from './components/SongDisplay'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <h1 style={{textAlign: "center"}}>Spotify Mood</h1>
      <Routes>
        <Route path='/' element={<GifSelector></GifSelector>} />
        <Route path="/song" element={<SongDisplay></SongDisplay>} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
