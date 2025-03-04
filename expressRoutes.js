// Boilerplate express code
const express = require('express');
const app = express();
// For request.body parsing
app.use(express.json()); // Without this, JSON requests to request.body would be empty.
app.use(express.urlencoded({ extended: true })); // Without this, form data requests to request.body would be empty.

app.get('/', (req, res) => {
  res.send('HOMEPAGE');
});

app.get('/dogs', (req, res) => {
  res.send('<h1>WOOF WOOF</h1>');
});

app.get('/chickens', (req, res) => {
  res.send('BOCK! BOCK! BOCK! (get request)');
});

app.post('/chickens', function createChicken(req, res) {
  res.send('YOU CREATED A NEW CHICKEN (post request');
});

const greetings = {
  en: 'hello',
  fr: 'bonjour',
  ic: 'hallo',
  ja: 'konnichiwa',
};

// REQUEST.PARAMS
app.get('/greet/:language', (req, res) => {
  const lang = req.params.language;
  const greeting = greetings[lang];
  if (!greeting) return res.send('INVALID LANGUAGE');
  return res.send(greeting.toUpperCase());
});

// REQUEST.QUERY
// /search?term=pigs&sort=cute in browser
// term and sort are arbitrary names
app.get('/search', (req, res) => {
  const { term, sort } = req.query;
  return res.send(`SEARCH PAGE! Term is ${term}, Sort is ${sort}`);
});

// REQUEST.HEADERS
app.get('/show-me-headers', (req, res) => {
  res.send(req.headers);
});

app.get('/show-language', (req, res) => {
  const lang = req.headers['accept-language'];
  res.send(`Your language preference is ${lang}`);
});

// REQUEST.BODY
app.post('/register', (req, res) => {
  res.send(req.body);
});

// app.listen() should always be at the bottom of your file
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
