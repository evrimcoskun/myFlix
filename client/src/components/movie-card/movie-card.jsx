import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {

  render() {
    const { movie, isProfile } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-primary">Open</Button>
          </Link>{' '}
          {isProfile ? <Button variant="outline-danger" onClick={() => this.props.removeFavorite(movie._id)}>Remove</Button> : <Button variant="outline-secondary" onClick={() => this.props.addFavorite(movie._id)}>Add to Favorites</Button>}
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};
