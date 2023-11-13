import { setInitialState, addEntry, toggleVote } from "./mainSlice";

export default class ClientSocket {

  /**
   * Open a connection.
   * @constructor
   * @param Function dispatch
   * @param String websocketURL
   */
  constructor(dispatch, websocketURL) {
    console.trace('Creating new Websocket.');
    // Attach to Redux store to dispatch actions.
    this.dispatch = dispatch;

    // Create a new WebSocket connection
    this.socket = new WebSocket(websocketURL);
    this.socket.onopen = this.onOpen;
    this.socket.onclose = this.onClose;
    this.socket.onmessage = this.onMessage;
  }


  /**
   * Sending API
   */

  // Request initial room data from server
  // TODO: Grab user_id from session
  join = (user_id = null) => {
    this.socket.send(JSON.stringify({ type: 'join', user_id }))
  }

  // Send entry to server
  sendEntry = (entry) => {
    const type = 'entry';
    const message = JSON.stringify({type, entry});
    console.log("Sending: ", message);
    this.socket.send(message);
  }


  /**
   * Event API
   */
  onOpen    = (event) => {
    console.log( "Server connected: ", event );
    this.join();
  };
  onClose   = (event) => { console.log( "Socket closed: ", event )};
  onMessage = (event) => {
    let message;
    try {
      message = JSON.parse(event.data);
      console.log('Received Message: ', message);
    }
    catch (err) {
      return console.log('Could not parse message data: ', event.data)
    }

    switch (message.type) {
      case 'init':
        console.log("Init message. State: ", message.state);
        this.dispatch(setInitialState(message.state));
        break;
      case 'entry':
        console.log('New entry: ', message.entry);
        this.dispatch(addEntry(message.entry));
        break;
      default:
        return console.log('Unknown message type: ', message.type);
    }
  };
};