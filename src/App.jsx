import './App.scss';
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header/header";
import Home from "./Pages/Home/home";
import Pokedex from "./Pages/Pokédex/pokédex";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokédex' element={<Pokedex />} />
      </Routes>
    </div>
  );
}

export default App;
