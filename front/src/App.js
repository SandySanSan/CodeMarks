import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import EditorContainer from './components/editor/EditorContainer';
import FormAddContent from './components/form/FormAddContent';
import SearchByTags from './components/SearchByTags';
import SearchByType from './components/SearchByType';
import Home from './components/Home';
import DisplayNote from './components/notes/DisplayNote';

const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/editor/:id" component={EditorContainer} />
        <Route exact path="/add-content" component={FormAddContent} />
        <Route exact path="/search-by-tags/:tag" component={SearchByTags} />
        <Route exact path="/search-by-types/:type" component={SearchByType} />
        <Route exact path="/display-note/:id" component={DisplayNote} />
      </div>
    </BrowserRouter>
  );
}

export default App;
