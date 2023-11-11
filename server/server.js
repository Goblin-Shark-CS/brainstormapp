/* Server setup */
const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const {PRODUCTION, PORT} = require('./config.js');

const { errMsg } = require('./logging.js');

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
  return res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
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



// Websocket server

const { WebSocketServer } = require('ws')
const wsserver = new WebSocketServer({ port: 443 })

wsserver.on('connection', ws => {
  // Try saving a cookie or session key to the ws object?
  // Initialize events for new client
  console.log('New client connected!')

  // Read state from the database on initial join
  //  ws.send(serialized_state);

  ws.on('close', () => console.log('Client has disconnected!'))
  ws.on('message', data => {
  let parsedData;

  try {
    parsedData = JSON.parse(data);
  }
  catch (err) {
    return console.log('Could not parse message: ', data)
  }
  // Route data
  // switch (data.type) { }

  // Note: we need to filter these sockets to make sure not every client

  // Push message to the database here

  // Do we read it back from the database? Optional: try without for now and see if it causes problems

  // Simultaneously broadcast to clients
  console.log(`distributing message: ${JSON.stringify(parsedData)}`)
   wsserver.clients.forEach(client => {
     client.send(`${JSON.stringify(parsedData)}`)
   })
 })
 ws.onerror = function () {
   console.log('websocket error')
 }
})
