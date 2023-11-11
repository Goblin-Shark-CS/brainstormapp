import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";
import Box from '@mui/material/Box';

export default function Details() {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries);

  return (
    <Box display="flex" alignContent="center" justifyContent="center">
      <Box width="80%" margin="auto" textAlign="center" color="#999" fontSize="24px">
        <p>Share the link below:</p>
        <p>http://localhost:8080/goblin-shark</p>
      </Box>
    </Box>
  );
}
