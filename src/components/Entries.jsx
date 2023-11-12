import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";
import Entry from './Entry.jsx';
import Chatbox from "./Chatbox.jsx";
import Box from '@mui/material/Box';

// Entries Container
function EntriesComponent(props) {
  const { entries } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const newEntriesArray = entries.map(({id, voteCount, userVote, message}) => (
    <Entry 
      key = {id}
      entry = {id}
      voteCount = {voteCount}
      userVote = {userVote}
      messageContent = {message}
    /> 
  ))
  
  return (
    <Box>
      {newEntriesArray}
      <br /><br />
      <Chatbox />
    </Box>
  )
}

export default EntriesComponent;
