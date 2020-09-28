import React from 'react';
import './App.css';
import Favorites from './components/Favorites/Favorites';
import Main from './components/Main/Main';


const App = (props) => {
  return (
    <div className="app-wrapper">
      <Main/>
      <Favorites/>
    </div>
  )
}

export default App;
