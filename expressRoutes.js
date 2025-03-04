const express = require('express');
const app = express();

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

app.get('/greet/:language', (req, res) => {
  const lang = req.params.language;
  const greeting = greetings[lang];
  res.send(greeting);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
