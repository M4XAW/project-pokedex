import './App.scss';
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header/header";
import Home from "./Pages/Home/home";
import Pokédex from './Pages/Pokédex/pokédex';
import Error from './Pages/Error/error';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />{/*"Route based on the path"*/}
        <Route path='/pokédex' element={<Pokédex/>}/>
        <Route path='*' element={<Error />} /> {/* If the path is not found, display the error page */}
      </Routes> 
    </div>
  );
}

export default App;
