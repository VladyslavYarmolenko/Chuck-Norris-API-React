import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Joke.module.css';
import {addFavoriteJoke, removeFavoriteJoke} from '../../../redux/jokesReducer'


const Joke = (props) => {

  const { joke } = props;
  const { favorites } = useSelector(state => state.jokesReducer);
  const dispatch = useDispatch();
  

  let category = props.joke.categories;
  let jokeID = props.joke.id;
  let jokeText = props.joke.value;
  let update = props.joke.updated_at.split(' ')[0];

  const favoritesHandle = () => {
    let resultJoke = favorites.find(item => item.id === joke.id);
    if (resultJoke) {
      dispatch(removeFavoriteJoke(joke))
    } else {
      dispatch(addFavoriteJoke(joke))
    }
  }

  return (
    <div className={s.joke_item}>
      <div className={s.joke_item_header}>
        <div onClick={favoritesHandle} className={favorites.find(item => item.id === joke.id) ? s.heart_checked  : s.heart_unchecked}></div>
      </div>
      <div className={s.joke_item_center}>
        <div className={s.note_image_wrapper}>
          <div className={s.note_image}></div>
        </div>
        <div className={s.joke_content}>
          <div className={s.joke_ID}>
            <p className={s.title_ID}>ID:</p>
              <p className={s.ID_num}>{jokeID}</p>
            <div className={s.exit_img}></div>
          </div>
            <div className={s.joke_text}>{jokeText}</div>
        </div>
      </div>
      <div className={s.joke_item_bottom}>
        <div className={s.update}>
          <p className={s.update_title}>Last update:</p>
            <p className={s.update_info}>{update}</p>
        </div>
          {category.length > 0 && <div className={s.category_name}>{category}</div>}
      </div>
    </div>
  )
}



export default  Joke;