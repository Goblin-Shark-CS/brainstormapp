import { setInitialState, addEntry, toggleVote } from '../mainSlice';

export default function webSocketMiddleware(wsUrl) {
  let socket = null;

  const onOpen = (store) => (event) => {
    console.log('We are connected');
    const cookies = Object.fromEntries(
      document.cookie.split('; ').map((c) => c.split('='))
    );
    const { user_id, room_id } = cookies;
    // in server route can send a second param with userid
    // also send user_id //in server the join case sends intial state, make sure it has right info
    socket.send(JSON.stringify({ type: 'join', user_id, room_id }));
  };

  const onClose = (store) => (event) => {};

  const onMessage = (store) => (event) => {
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
