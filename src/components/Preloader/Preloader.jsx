import React from 'react';
import s from './Preloader.module.css'


const Preloader = (props) => {
  return(
    <div className={s.loading}>
      <div className={s.overlay}>
        <div className={s.preloader}></div>
      </div>
    </div>
  )
}



export default Preloader;