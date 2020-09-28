import axios from 'axios';

const REQUEST_JOKES_START = 'REQUEST_JOKES_START';
const REQUEST_JOKES_FAILURE = 'REQUEST_JOKES_FAILURE';
const REQUEST_CATEGORIES_SUCCESS = 'REQUEST_CATEGORIES_SUCCESS';
const REQUEST_JOKES_SUCCESS = 'REQUEST_JOKES_SUCCESS';
const REQUEST_JOKES_SEARCH_INPUT_SUCCESS = 'REQUEST_JOKES_SEARCH_INPUT_SUCCESS'

let initialState = {
  isLoading: false,
  categories: [],
  jokes : [],
  jokesCount: '',
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
      let jokes = [...state.jokes, payload];
      return {
        ...state,
        isLoading: false,
        jokes: jokes,
      }

    case REQUEST_JOKES_SEARCH_INPUT_SUCCESS:
      return {
        ...state,
        jokes: payload.result,
        jokesCount: payload.totalCount,
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
    dispatch({ type: REQUEST_JOKES_SEARCH_INPUT_SUCCESS, payload: data})
} else {
    dispatch({ type: REQUEST_JOKES_SUCCESS, payload: data});}
 }).catch(function (error) {
    dispatch({ type: REQUEST_JOKES_FAILURE });
  })
}


export default jokesReducer;