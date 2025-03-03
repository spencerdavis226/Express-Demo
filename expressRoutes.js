// Boilerplate express code
const express = require('express');
const app = express();

app.get('/dogs', (req, res) => {
  res.send('<h1>WOOF WOOF</h1>');
});

// app.listen() should always be at the bottom of your file
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
