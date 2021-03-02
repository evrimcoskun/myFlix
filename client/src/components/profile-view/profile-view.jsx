import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import MoviesList from '../movies-list/movies-list';

import './profile-view.scss';

export function ProfileView(props) {
  const { user, favorites } = props;

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  const token = localStorage.getItem('token');

  function updateUser(e) {
    e.preventDefault();
    if (password === '' || username === '') {
      console.error('Username or password cannot be empty');
    } else {
      axios.put(`https://ec-myflix-api.herokuapp.com/users/${user.username}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        const data = response.data;
        props.onUpdateUser(data);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  function deleteUser(e) {
    e.preventDefault();
    axios.delete(`https://ec-myflix-api.herokuapp.com/users/${user.username}`).then(response => {
      console.log(response.data);
      props.onDeleteAccount();
    }).catch(error => {
      console.error(error);
    });
  }

  function removeFavorite(id) {
    console.log(id);
    axios
      .delete(`https://ec-myflix-api.herokuapp.com/users/${user.username}/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log(response.data);
        // Couldn't find a way to remove from the view
      });
  }

  return (
    <React.Fragment>
      <h1>User profile</h1>
      <Form className="profile-form">
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="string" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="string" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="birthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="string" placeholder="Enter birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={updateUser}>Update</Button>{' '}
        <Button variant="danger" onClick={deleteUser}>Delete Account</Button>{' '}
      </Form>
      <h2>Favorites</h2>
      {favorites.length > 0 ?
        <MoviesList movies={favorites} isProfile={true} removeFavorite={(id) => removeFavorite(id)} />
        : 'No favorites!'
      }

    </React.Fragment>
  );
}
