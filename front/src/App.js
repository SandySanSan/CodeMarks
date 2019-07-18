import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import './App.css';
import EditorContainer from './components/editor/EditorContainer';
import FormAddContent from './components/form/FormAddContent';
import SearchByTags from './components/SearchByTags';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={EditorContainer} />
        <Route exact path="/add-content" component={FormAddContent} />
        <Route exact path="/search-by-tags" component={SearchByTags} />

      </div>
    </BrowserRouter>
  );
}

export default App;
