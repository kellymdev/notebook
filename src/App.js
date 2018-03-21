import React, { Component } from 'react';
import './App.css';
import NotesContainer from './components/NotesContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Notebook</h1>
        </header>
        <NotesContainer />
      </div>
    );
  }
}

export default App;
