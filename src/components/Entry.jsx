import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";

function Entry(props) {
  return (
    <div>
      <div>{props.votesCount}</div>
      <div>{props.userVoteStatus}</div>
      <p>{props.messageContent}</p>
    </div>
  )
}

export default Entry;