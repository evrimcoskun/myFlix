import React from 'react';
import MoviesList from '../movies-list/movies-list';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;
    return (
      <React.Fragment>
        <h1>{director.Name}</h1>
        <div className="director-info">
          <p>{director.Bio}</p>
          <div><b>Date of birth:</b> {director.Birth}</div>
          {director.Death ?
            <div><b>Date of death:</b> {director.Death}</div>
            : ''
          }
        </div>
        <h3>Movies by the director</h3>
        <MoviesList movies={movies} />
      </React.Fragment>
    );
  }
}
