const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
require('./passport');

const Movies = Models.Movie;
const Users = Models.User;

// let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

// mongoose
//   .connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true })
//   .catch(err => {
//     console.error(err);
//   });

mongoose
  .connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.error(err);
  });

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));
app.use(cors({
  origin: '*'
}));

let auth = require('./auth')(app);

// GET requests
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find().then(movies => {
    res.status(200).json(movies);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.title }).then(movie => {
    res.status(200).json(movie);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

app.get('/genres/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(genres.find((genre) => { return genre.name === req.params.name; }));
});

app.get('/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(directors.find((director) => { return director.name === req.params.name; }));
});

app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

app.post('/users', [
  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be a valid email').isEmail()
], (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }).then(user => {
          res.status(201).json(user);
        }).catch(err => {
          console.error(err);
          res.status(500).send('Error: ' + err);
        });
      }
    });
});

app.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.put('/users/:username/favorites/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    {
      $push: {
        Favorites: req.params.id
      }
    },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.send('Movie ' + req.params.id + ' was added to user: ' + req.params.username + '\'s favorites.');
      }
    }
  );
});

app.delete('/users/:username/favorites/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    {
      $pull: {
        Favorites: req.params.id
      }
    },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.send('Movie ' + req.params.id + ' was removed from user: ' + req.params.username + '\'s favorites.');
      }
    }
  );
});

app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found.');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    }).catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
