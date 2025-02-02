const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beersArr = await punkAPI.getBeers()
  res.render('beers', {beersArr});
  console.log (beersArr);
});

app.get('/random-beer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom()
  res.render('random-beer', {randomBeer});
  console.log (randomBeer);
});

/*
app.get('/beers/:id', (req, res) => {
  punkAPI
  .getBeer(req.params.id)
  .then(beer => res.render('random-beer', { beer }))
  .catch(error => console.log(error));
});
*/


app.listen(3000, () => console.log('🏃‍ on port 3000'));
