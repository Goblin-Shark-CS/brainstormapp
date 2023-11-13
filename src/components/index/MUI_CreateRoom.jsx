import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function CreateRoom() {
  return (
    <Box
      display="flex"
      height="100vh"
      width="100vw"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
          backgroundColor="#f6f6f6"
          component="form"
          height="40%"
      >
          <Box>
            Welcome to Brainstorm
          </Box>
          <Box height="100%" overflow="scroll">
            <Button variant="contained">Start Brainstorm!</Button>
          </Box>
      </Stack>
    </Box>
  );
}
