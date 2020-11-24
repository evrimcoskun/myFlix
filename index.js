const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose
  .connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.error(err);
  });

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

// GET requests
app.get('/movies', (req, res) => {
  Movies.find().then(movies => {
    res.status(200).json(movies);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })

});

app.get('/movies/:title', (req, res) => {
  Movies.findOne({ Title: req.params.title }).then(movie => {
    res.status(200).json(movie);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

app.get('/genres/:name', (req, res) => {
  res.json(genres.find((genre) => { return genre.name === req.params.name }));
});

app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) => { return director.name === req.params.name }));
});

app.get('/users', (req, res) => {
  Users.find().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
})

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }).then(user => {
          res.status(201).json(user);
        }).catch(err => {
          console.error(err);
          res.status(500).send('Error: ' + err);
        })
      }
    });
});

app.put('/users/:username', (req, res) => {
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
  )
});

app.put('/users/:username/favorites/:id', (req, res) => {
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
  )
});

app.delete('/users/:username/favorites/:id', (req, res) => {
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
  )
});

app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found.')
      } else {
        res.status(200).send(req.params.username + ' was deleted.')
      }
    }).catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
