const express = require('express');
const app = express();
const ExpressError = require('./expressError'); // Custom Errors
app.use(express.json());

function attemptToSaveToDB() {
  throw 'Connection Error';
}

// app.use((req, res, next) => {
//   console.log('THE SERVER GOT A REQUEST');
//   next(); // Allows express to move on to the next matching route, and not just stop here
// });

const USERS = [
  { username: 'StacysMom', city: 'Reno' },
  { username: 'Rosalia', city: 'R' },
];

app.get('/users/:username', (req, res, next) => {
  try {
    const user = USERS.find((u) => u.username === req.params.username);
    if (!user) throw new ExpressError('Invalid username', 404); // Custom error for unknown user
    return res.send({ user });
  } catch (e) {
    next(e);
  }
});

app.get('/secret', (req, res, next) => {
  try {
    if (req.query.password != 'popcorn') {
      throw new ExpressError('invalid password', 403);
    }
    return res.send('CONGRATS YOU KNOW THE PASSWORD');
  } catch (e) {
    next(e);
  }
});

app.get('/savetodb', (req, res, next) => {
  try {
    attemptToSaveToDB();
    return res.send('SAVED TO DB');
  } catch (e) {
    return next(new ExpressError('Database Error', 500));
  }
});

// 404 ERROR HANDLING
app.use((req, res, next) => {
  const e = new ExpressError('Page Not Found', 404);
  next(e);
});

// ERROR HANDLER (4 parameters)
// that wont run if other route handlers run (like above), unless they have next() to allow them to proceed
app.use((err, req, res, next) => {
  // Setting defaults.
  // .status and .msg defined in our expressError.js that we imported. Must match!
  let status = err.status || 500;
  let message = err.msg;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
