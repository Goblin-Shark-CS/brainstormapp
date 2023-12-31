/* Server setup */
const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use('/assets', express.static('src/assets'));

const { PRODUCTION, PORT } = require('./config.js');

// dbg() is console.log
const { errMsg, dbg } = require('./logging.js');

const roomController = require('./controllers/room/roomController.js');
const sessionController = require('./controllers/user/sessionController.js');
const sqlFunctions = require('./sqlFunctions.js');

/**
 * Initializing the Websocket connection is done as follows.
 *
 * To create a new room the user sends an Express HTTP request to to /start. The server will respond with a room name.
 * The user is forwarded to the Express route /join/room-name, which creates a cookie with their user_id.
 * Finally, the user sends a Websocket 'join' message to the server with their user_id.
 * The server sends with an 'init' message containing the room state.
 *
 * Other users can send a request to /join/room-name and just get their own ID. This is what we use for the QR code.
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

app.use('/login.bundle.js', (req, res) => {
  console.log(__dirname);
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../dist/login.bundle.js'));
});

app.use('/app.bundle.js', (req, res) => {
  console.log(__dirname);
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../dist/app.bundle.js'));
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

/**
 * Websocket server
 *
 * Here we launch a Websocket server in parallel with the Express server. This server works slightly differently than HTTP.
 * Instead of sending Requests and receiving Responses, either the server or the client can send a Message to the other at any time.
 *
 * The raw message can be in any format. By convention, both the client and server send JSON objects.
 * To handle "routing", we look at the property `message.type`. We have 'join', 'entry', 'vote', and so on.
 *
 * One of the toughest parts of this is carefully matching the property names between the front and the back end.
 * Another part is following the data flow. Since there's no fetch().then().then() interaction chain, the back and forth is a bit scattered.
 *
 * The steps for 'init' are described above.
 *
 *  */

const { WebSocketServer } = require('ws');
const wsserver = new WebSocketServer({ port: 443 });

wsserver.on('connection', (ws) => {
  // The ws object will be created for each client.
  // This object is persistent and we can store properties on it, like user_id and room_id.
  // Those properties will also be available when we iterate using wsserver.clients.forEach()
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
    // TODO: Error handling
    let response;
    try {
      switch (message.type) {
        case 'join':
          // NOTE: Initial handshake is done in Express. user_id must exist at this point.
          dbg('Client joined.');
          // Store properties on ws.session
          ws.session.user_id = message.user_id;
          ws.session.room_id = message.room_id;

          //send user all information about room by putting it in the state.
          const entries = await sqlFunctions.getEntries(ws.session.room_id);
          // add userVote property to each vote.
          const room = await sqlFunctions.getRoom(ws.session.room_id);
          entries.forEach((entry) => (entry.userVote = false));
          // add voteCount property to each vote.
          for (let i = 0; i < entries.length; i++) {
            entries[i].voteCount = await sqlFunctions.getVoteCount(
              entries[i]._id
            );
            console.log('VOTE COUNTS:', entries[i].voteCount);
          }

          const state = {
            user_id: ws.session.user_id,
            room,
            entries,
          };

          const response = JSON.stringify({
            type: 'init',
            state,
          });
          ws.send(response);
          break;
        case 'entry':
          // We have received a message from the client.
          // Do we read it back from the database? Yes.
          // TODO: Create entry_id in database
          // TODO: send Message objects with unique ID values.
          let _id;
          await sqlFunctions
            .addEntry(message.entry, ws.session.room_id, ws.session.user_id)
            .then((entry) => {
              _id = entry._id;
            });
          const entryMessage = JSON.stringify({
            type: 'entry',
            entry: { text: message.entry, _id },
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
          /* NOT IMPLEMENTED */
          dbg('Set username request: ', message);
          break;
        case 'vote':
          // Add vote.
          // Consistency is enforced on database side by uniqueness.
          // message.add is true if should add vote. false if should delete
          if (message.add) {
            sqlFunctions.addVote(message.entry, ws.session.user_id);
          } else {
            sqlFunctions.deleteVote(message.entry, ws.session.user_id);
          }
          //sends to all clients new value
          const vote = JSON.stringify({
            type: 'vote',
            entry: { _id: message.entry, add: message.add },
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

  ws.onerror = function (err) {
    dbg('WEBSOCKET ERROR: ', err);
  };
});
