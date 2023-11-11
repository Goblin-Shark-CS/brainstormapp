import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChat } from '../mainSlice';

const webSocket = new WebSocket('ws://localhost:443/');
// TODO: Convert to 2 spaces

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    webSocket.onmessage = (event) => {
      // Update state: Add message from server to list of messages.
      const parsedMsg = JSON.parse(event.data);
      console.log(parsedMsg);
      switch (parsedMsg.type) {
        case 'init':
          console.log('Init message. State: ', parsedMsg.state);
          dispatch(loadChat(parsedMsg.state));
          break;
        case 'message':
          // Server format: {"response": String }
          setMessages((lastMessages) => [...lastMessages, parsedMsg.response]);
          console.log('New message');
          break;
      }
    };
    webSocket.addEventListener('open', () => {
      console.log('We are connected');
    });
    webSocket.send(JSON.stringify({ type: 'join' }));
  }, []);

  function sendMessage(e) {
    // Submit chat message to server
    // Form submission: Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form).entries();
    let message = Object.fromEntries(formData);

    // Build custom message
    message.type = 'message';

    webSocket.send(JSON.stringify(message));
    console.log('Sending: ', message);
  }

  return (
    <>
      <form onSubmit={sendMessage}>
        <label name="message">Enter Message:</label>
        <input type="text" id="message" autoComplete="off" name="message" />
        <br />
        <input type="submit" value="Send" />
      </form>
      <div id="messages">
        {messages.map((message) => (
          <div>
            Message from server: {message}
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
