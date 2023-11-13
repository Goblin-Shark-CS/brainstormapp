import React from "react";
import { useSelector, useDispatch } from "react-redux";
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

// TO DO: share button on right of AppBar (invokes iOS/Android share dialogue on mobile, copies to clipboard on desktop)
export default function App() {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.main);
  const room_name = room.roomname

  React.useEffect(() => {
    dispatch({ type: "WEBSOCKET_CONNECT" });
  }, []);

  function editRoomName(e) {
    console.log(e.target.textContent);
    let text = e.target.textContent;
    e.innerHTML = `<textarea id="roonName">${text}</textarea>`

  }


  return (
    <Box display="flex" height={window.innerHeight} flexDirection="column">
      <AppBar position="absolute">
        {" "}
        {/** Changed from static to absolute */}
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            color="inherit" 
            component="div" 
            sx = {{ display: 'flex', paddingRight: '5px' }}
          >
            <div style = {{ 
              paddingRight: '7px', 
              color: '#CCCCCC', 
            }}>Room:</div>
            {/* <div onClick={(e) => editRoomName(e)}>{room.roomname}</div> */}
            <div 
              contentEditable="true" 
              onClick={(e) => editRoomName(e)}
            >{room_name}</div>
            <div id="roomChangeStatus"></div>
          </Typography>

        </Toolbar>
      </AppBar>

      {/* BODY */}
      <Box
        display="flex"
        height="100%"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
        }}
      >
        {/** Messages Area */}
        <Box
          display="flex"
          flexDirection="column"
          // width="60%"
          overflow="hidden"
          height="100%"
          sx={{
            width: { xs: "100%", sm: "60%" },
          }}
          backgroundColor="#f6f6f6"
        >
          {/** Entries Area */}
          <Box
            height="100%"
            overflow="scroll"
            marginTop="50px"
            paddingBottom="50px"
            sx={{
              // other styles you might want to add
              maskImage:
                "linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)",
            }}
          >
            <Entries />
          </Box>

          {/** Post Button Area */}
          <Box height="75px">
            <Submit />
          </Box>
        </Box>

        {/** QR Code Area */}
        <Box
          backgroundColor="#eee"
          sx={{
            width: { xs: "100%", sm: "40%" },
            display: { xs: "none", sm: "block" },
          }}
        >
          <Details />
        </Box>
      </Box>
    </Box>
  );
}
