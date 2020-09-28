import React from 'react';
import { connect } from 'react-redux';
import s from './JokesWrap.module.css'
import Joke from './Joke/Joke'

const JokesWrap = (props) => {

  let jokesArr = props.jokes;
  
  return( <div className={s.background}>
    {jokesArr.map(joke => <Joke joke={joke}/>)}
  </div>)
}


const mapStateToProps = (state) => {
  return ({
    jokes: state.jokesReducer.jokes
  })
}



export default connect(mapStateToProps)(JokesWrap);