import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} className="movie-poster" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>
            {movie.Description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem><b>Genre:</b> <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></ListGroupItem>
          <ListGroupItem><b>Director:</b> <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Link to={'/'}>
            <Button variant="outline-primary">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
