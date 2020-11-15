const express = require('express');
const morgan = require('morgan');
const app = express();

let topMovies = [
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
app.get('/', (req, res) => {
  res.send('Hello! These are my top movies.');
});

app.get('/documentation', (req,res) => {
  res.sendFile('public/documentation.html', { root: __dirname
  });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
