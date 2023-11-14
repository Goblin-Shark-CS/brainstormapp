import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Entries from "./components/Entries.jsx";
import Submit from "./components/Submit.jsx";
import Details from "./components/Details.jsx";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// TO DO: share button on right of AppBar (invokes iOS/Android share dialogue)
export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.main);

  // This is where the Websocket is created. Run once, at app init.
  React.useEffect(() => {
    dispatch({ type: "WEBSOCKET_CONNECT" });
  }, []);

  return (
    <Box display="flex" height={window.innerHeight} flexDirection="column">
      <AppBar position="absolute">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Swappable Drawer */}
          <Drawer
            anchor="left"
            size="sm"
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <List>
              <ListItem
                button
                component="a"
                href={"http://" + window.location.hostname + ":8080/start"}
              >
                <ListItemText primary="New Room" />
              </ListItem>
            </List>
          </Drawer>

          <Typography variant="h6" color="inherit" component="div">
            Room: {room.roomname}
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
