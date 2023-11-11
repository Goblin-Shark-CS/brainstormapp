import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SubmitComponent() {
  const dispatch = useDispatch();

  return (
    <Box component="form" display="flex">
      <Box width="100%" padding="0px 10px">
        <TextField fullWidth id="outlined-basic" label="Enter submission" variant="outlined" />
        </Box>
      <Button variant="contained" sx={{ padding: "10px", margin: "5px 20px 5px 5px"}}>Post</Button>
    </Box>
  )
}

export default SubmitComponent;
