import axios from 'axios';

const REQUEST_JOKES_START = 'REQUEST_JOKES_START';
const REQUEST_JOKES_FAILURE = 'REQUEST_JOKES_FAILURE';
const REQUEST_CATEGORIES_SUCCESS = 'REQUEST_CATEGORIES_SUCCESS';
const REQUEST_JOKES_SUCCESS = 'REQUEST_JOKES_SUCCESS';
const REQUEST_JOKES_SEARCH_SUCCESS = 'REQUEST_JOKES_SEARCH_INPUT_SUCCESS';
const ADD_FAVORITES_JOKE = 'ADD_FAVORITES_JOKE';
const REMOVE_FAVORITES_JOKE = 'REMOVE_FAVORITES_JOKE';
const FAVORITES_SHOW = 'FAVORITES_SHOW'

let initialState = {
  isLoading: false,
  categories: [],
  jokes : [],
  jokesCount: '',
  favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [],
  burgerIsChecked: false,
}


const jokesReducer = (state = initialState, { type, payload }) => {
  switch(type) {

    case REQUEST_JOKES_START:
      return {
        ...state,
        isLoading: true,
      }
    case REQUEST_JOKES_FAILURE:
      return {
        ...state,
        isLoading: false,
      }

    case REQUEST_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: payload,
      }

    case REQUEST_JOKES_SUCCESS:
      let jokes = [payload];
      return {
        ...state,
        isLoading: false,
        jokes: jokes,
      }

    case REQUEST_JOKES_SEARCH_SUCCESS:
      return {
        ...state,
        jokes: payload.result,
        jokesCount: payload.total,
      }

    case ADD_FAVORITES_JOKE: {
      let favoriteJokes = localStorage.getItem('favorites');
      if (favoriteJokes) {
        favoriteJokes = JSON.parse(favoriteJokes);
        favoriteJokes.push(payload)
      } else {
        favoriteJokes = [payload];
      }
      localStorage.setItem('favorites', JSON.stringify(favoriteJokes))
      return {
        ...state,
        favorites: favoriteJokes,
      }
    }
    case REMOVE_FAVORITES_JOKE: {
      let favoriteJokes = localStorage.getItem('favorites');
      if (favoriteJokes) {
        favoriteJokes = JSON.parse(favoriteJokes);
        favoriteJokes = favoriteJokes.filter(item => payload.id !== item.id);
      } else {
        favoriteJokes = [];
      }
      localStorage.setItem('favorites', JSON.stringify(favoriteJokes))
      return {
        ...state,
        favorites: favoriteJokes,
      }
    }

    case FAVORITES_SHOW:
      return {
        ...state, 
        burgerIsChecked: payload,
      }
      
    default:
      return state;
  }
}


export const fetchCategories = () => (dispatch) => {
  dispatch({ type: REQUEST_JOKES_START });

  axios.get('https://api.chucknorris.io/jokes/categories')
  .then((response) => {
    const categories = response.data;

    dispatch({ 
      type: REQUEST_CATEGORIES_SUCCESS,
      payload: categories
    });
  }).catch(function (error) {
    dispatch({ type: REQUEST_JOKES_FAILURE });
  })
}

export const requestJoke = (dataObj, type) => (dispatch) => {


dispatch({ type: REQUEST_JOKES_START });

let url = 'https://api.chucknorris.io/jokes/'

if (type === 'categories' || type === 'random') {  
    url = url + 'random/'
} else {
    url = url + 'search/'
}

 axios.get(url, {params: dataObj})
 .then((response) => {
   const data = response.data;
   

if (type === 'search'){
    dispatch({ type: REQUEST_JOKES_SEARCH_SUCCESS, payload: data})
} else {
    dispatch({ type: REQUEST_JOKES_SUCCESS, payload: data});}
 }).catch(function (error) {
    dispatch({ type: REQUEST_JOKES_FAILURE });
  })
}

export const addFavoriteJoke = (jokeObj) => {
  return {
    type: ADD_FAVORITES_JOKE,
    payload: jokeObj,
  }
}


export const removeFavoriteJoke = (jokeObj) => {
  return {
    type: REMOVE_FAVORITES_JOKE,
    payload: jokeObj,
  }
}

export const favoritesShow = (boolean) => {
  return {
    type: FAVORITES_SHOW,
    payload: boolean,
  }
  
}


export default jokesReducer;