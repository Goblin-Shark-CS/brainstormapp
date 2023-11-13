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


app.get('/index.html', (req, res) => {
  return res.redirect('/');
});


app.get('/style.css', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../src/style.css'));
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
      message: 'The first brainstorm idea (From Server)',
      voteCount: 0,
      userVote: null
    },
    {
      id: 1,
      message: 'The second brainstorm idea (From Server)',
      voteCount: 0,
      userVote: null
    },
    {
      id: 2,
      message: 'The third brainstorm idea (From Server). Long: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
  ws.session = "Secret";


  ws.on('close', () => dbg('Client has disconnected!'))

  ws.on('message', msg => {
    let parsedMsg;
    try {
      parsedMsg = JSON.parse(msg);
    }
    catch (err) {
      return dbg('Could not parse message: ', msg)
    }
    // Route data
    // TODO: Error handling
    let response;
    try {
      switch (parsedMsg.type) {
        case "join":

          // NOTE: We could do the join session with an initial Express request.

          // Validate session
          // Read state from the database on initial join
          // Store properties on ws.session
          dbg('Client joined.')
          ws.session.userId = parsedMsg.userId; /* TODO: Set this */
          response = JSON.stringify({ type: 'init', state: initialState });
          ws.send(response);
          break;
        case "message":

          // Note: we need to filter clients by room
          // Push message to the database here
          // Do we read it back from the database? Caching issues...
          // For now: try without sync and see if it causes problems
          // Simultaneously broadcast to clients
          const responseMsg = JSON.stringify({ type: 'message', response: parsedMsg.message });
          dbg(`distributing message: ${responseMsg}`)
          wsserver.clients.forEach(client => {
            client.send(responseMsg);
            dbg("ws.session: " + ws.session);
          })
          break;
        case "setUsername":
          // Allow changing username
          break;
        default:
          return dbg('Unknown message: ', parsedMsg);
      }
    }
    catch (err) {
      console.log(`ERROR: ${JSON.stringify(err)}. Unable to handle message: `, parsedMsg);
    }
  })


  ws.onerror = function () {
    dbg('websocket error')
  }
})
