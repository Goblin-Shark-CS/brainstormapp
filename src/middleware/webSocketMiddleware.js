import {
  setInitialState,
  addEntry,
  incrementVote,
  toggleVote,
} from '../mainSlice';

/**
 * This middleware is a singleton object for the websocket to live in.
 *
 * It is able to intercept actions, as well as provide a store.dispatch() for websocket event handlers.
 * It might be better to refactor this to make it more type-safe and keep the Websockets API in a single file.
 * (Currently, we have to construct WEBSOCKET_SEND actions in a few different places.)
 *
 * https://wanago.io/2021/12/20/redux-middleware-websockets/
 * https://www.taniarascia.com/websockets-in-redux/
 *
 *  */



export default function webSocketMiddleware(wsUrl) {
  let socket = null;

  const onOpen = (store) => (event) => {
    // This callback is triggered by the socket. It notifies us that we are now able to send messages.
    console.log('We are connected!');
    // Read the user_id and room_id from cookies. These should exist by the time we have launched index.js.
    const cookies = Object.fromEntries(
      document.cookie.split('; ').map((c) => c.split('='))
    );
    const { user_id, room_id } = cookies;

    // Identify our Websocket to the server
    socket.send(JSON.stringify({ type: 'join', user_id, room_id }));
  };

  const onClose = (store) => (event) => {/* Unused */};

  const onMessage = (store) => (event) => {
    /**
     * Main message handler.
     * First parse the JSON, then handle it.
     * Getting all the response types correct would be a lot easier with Typescript.
     * */

    //
    let message;
    console.log('Received Message: ', event);
    try {
      message = JSON.parse(event.data);
    } catch (err) {
      return console.log('Could not parse message data: ', event.data);
    }

    switch (message.type) {
      case 'init':
        console.log('Init message. State: ', message.state);
        store.dispatch(setInitialState(message.state));
        break;
      case 'entry':
        console.log('New entry: ', message.entry);
        store.dispatch(addEntry(message.entry));
        break;
      case 'vote':
        console.log('New vote');
        //dispatch an action that changes number
        store.dispatch(incrementVote(message.entry));
      default:
        return console.log('Unknown message type: ', message.type);
    }
  };

  return (store) => (next) => (action) => {
    switch (action.type) {
      case 'WEBSOCKET_CONNECT':
        console.log('RUN WEBSOCKET_CONNECT');
          if (socket === null) {

          // Create a new WebSocket connection
          socket = new WebSocket(wsUrl);
          socket.onopen = onOpen(store);
          socket.onclose = onClose(store);
          socket.onmessage = onMessage(store);
        }
        break;
      case 'WEBSOCKET_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case 'WEBSOCKET_SEND':
        if (socket !== null) {
          socket.send(JSON.stringify(action.payload));
        }
        break;
      default:
        return next(action);
    }
  };
}
