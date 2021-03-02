import React from 'react';
import { connect } from 'react-redux';
import CardColumns from 'react-bootstrap/CardColumns';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import './movies-list.scss'

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, isProfile } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <VisibilityFilterInput className="visibility-filter" visibilityFilter={visibilityFilter} />
    <CardColumns>
      {filteredMovies.map(m => <MovieCard isProfile={isProfile} removeFavorite={(id) => props.removeFavorite(id)} key={m._id} movie={m} />)}
    </CardColumns>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);
