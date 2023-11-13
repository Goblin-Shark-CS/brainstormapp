import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVote } from '../mainSlice';
import { IconButton } from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

function Entry(props) {
  const { entries } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  let voteButton;
  if (props.userVote) {
    voteButton = (
      <IconButton color='primary' aria-label='vote' size='small'>
        <FavoriteIcon style={{ fill: '#E37383' }} />
      </IconButton>
    );
  } else {
    voteButton = (
      <IconButton
        color='primary'
        aria-label='vote'
        size='small'
        style={{ cursor: 'pointer' }}
      >
        <FavoriteIcon style={{ fill: '#D3D3D3' }} />
      </IconButton>
    );
  }

  return (
    <Box
      margin='20'
      onClick={() => {
        dispatch({
          type: 'WEBSOCKET_SEND',
          payload: { type: 'vote', add: !props.userVote, entry: props.entry },
        });
        console.log('PROPS.ENTRY:', props.entry);
        dispatch(toggleVote(props.entry));
      }}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      <Paper>
        <Box display='flex' padding='10'>
          <Box
            flex='0 0 auto'
            color='#666'
            padding='18px 0px 10px 10px'
            width='20'
          >
            {props.voteCount}
          </Box>
          <Box flex='0 0 auto' padding='10px 10px 10px 0px'>
            {voteButton}
          </Box>
          <Box flex='1' padding='16px 10px 10px 0px' fontSize='20'>
            {props.entryContent}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Entry;
