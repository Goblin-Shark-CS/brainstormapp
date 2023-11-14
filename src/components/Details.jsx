import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Box, TextField, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QRCode from "react-qr-code";

export default function Details() {
  const dispatch = useDispatch();

  const url = window.location.toString();

  const CopyToClipboardButton = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(true);
      navigator.clipboard.writeText(url);
    };

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
    );
  };

  return (
    <Box
      display="flex"
      alignContent="center"
      justifyContent="center"
      height="80%"
    >
      <Box
        width="60%"
        margin="auto"
        textAlign="center"
        color="#999"
        fontSize="24px"
      >
        <p>
          <Typography variant="h5" color="inherit" component="div">
            Share the link below:
          </Typography>
        </p>
        <Box display="flex">
          <Box width="100%" padding="0px 10px">
            <TextField
              fullWidth
              id="standard-read-only-input"
              label=""
              defaultValue={url}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </Box>
          <br />
          <br />
          <CopyToClipboardButton />
        </Box>
        <div
          style={{
            height: "auto",
            margin: "50 0 0 0",
            maxWidth: 400,
            width: "100%",
            opacity: 0.4,
          }}
        >
          <QRCode
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={url}
          />
        </div>
      </Box>
    </Box>
  );
}
