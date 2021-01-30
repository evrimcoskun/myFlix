import React from 'react';
import { MovieListView } from '../movie-list-view/movie-list-view';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;
    return (
      <React.Fragment>
        <h1>{genre.Name}</h1>
        <div className="genre-info">
          <p>{genre.Description}</p>
        </div>
        <h3>Movies in this genre</h3>
        <MovieListView movies={movies} />
      </React.Fragment>
    );
  }
}
