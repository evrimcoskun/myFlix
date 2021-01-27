import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      registerView: false
    };
  }

  componentDidMount() {
    axios.get('https://ec-myflix-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    })
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    })
  }

  onLoggedIn(user) {
    this.setState({
      user
    })
  }

  onRegisterView() {
    this.setState({
      registerView: true
    });
  }

  render() {
    const { movies, selectedMovie, user, registerView } = this.state;

    if (!user) {
      if (registerView) {
        return (
          <Container>
            <RegisterView onRegister={() => console.log('Registered')} />
          </Container>
        )
      } else {
        return (
          <Container>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterView={() => this.onRegisterView()} />
          </Container>
        );
      }
    }
    if (!movies) return (
      <Container>
        <div className="main-view" />
      </Container>
    );

    return (
      <div className="main-view">
        <Container>
          <CardColumns>
            {
              selectedMovie
                ? <MovieView movie={selectedMovie} onClick={() => this.onBackClick()} />
                : movies.map(movie => (
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                ))
            }
          </CardColumns>
        </Container>
      </div>
    );
  }
}