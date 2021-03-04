import React from 'react';
import { connect } from 'react-redux';
import CardColumns from 'react-bootstrap/CardColumns';
import axios from 'axios';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import './movies-list.scss';

const token = localStorage.getItem('token');
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, isProfile, user } = props;
  let filteredMovies = movies;

  function addFavorite(id) {
    console.log(id);
    axios
      .put(`https://ec-myflix-api.herokuapp.com/users/${user.username}/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log(response.data);
        // Couldn't find a way to remove from the view
      });
  }

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <VisibilityFilterInput className="visibility-filter" visibilityFilter={visibilityFilter} />
    <CardColumns>
      {filteredMovies.map(m => <MovieCard isProfile={isProfile} addFavorite={(id) => addFavorite(id)} removeFavorite={(id) => props.removeFavorite(id)} key={m._id} movie={m} />)}
    </CardColumns>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);
