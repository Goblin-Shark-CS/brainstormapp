import React from "react";
import Entries from "./components/Entries.jsx";
import Submit from "./components/Submit.jsx";
import Details from "./components/Details.jsx";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

// TO DO: media query to hide details container and expand entries/submit container when width < XXpx
// TO DO: share button on right of AppBar (invokes iOS/Android share dialogue on mobile, copies to clipboard on desktop)
export default function App() {
  return (
    <Box display="flex" height="100vh" flexDirection="column">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Room: goblin-shark
          </Typography>
        </Toolbar>
      </AppBar>
      <Box display="flex" height="100%">
        <Box
          display="flex"
          flexDirection="column"
          width="60%"
          backgroundColor="#f6f6f6"
        >
          <Box height="100%" overflow="scroll">
            <Entries />
          </Box>
          <Box height="75px">
            <Submit />
          </Box>
        </Box>
        <Box width="40%" backgroundColor="#eee">
          <Details />
        </Box>
      </Box>
    </Box>
  );
}
