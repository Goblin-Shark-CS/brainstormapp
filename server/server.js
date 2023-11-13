/* Server setup */
const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const { PRODUCTION, PORT } = require('./config.js');

const { errMsg, dbg } = require('./logging.js');

/**
 * API Routes
 */


app.use('/start',
  // Create room
  // Set cookie
  // Validate
  (req, res) => {
    dbg('Creating room: ', res.locals.roomId);
    res.sendStatus(200)
  })


app.use(
  '/join/:roomId',
  /* Match room ID */
  /* Create session cookie */
  (req, res) => {
    dbg('Request to join room: ', req.params.roomId);
    res.redirect(`/view/${req.params.roomId}`)
  }
)

app.use(
  '/view/:roomId',
  /* Validate session cookie */
  /* Send page */
  (req, res) => {
    dbg('Sending page: ', req.params.roomId);
  })



/**
 * Static Pages
 */
app.use('/bundle.js', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index_bundle.js'));
});

app.get('/', (req, res) => {
  dbg('Request to main page.');
  return res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});


/**
 * 404 handler
 */
app.use('*', (req, res) => {
  dbg("Unknown request: ", req.path);
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

function errorHandler(err, req, res, next) {
  const errorObj = Object.assign({}, defaultErr, err);
  dbg(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
}
app.use(errorHandler);


app.listen(PORT, () => { dbg(`Listening on port ${PORT}...`); });





const initialState = {
  session: {},
  entries: [
    {
      id: 0,
      text: 'The first brainstorm idea (From Server)',
      voteCount: 0,
      userVote: null
    },
    {
      id: 1,
      text: 'The second brainstorm idea (From Server)',
      voteCount: 0,
      userVote: null
    },
    {
      id: 2,
      text: 'The third brainstorm idea (From Server). Long: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      voteCount: 0,
      userVote: null
    }
  ]
}



// Websocket server

const { WebSocketServer } = require('ws')
const wsserver = new WebSocketServer({ port: 443 })

wsserver.on('connection', ws => {
  // Try saving a cookie or session key to the ws object?
  // Initialize events for new client
  dbg('New client connected!')
  ws.session = {secret: "Secret Info Here"};


  ws.on('close', () => dbg('Client has disconnected!'))

  ws.on('message', rawMessage => {
    let message;
    try {
      message = JSON.parse(rawMessage);
    }
    catch (err) {
      return dbg('Could not parse message: ', rawMessage)
    }
    // Route data
    // TODO: Error handling
    let response;
    try {
      switch (message.type) {
        case "join":
          // NOTE: Initial handshake is done in Express. Session must exist at this point.
          // TODO: Validate session.
          // TODO: Read state from the database on initial join.
          dbg('Client joined.')
          // Store properties on ws.session
          ws.session.user_id = message.user_id; /* TODO: Set this */
          response = JSON.stringify({ type: 'init', state: initialState });
          ws.send(response);
          break;
        case "entry":
          // Push message to the database here
          // Do we read it back from the database? Yes.
          // TODO: Create message_id in database
          // TODO: send Message objects with unique ID values.
          const entryMessage = JSON.stringify({ type: 'entry', entry: {text: message.entry, entry_id: null }});
          dbg(`distributing message: ${entryMessage}`)
          // Broadcast to all users
          // TODO: filter clients by room
          wsserver.clients.forEach(client => { client.send(entryMessage); })
          break;
        case "setUsername":
          // Allow changing username
          dbg('Set username request: ', message);
          break;
        default:
          return dbg('Unknown message: ', message);
      }
    }
    catch (err) {
      console.log(`ERROR: ${JSON.stringify(err)}. Unable to handle message: `, message);
    }
  })


  ws.onerror = function () {
    dbg('websocket error')
  }
})
