import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    props.onLoggedIn(username)
  }

  const OpenRegisterView = (e) => {
    e.preventDefault();
    props.onRegisterView();
  }

  return (
    <div className="login-view">
      <h1>Welcome to myFlix</h1>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="Submit" onClick={handleSubmit}>Submit</Button>{' '}
        <Button variant="secondary" onClick={OpenRegisterView}>Register</Button>
      </Form>
    </div>

  )
}