import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3, increaseVote } from "../mainSlice";
import { IconButton } from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';


function Entry(props) {
  const dispatch = useDispatch()
  
  function changeVote(id) { 
    console.log('vote changed!');
    //TODO: invoke action from reducer to upddate voes
    dispatch(increaseVote(id));
  }

  let voteButton
  if (props.userVote) {
    voteButton = (
      <IconButton color="primary" aria-label="vote" size="small">
          <FavoriteOutlinedIcon />
      </IconButton>
    )
  } else {
    voteButton = (
      <IconButton color="primary" disabled aria-label="vote" size="small">
          <FavoriteOutlinedIcon />
      </IconButton>
    )
  }

  return (
    <div className="entryItem">
      
      {/* Div that holds vote information */}
      <div className="voteStatus">
        <p>{props.voteCount}</p>  
        <div className="voteIcon" onClick={() => {changeVote(props.entry)}}>{voteButton}</div>
      </div>
      
      {/* Div that holds the message content */}
      <div className="messageContent">
        <p>{props.messageContent}</p>
      </div>

    </div>
  )
}

export default Entry;