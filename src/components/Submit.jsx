import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClientSocket from '../clientSocket';

let socket;

function Submit() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.main);

  // TODO: Build websocket url from current URL instead of localhost
  useEffect( () => {
    console.log
    socket = new ClientSocket(dispatch, 'ws://localhost:443/');
  }, []);

  function sendMessage(e) {
    console.log("Sending message");
    e.preventDefault(); // prevent page reload on submit

    const formData = new FormData(e.target);

    // Read simple form data:
    // socket.sendEntry(formData.get('entryText'));

    // Read all form data:
    let formContents = Object.fromEntries(formData.entries());
    console.log('Submitting form data: ', formContents);
    socket.sendEntry(formContents.entryText);

    // Clear form
    e.target.reset();
  }

  return (
    <Box component="form" display="flex" onSubmit={sendMessage}>
        <Box width="100%" padding="0px 10px">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Enter submission"
            name="entryText"
            variant="outlined"
          />
        </Box>
        <Button
          variant="contained"
          sx={{ padding: "10px", margin: "5px 20px 5px 5px" }}
          type="submit"
        >
          Post
        </Button>
    </Box>
  );
}

export default Submit;
