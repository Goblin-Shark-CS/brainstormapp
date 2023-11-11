import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";
import Chatbox from "./Chatbox.jsx";
import Box from '@mui/material/Box';

function EntriesComponent() {
  const { entries } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  // function 
  let entriesArray = [];
  for (let i in entries) {

  }

  return (
    <Box>
      <Chatbox />
    </Box>
  )
}

export default EntriesComponent;
