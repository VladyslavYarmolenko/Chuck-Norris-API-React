import React from 'react';
import { connect } from 'react-redux';
import Joke from './Joke/Joke';
import s from '././Joke/Joke.module.css';

class JokesWrapper extends React.Component {
    state = {
    currentPage: 0,
    pageSize : 5,
  }

  handleChangePage = (newCurrentPage) => {
    this.setState({
      currentPage: newCurrentPage,
    })
  }

  render(){
    const { jokesCount, jokes } = this.props;
    const { pageSize, currentPage } = this.state;

    let pagesCount = Math.ceil(jokesCount / pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++){
      pages.push(i);
    }

    return( <div>
      <div className={s.pageWrapper} >
        {pages.map((page, index, array) => {
          // removed className={s}
          return <button className={s.pageNum} onClick={ () => this.handleChangePage(index)}>{index + 1}</button>
        })}
      </div>
      <div 
      // className={s.background}
      >
        {jokes.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map((joke, index, array) => {
          // if (index >= currentPage * pageSize && index <= currentPage * pageSize + pageSize) {
            return <Joke joke={joke}/>
          // } 
        })}
    </div>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return ({
    
    jokes: state.jokesReducer.jokes,
    jokesCount: state.jokesReducer.jokesCount,
  })
}

export default connect(mapStateToProps)(JokesWrapper);