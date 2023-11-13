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

const roomController = require('./controllers/room/roomController.js');
const sessionController = require('./controllers/user/sessionController.js');
const sqlFunctions = require('./sqlFunctions.js');

/**
 * API Routes
 */

// Creates a new room then redirects client to the room.
app.use('/start', roomController.createRoom, (req, res) => {
  dbg('Creating room: ', res.locals.roomId);
  // redirect user to newly created room
  res.redirect(`/join/${res.locals.roomId}`);
});

// Creates a new user, stores the user_id in the client's cookies, then shows main app
app.use('/join/:roomId', sessionController.createUser, (req, res) => {
  dbg('Request to join room: ', req.params.roomId);
  res.cookie('user_id', res.locals.user_id);
  res.cookie('room_id', req.params.roomId);
  res.status(200).sendFile(path.join(__dirname, '../dist/app.html'));
});

/**
 * Static Pages
 */
app.use('/bundle.js', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index_bundle.js'));
});

app.get('/', (req, res) => {
  dbg('Request to main page.');
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
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
  dbg('Unknown request: ', req.path);
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */

const defaultErr = {
  log: 'Express error handler caught unknown middleware error',
  status: 500,
  message: { err: 'An error occurred' },
};

function errorHandler(err, req, res, next) {
  const errorObj = Object.assign({}, defaultErr, err);
  dbg(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
}
app.use(errorHandler);

app.listen(PORT, () => {
  dbg(`Listening on port ${PORT}...`);
});

// initialState: {
//   user_id: null,
//   room: {},      // {room_id, roomname}
//   entries: []    // [{entry_id, voteCount, userVote, message}, ...]
// },

const initialState = {
  user_id: null,
  room_id: null,
  entries: [
    {
      id: 0,
      text: 'The first brainstorm idea (From Server)',
      voteCount: 0,
      userVote: false,
    },
    {
      id: 1,
      text: 'The second brainstorm idea (From Server)',
      voteCount: 0,
      userVote: false,
    },
    {
      id: 2,
      text: 'The third brainstorm idea (From Server). Long: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      voteCount: 0,
      userVote: false,
    },
  ],
};

// Websocket server

const { WebSocketServer } = require('ws');
const wsserver = new WebSocketServer({ port: 443 });

wsserver.on('connection', (ws) => {
  // Try saving a cookie or session key to the ws object?
  // Initialize events for new client
  dbg('New client connected!');
  ws.session = { secret: 'Secret Info Here' };

  ws.on('close', () => dbg('Client has disconnected!'));

  ws.on('message', async (rawMessage) => {
    let message;
    try {
      message = JSON.parse(rawMessage);
    } catch (err) {
      return dbg('Could not parse message: ', rawMessage);
    }
    // Route data
    // TODO: Error handling
    let response;
    try {
      switch (message.type) {
        case 'join':
          // NOTE: Initial handshake is done in Express. Session must exist at this point.
          // TODO: Validate session.
          // TODO: Read state from the database on initial join.
          dbg('Client joined.');
          // Store properties on ws.session
          ws.session.user_id = message.user_id; /* TODO: Set this */
          ws.session.room_id = message.room_id;

          //send user all information about room by putting it in the state
          const entries = await sqlFunctions.getEntries(ws.session.room_id);
          entries.forEach((entry) => (entry.userVote = false));
          const state = {
            user_id: ws.session.user_id,
            room: { room_id: ws.session.room_id, room_name: null },
            entries,
          };

          const response = JSON.stringify({
            type: 'init',
            state,
          });
          ws.send(response);
          break;
        case 'entry':
          // Push message to the database here
          // Do we read it back from the database? Yes.
          // TODO: Create entry_id in database
          // TODO: send Message objects with unique ID values.
          let entry_id;
          await sqlFunctions
            .addEntry(message.entry, ws.session.room_id, ws.session.user_id)
            .then((entry) => {
              entry_id = entry._id;
            });
          const entryMessage = JSON.stringify({
            type: 'entry',
            entry: { text: message.entry, entry_id },
          });
          dbg(`distributing message: ${entryMessage}`);
          // Broadcast to all users
          // TODO: filter clients by room
          wsserver.clients.forEach((client) => {
            client.send(entryMessage);
          });
          break;
        case 'setUsername':
          // Allow changing username
          dbg('Set username request: ', message);
          break;
        case 'vote':
          //update database
          // message.add is true if should add vote. false if should delete
          if (message.add) {
            sqlFunctions.addVote(message.entry, ws.session.user_id);
          } else {
            sqlFunctions.deleteVote(message.entry, ws.session.user_id);
          }
          //sends to all clients new value
          const vote = JSON.stringify({
            type: 'vote',
            entry: { entry_id: message.entry, add: message.add },
          });
          wsserver.clients.forEach((client) => {
            client.send(vote);
          });
          break;
        default:
          return dbg('Unknown message: ', message);
      }
    } catch (err) {
      console.log(
        `ERROR: ${JSON.stringify(err)}. Unable to handle message: `,
        message
      );
    }
  });

  ws.onerror = function () {
    dbg('websocket error');
  };
});
