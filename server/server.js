/* Server setup */
const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const CONFIG = require(path.join(__dirname, 'config.js'));
const PORT = CONFIG.PORT;


/**
 * API Routes
 */


app.use('/start',
// Create room
// Set cookie
// Validate
(req, res) => {
  console.log('Creating room: ', res.locals.roomId);
  res.sendStatus(200)
})


app.use(
  '/join/:roomId',
  /* Match room ID */
  /* Create session cookie */
  (req, res) => {
    console.log('Request to join room: ', req.params.roomId);
    res.redirect(`/view/${req.params.roomId}`)
    res.sendStatus(200)
  }
)

app.use(
  '/view/:roomId',
  /* Validate session cookie */
  /* Send page */
  (req, res) => {
    console.log('Sending page: ', req.params.roomId);
})



/**
 * Static Pages
 */
app.use('/bundle.js', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index_bundle.js'));
});

app.get('/', (req, res) => {
  console.log('Request to main page.');
  return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});


/**
 * 404 handler
 */
app.use('*', (req, res) => {
  console.log("Unknown request: ", req.path);
  res.status(404).send('Not Found');
});


/**
 * Global error handler
 */

const defaultErr = {
  log: 'Express error handler caught unknown middleware error',
  status: 500,
  message: { err: 'An error occurred' }
};

function errorHandler (err, req, res, next) {
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
}
app.use(errorHandler);


app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });
