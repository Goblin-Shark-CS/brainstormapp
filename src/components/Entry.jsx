import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";
import { IconButton } from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

function Entry(props) {
  return (
    <div className="entryItem">
      
      <div className="voteStatus">
        <p>{props.voteCount}</p>
        
        {/*TODO: have vote button 'disabled' status change based on vote status*/}
        <IconButton color="primary" disabled aria-label="vote" size="small">
          <FavoriteOutlinedIcon />
        </IconButton>
        {props.userVoteStatus}

      </div>
      
      <div className="messageContent">
        <p>{props.messageContent}</p>
      </div>

    </div>
  )
}

export default Entry;