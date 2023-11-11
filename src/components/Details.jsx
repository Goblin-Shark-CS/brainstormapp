import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";
import Box from '@mui/material/Box';

function DetailsComponent() {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries);

  return (
    <Box></Box>
  );
}

export default DetailsComponent;
