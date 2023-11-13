import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { reducer1, reducer2, reducer3 } from "../mainSlice";
import { Button, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QRCode from "react-qr-code";

export default function Details() {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.main);
  const roomId = room ? room.room_id : "";

  const url = "http://10.0.11.113:8080/" + roomId;

  const CopyToClipboardButton = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(true);
      navigator.clipboard.writeText(
        window.location.toString() + "goblin-shark"
      );
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
        <p>Share the link below:</p>
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
            margin: "50 auto",
            maxWidth: 400,
            width: "100%",
            opacity: 0.4,
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={url}
            viewBox={`0 0 256 256`}
          />
        </div>
      </Box>
    </Box>
  );
}
