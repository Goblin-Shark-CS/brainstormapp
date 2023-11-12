import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleVote } from "../mainSlice";
import { IconButton } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

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
          <Box flex="0 0 auto" padding="10px 10px 10px 0px">
            {voteButton}
          </Box>
          <Box flex="1" padding="16px 10px 10px 0px" fontSize="20">
            {props.messageContent}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Entry;
