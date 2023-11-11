import React, {useEffect, useState} from 'react';


const webSocket = new WebSocket('ws://localhost:443/');

export default function Chatbox() {
    const [messages, setMessages] = useState([]);

    useEffect( () => {
        webSocket.onmessage = (event) => {
            console.log(event)
            // Update state: Add message from server to list of messages.
            // Server format: {"response": String }
            const parsedMsg = JSON.parse(event.data);
            setMessages(lastMessages => [...lastMessages, parsedMsg.response])
        };
        webSocket.addEventListener("open", () => {
            console.log("We are connected");
        });
    }, []);

    function sendMessage(e) {
        // Submit chat message to server
        // Form submission: Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form).entries()
        let message = Object.fromEntries(formData);

        // Build custom message
        message.type = 'message';

        webSocket.send(JSON.stringify(message));
        console.log('Sending: ', message);
    }

    return ( <>
    <form onSubmit={sendMessage}>
        <label name="message">Enter Message:</label>
        <input type="text" id="message" autoComplete="off" name="message" /><br/>
        <input type="submit" value="Send"/>
    </form>
    <div id="messages">{messages.map(message => (<div>Message from server: {message}<br/></div>))}</div>
    </>
  );
}