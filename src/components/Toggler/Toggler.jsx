import React from 'react';
import s from './Toggler.module.css'

class Toggler extends React.Component {
  state = {
    burgerIsChecked : false,
  }

  checkBoxHandle = () => {
    const { burgerIsChecked } = this.state;
    this.setState ({
      burgerIsChecked : !burgerIsChecked
    })
  }
  render(){
    console.log(this.state)
  return(
    <div className={s.checkbox_burger} id="checkbox_div">
        <input type="checkbox" className={s.burger_menu} id="checkbox-toggle"/>
        <label onClick={this.checkBoxHandle} for="checkbox-toggle">Favourite</label>
    </div>
  )
  }
}


export default Toggler;