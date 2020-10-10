
import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Favorites from './components/Favorites/Favorites';
import Main from './components/Main/Main';
import Preloader from './components/Preloader/Preloader';


const App = (props) => {

  const { isLoading } = props;

  return (
    <div className="app-wrapper">
      {isLoading && <Preloader/>}
      <Main/>
      <Favorites/>
    </div>
  )
}


const mapStateToProps = (state) => {
  return({
    isLoading: state.jokesReducer.isLoading,
  })
}

export default connect(mapStateToProps)(App);
