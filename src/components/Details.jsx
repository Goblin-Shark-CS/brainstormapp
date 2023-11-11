import React from "react";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";
import { Button, Snackbar } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Details() {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries);

  const CopyToClipboardButton = () => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(window.location.toString() + "goblin-shark")
    }
    
    return (
        <>
          <ContentCopyIcon onClick={handleClick} />
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

  return (
    <Box display="flex" alignContent="center" justifyContent="center" height="80%">
      <Box width="60%" margin="auto" textAlign="center" color="#999" fontSize="24px">
        <p>Share the link below:</p>
        <Box display="flex">
          <Box width="100%" padding="0px 10px">
            <TextField
              fullWidth
              id="standard-read-only-input"
              label=""
              defaultValue="http://localhost:8080/goblin-shark"
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            </Box>
          <CopyToClipboardButton />
        </Box>
        <br />
        <img src="https://imgur.com/n5PeKG9.png" height="300px" style={{opacity: 0.6}} />
      </Box>
    </Box>
  );
}
