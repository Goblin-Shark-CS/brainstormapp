import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleVote } from "../mainSlice";
import { IconButton } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles'; 
import { keyframes } from '@mui/system';

function Entry(props) {
  const { entries } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  // TO DO: onClick -> dispatch(toggleVote(entry_id));
  let voteButton;
  if (props.userVote) {
    voteButton = (
      <IconButton color="primary" aria-label="vote" size="small">
        <FavoriteIcon />
      </IconButton>
    );
  } else {
    voteButton = (
      <IconButton color="primary" aria-label="vote" size="small" disabled>
        <FavoriteOutlinedIcon />
      </IconButton>
    );
  }

  function submitVote() {
    
  }

  const favAnimation = keyframes`
    from {
      transform: 0deg;
    }
    to {
      transform: 360deg;
    }
  `;

  return (
    <Box margin="20">
      <Paper>
        <Box display="flex" padding="10">
          <Box
            flex="0 0 auto"
            color="#666"
            padding="18px 0px 10px 10px"
            width="20"
          >
            {props.voteCount}
          </Box>
          <Box 
            flex="0 0 auto" 
            padding="10px 10px 10px 0px"
            onClick={() => {dispatch(toggleVote())}}
            // animation={`${favAnimation} 1s infinite ease`}
          >
            {voteButton}
          </Box>
          <Box flex="1" padding="16px 10px 10px 0px" fontSize="20">
            {props.entryContent}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Entry;
