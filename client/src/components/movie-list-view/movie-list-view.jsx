import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';

import { MovieCard } from '../movie-card/movie-card';

export function MovieListView(props) {
  const { movies, isProfile } = props;

  return (
    <CardColumns>
      { movies.map(m => <MovieCard isProfile={isProfile} removeFavorite={(id) => props.removeFavorite(id)} key={m._id} movie={m} />)}
    </CardColumns>
  );

}
