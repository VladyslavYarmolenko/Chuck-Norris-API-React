
import React from 'react';
import s from './Toggler.module.css'
import { connect } from 'react-redux';
import { favoritesShow } from '../../redux/jokesReducer'


class Toggler extends React.Component {
  state = {
    burgerIsChecked : false,
  }
  
  checkBoxHandle = () => {
    const { burgerIsChecked } = this.state;
    const { showFavorites } = this.props;
    this.setState ({
      burgerIsChecked : !burgerIsChecked,
    }, () => {
      showFavorites(!burgerIsChecked);
    });
  }

  render(){

    const { burgerIsChecked } = this.state;
  return(
    <>
    {  burgerIsChecked && <div className={s.overlay} ></div>}
    <div className={burgerIsChecked? s.checked : s.checkbox_burger} id="checkbox_div">
        <input type="checkbox" className={s.burger_menu} id="checkbox-toggle"/>
        <label onClick={this.checkBoxHandle} for="checkbox-toggle">Favourite</label>
    </div>
    </>
  )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showFavorites: (boolean) => {
      dispatch(favoritesShow(boolean))
    }
  }
}
export default connect ('',mapDispatchToProps) (Toggler);