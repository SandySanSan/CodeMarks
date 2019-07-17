import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import './App.css';
import CardsContainer from './components/cards/CardsContainer';
import EditorContainer from './components/editor/EditorContainer';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Route exact path="/" component={CardsContainer} />
        <Route exact path="/editor" component={EditorContainer} />
      </div>
    </BrowserRouter>
  );
}

export default App;
