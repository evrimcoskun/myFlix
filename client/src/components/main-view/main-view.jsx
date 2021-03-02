import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../register-view/register-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      user: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: {
          username: localStorage.getItem('username'),
          email: localStorage.getItem('email'),
          birthday: localStorage.getItem('birthday'),
          favorites: JSON.parse(localStorage.getItem('favorites')),
        },
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    this.setState({
      user: {
        username: authData.user.Username,
        email: authData.user.Email,
        birthday: authData.user.Birthday,
        favorites: authData.user.Favorites,
      },
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', authData.user.Username);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);
    localStorage.setItem('favorites', JSON.stringify(authData.user.Favorites));

    this.getMovies(authData.token);
  }

  onRegister(userData) {
    window.open('/client', '_self');
  }

  onUpdateUser(userData) {
    this.setState({
      user: {
        username: userData.Username,
        email: userData.Email,
        birthday: userData.Birthday,
        favorites: userData.Favorites,
      },
    });

    localStorage.setItem('username', userData.Username);
    localStorage.setItem('email', userData.Email);
    localStorage.setItem('birthday', userData.Birthday);
    localStorage.setItem('favorites', JSON.stringify(userData.Favorites));
  }

  getMovies(token) {
    axios.get('https://ec-myflix-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    localStorage.clear();
    window.open('/client', '_self');
  }

  render() {
    const { movies } = this.props;
    const { user } = this.state;

    if (!user) {
      return (
        <Router basename="/client">
          <Container className="main-view">
            <Route exact path="/" render={() => <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />} />
            <Route path="/register" render={() => <RegisterView onRegister={(user) => this.onRegister(user)} />} />
          </Container>
        </Router>
      );
    }
    if (!movies) {
      return (
        <Container className="main-view" />
      );
    }

    return (
      <Router basename="/client">
        <Container className="main-view">
          {user
            ? (
              <div className="top-links">
                <Link to="/profile"><Button variant="outline-info">Profile</Button></Link>
                {' '}
                <Button variant="outline-secondary" onClick={this.logout}>Log out</Button>
              </div>
            ) : ''}
          <Route exact path="/" render={() => <MoviesList movies={movies} />} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find((m) => m._id === match.params.movieId)} />} />
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <Container className="main-view" />;
              return <DirectorView director={movies.find((m) => m.Director.Name === match.params.name).Director} movies={movies.filter((m) => m.Director.Name === match.params.name)} />;
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <Container className="main-view" />;
              return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} movies={movies.filter((m) => m.Genre.Name === match.params.name)} />;
            }}
          />
          <Route
            path="/profile"
            render={() => (
              <ProfileView
                user={this.state.user}
                onUpdateUser={(userData) => this.onUpdateUser(userData)}
                onDeleteAccount={() => this.logout()}
                favorites={movies.filter((m) => this.state.user.favorites.indexOf(m._id) >= 0)}
              />
            )}
          />
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({ movies: state.movies, users: state.user });

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
