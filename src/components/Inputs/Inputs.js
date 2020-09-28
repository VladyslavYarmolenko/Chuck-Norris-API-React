import React from 'react';
import { connect } from 'react-redux';
import { fetchCategories, requestJoke } from '../../redux/jokesReducer';
import s from './Inputs.module.css'

class Inputs extends React.Component {
  state = {
    selectedType: 'random',
    category: '',
    query: '',
  }

  componentDidMount() {
    const { fetchCategories, categories } = this.props;

    if (!categories.length) {
      fetchCategories();
    }
  }
  
  radioButttonHandle = (type) => {
    this.setState({
      selectedType: type,
    })
  }

  selectedCategoryHandle = (category) => {
    this.setState({
      category: category,
      query: '',
    })
  }

  searchInputHandle = (e) => {
    const queryValue = e.target.value
    this.setState({
      query: queryValue,
      category: '',
    })
  }

  submitFormHandle = (e) => {
    e.preventDefault();
    const { requestJoke } = this.props;
    const { selectedType, category, query } = this.state;
    const data = {};

    if(selectedType === 'categories'){
      data.category = category;
    } else if (selectedType === 'search'){
      data.query = query;
    } else if (selectedType === 'random'){
    }
    requestJoke(data, selectedType);
  }

  render() {
    const { selectedType } = this.state;
    const { categories } = this.props;
    
    return(
      <div>
        <form onSubmit={(e) => this.submitFormHandle(e)}>
          <div className={s.radio_container}>
            <label for="random" onClick={() => this.radioButttonHandle('random')} className={s.label}>
              <input type='radio' id="random" checked={selectedType === 'random'} className={s.radio}/>
              Random
            </label>
          </div>
          <div className={s.radio_container}>
            <label for="categories" onClick={() => this.radioButttonHandle('categories')} className={s.label}>
              <input type='radio' id="categories" checked={selectedType === 'categories'} className={s.radio}/>
              From categories
            </label>
            { selectedType === 'categories' && <div>{categories.map(category => {
              return (<button type="button" onClick={() => this.selectedCategoryHandle(category)} className={this.state.category === category? s.button_selected : s.category}>{category}</button>)
            })}</div> }
          </div>
          <div >
            <label for="search" onClick={() => this.radioButttonHandle('search')} className={s.label}>
              <input type='radio' id="search" checked={selectedType === 'search'} className={s.radio}/>
              Search
            </label>
            { selectedType === 'search' && <div> <input onChange={(e) => this.searchInputHandle(e)} type="text" className={s.search_input} placeholder="Free text search..."/></div> }
          </div>
          <button type="submit" className={s.submit}>Get a joke</button>
        </form>
        {/* { selectedType === 'search' ? jokes[0].result.map(joke => <Joke joke={joke}/>) : jokes.map(joke => <Joke joke={joke}/>)} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return ({
    isLoading: state.jokesReducer.isLoading,
    categories: state.jokesReducer.categories,
  })
};

const mapDispatchToProps = {
  fetchCategories,
  requestJoke,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);