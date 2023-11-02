import './App.scss';
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header/header";
import Home from "./Pages/Home/home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokédex' />
      </Routes>
    </div>
  );
}

export default App;
