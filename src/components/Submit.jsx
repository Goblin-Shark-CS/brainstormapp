import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEntry, toggleVote } from "../mainSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { loadChat } from '../mainSlice'; // [AFS] brought over from chatbox
const webSocket = new WebSocket('ws://localhost:443/'); // [AFS] brought over from chatbox

function Submit() {
  
  const dispatch = useDispatch();
  const state = useSelector((state) => state.main);

  /**
   * [AFS] Brought over from chatbox; 
   */
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {  
    webSocket.addEventListener('open', () => {
      console.log('We are connected');
    });
    webSocket.send(JSON.stringify({ type: 'join' }));

    // [AFS] TODO: 
    // This should refresh the list of messages loaded on page. 
    // ... should this function be stored in Entries component? 
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
  }, []);
  /**
   *  END OF COPIED TEXT
   */

  function sendMessage(e) {
    e.preventDefault(); // prevent page reload on submit
    
    // [AFS] Because we have onChange action attached to textfield,
    // when we send message we read current state
    let message = {message: newMessage};
    // Build custom message
    message.type = "message";
    webSocket.send(JSON.stringify(message));
    console.log("Sending: ", message);
    dispatch(addEntry(message));
  }

  return (
    <Box component="form" display="flex">
      <Box width="100%" padding="0px 10px">
        <TextField 
          onChange={(e)=>{setNewMessage(e.target.value)}}
          fullWidth
          id="outlined-basic"
          label="Enter submission"
          variant="outlined"
          value={newMessage}
        />
      </Box>
      <Button 
        onClick={(e) => {
          sendMessage(e)
          setNewMessage('')
        }}
        variant="contained"
        sx={{ padding: "10px", margin: "5px 20px 5px 5px" }}
      >
        Post
      </Button>
    </Box>
  );
}

export default Submit;
