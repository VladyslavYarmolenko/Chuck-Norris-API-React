import React from 'react';
import { connect } from 'react-redux';
import Joke from '../JokesWrap/Joke/Joke';
import s from './Favorites.module.css';


const Favorites = (props) => {

 const { burgerIsChecked } = props;

  return (
    <div className={ burgerIsChecked ? s.Favor_visible : s.Favor }>
      {props.favorites.map(joke => <Joke joke = {joke}/>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return({
    favorites: state.jokesReducer.favorites,
    burgerIsChecked: state.jokesReducer.burgerIsChecked,
  })
}

export default connect(mapStateToProps)(Favorites);