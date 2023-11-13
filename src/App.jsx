import React from "react";
import { useDispatch } from "react-redux";
import Entries from "./components/Entries.jsx";
import Submit from "./components/Submit.jsx";
import Details from "./components/Details.jsx";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { positions } from '@mui/system';

// TO DO: media query to hide details container and expand entries/submit container when width < XXpx
// TO DO: share button on right of AppBar (invokes iOS/Android share dialogue on mobile, copies to clipboard on desktop)
export default function App() {
  const dispatch = useDispatch();


  React.useEffect( () => {
    dispatch({type: 'WEBSOCKET_CONNECT'});
  })
  
  return (
    <Box display="flex" height="100vh" flexDirection="column">
      <AppBar position="absolute"> {/** Changed from static to absolute */}
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
      
      {/* BODY */} 
      <Box 
        display="flex"
        height="100%"
        sx = {{
          flexDirection: {xs: 'column', sm: 'row'},
          justifyContent: 'space-between',
        }}
      >
        
        {/** Messages Area */}
        <Box
          display="flex"
          flexDirection="column"
          // width="60%"
          overflow="hidden"
          height="100%"
          sx = {{
            width: {xs: '100%', sm: '60%'},
          }}
          backgroundColor="#f6f6f6"
        >
          {/** Entries Area */}
          <Box 
            height="100%" 
            overflow="scroll"
            marginTop="50px"
          >
            <Entries />
          </Box>
          
          {/** Post Button Area */}
          <Box 
            height="75px"
          >
            <Submit />
          </Box>
        </Box>
        
        {/** QR Code Area */}
        <Box 
          backgroundColor="#eee"
          sx = {{
            width: {xs: '100%', sm: '40%'},
            display: {xs: 'none', sm: 'block'}
          }}
        >
          <Details />
        </Box>

      </Box>

    </Box>
  );
}
