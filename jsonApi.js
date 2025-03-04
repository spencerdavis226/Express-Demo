const express = require('express');
const app = express();
app.use(express.json());

// CANDY STORE API
const CANDIES = [
  { name: 'snickers', qty: 43, price: 1.5 },
  { name: 'skittles', qty: 26, price: 0.99 },
];

app.get('/candies', (req, res) => {
  // res.send(CANDIES); // Determines what object type should be depending on what we pass it. We can be more literal
  res.json(CANDIES); // Explicitly send json
});

// Allow users to add new candies
app.post('/candies', (req, res) => {
  // Can block certain post requests
  if (req.body.name.toLowerCase() === 'circus peanuts') {
    res
      .status(403)
      .json({ msg: 'HORRIBLE CHOICE. CIRCUS PEANUTS ARE FORBIDDEN' });
  }

  CANDIES.push(req.body);
  res.status(201).json(CANDIES); // Can tack on res.status() to specify response codes
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
