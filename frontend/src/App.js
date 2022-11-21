import './App.css';
import GifSelector from './components/GifSelector';
import SongDisplay from './components/SongDisplay'
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GifSelector></GifSelector>} />
        <Route path="/song" element={<SongDisplay></SongDisplay>} />
        {/* <Route element={Error} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
