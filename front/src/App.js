import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import './App.css';
import CardsContainer from './components/cards/CardsContainer';
import EditorContainer from './components/editor/EditorContainer';
import FormAddContent from './components/form/FormAddContent';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Route exact path="/" component={CardsContainer} />
        <Route exact path="/editor" component={EditorContainer} />
        <Route exact path="/add-content" component={FormAddContent} />

      </div>
    </BrowserRouter>
  );
}

export default App;
