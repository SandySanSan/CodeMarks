import React from 'react';
import NavBar from './components/Navbar';
import './App.css';
import CardsContainer from './components/cards/CardsContainer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <CardsContainer />
    </div>
  );
}

export default App;
