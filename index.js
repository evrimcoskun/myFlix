const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();

app.use(bodyParser.json());

let movies = [
  {
    title: 'Sense and Sensibility',
    director: 'Ang Lee'
  },
  {
    title: 'Mansfield Park',
    director: 'Patricia Rozema'
  },
  {
    title: 'Far from the Madding Crowd',
    director: 'Thomas Vinterberg'
  },
  {
    title: 'Marie Antoinette',
    director: 'Sofia Coppola'
  },
  {
    title: 'Lost in Translation',
    director: 'Sofia Coppola'
  },
  {
    title: 'The Governess',
    director: 'Sandra Goldbacher'
  },
  {
    title: 'Dangerous Liaisons',
    director: 'Stephen Frears'
  },
  {
    title: 'Devdas',
    director: 'Sanjay Leela Bhansali'
  },
  {
    title: 'Crouching Tiger, Hidden Dragon',
    director: 'Ang Lee'
  },
  {
    title: 'Oscar and Lucinda',
    director: 'Gillian Armstrong'
  }
]

app.use(morgan('common'));

// GET requests
app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});

app.get('/genres/:name', (req, res) => {
  res.json(genres.find((genre) =>
    { return genre.name === req.params.name }));
});

app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) =>
    { return director.name === req.params.name }));
});

app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

app.put('/users/:username/:password/:email/:dateofbirth', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });
  res.send('User Updated.')
});

app.get('/documentation', (req,res) => {
  res.sendFile('public/documentation.html', { root: __dirname
  });
});

app.put('/users/:username/favorites/:title', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });
  user.favorites.push(req.body)
  res.send('Favorite Updated.')
});

app.delete('/users/:username/favorites/:title', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });
  res.send('Favorite Deleted.')
});

app.delete('/users/:id', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('User ' + req.params.id + ' was deleted.');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


//listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
