import React from "react";
import EntriesComponent from "./components/Entries.jsx";
import SubmitComponent from "./components/Submit.jsx";
import DetailsComponent from "./components/Details.jsx";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  return (
    <Box display={"flex"} height={"100vh"} flexDirection={"column"}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Room: goblin-shark
            </Typography>
          </Toolbar>
      </AppBar>
      <Box display={"flex"} height={"100%"}>
        <Box display={"flex"} flexDirection={"column"} width={"60%"}>
            <Box height={"100%"} overflow={"scroll"}>
              <EntriesComponent />
            </Box>
            <Box height={"75px"}>
              <SubmitComponent />
            </Box>
        </Box>
        <Box width={"40%"} backgroundColor={"#eee"}>
          <DetailsComponent />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
