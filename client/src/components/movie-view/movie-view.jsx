import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

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
          <ListGroupItem><b>Genre:</b> {movie.Genre.Name}</ListGroupItem>
          <ListGroupItem><b>Director:</b> {movie.Director.Name}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant="outline-primary" onClick={onClick}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}