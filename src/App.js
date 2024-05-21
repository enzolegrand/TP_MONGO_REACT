import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './Components/Accueil';
import Menu from './Components/menu/Menu';
import Etudiants from './Components/Etudiants';
import Enseignants from './Components/Enseignants';
import Matiere from './Components/Matiere';
import Note from './Components/Note';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/etudiants" element={<Etudiants />} />
        <Route path="/enseignants" element={<Enseignants />} />
        <Route path="/matiere" element={<Matiere />} />
        <Route path="/note" element={<Note />} />
      </Routes>
    </Router>
  );
}

export default App;
