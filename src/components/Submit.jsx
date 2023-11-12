import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEntry, toggleVote } from "../mainSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Submit() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.main);

  function sendMessage(e) {
    e.preventDefault(); // prevent page reload on submit

    // Read the form data
    const form = e.target;
    const formData = new FormData(form).entries();
    let message = Object.fromEntries(formData);

    // Build custom message
    message.type = "message";
    webSocket.send(JSON.stringify(message));
    console.log("Sending: ", message);
  }

  return (
    <Box component="form" display="flex">
      <Box width="100%" padding="0px 10px">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Enter submission"
          variant="outlined"
        />
      </Box>
      <Button
        variant="contained"
        sx={{ padding: "10px", margin: "5px 20px 5px 5px" }}
      >
        Post
      </Button>
    </Box>
  );
}

export default Submit;
