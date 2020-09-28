import React from 'react';
import Inputs from '../Inputs/Inputs';
import JokesWrap from '../JokesWrap/JokesWrap';
import Toggler from '../Toggler/Toggler';
import s from './Main.module.css';

const Main = (props) => {
  return (
    <div className={s.Main}>
      <div className={s.Top}>
        <div> 
          <p className={s.Label}>MSI 2020</p>
          <p className={s.Greet}>Hey!</p>
          <p className={s.Offer}>Let`s try to find a joke for you:</p>
        </div>
        <Toggler/>
      </div>
      <Inputs/>
      <JokesWrap/>
    </div>
  )
}

export default Main;