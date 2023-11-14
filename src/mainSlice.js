import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    user_id: "",
    room: {
      room_id: "",
      roomname: ""
    },
    entries: []    // [{_id, voteCount, userVote, text}, ...]
  },
  reducers: {
    addEntry: (state, action) => {
      const { _id, text } = action.payload;
      // It might be nice to replace this with entry_id instead of _id straight from the SQL server.
      // Modify the SQL query perhaps?
      state.entries.push({
        _id: _id,
        voteCount: 0,
        userVote: false,
        text,
      });
    },
    toggleVote: (state, action) => {
      // Triggered when "toggle vote" is clicked.
      const entry = state.entries.find(
        (entry) => entry._id === Number(action.payload)
      );
      // Toggle userVote and voteCount for that entry
      if (!entry.userVote) {
        entry.userVote = true;
      } else {
        entry.userVote = false;
      }
    },
    incrementVote: (state, action) => {
      const entry = state.entries.find(
        (entry) => entry._id === Number(action.payload._id)
      );
      if (action.payload.add) {
        entry.voteCount++;
      } else {
        entry.voteCount--;
      }
    },
    changeRoomName: (state, action) => {
      state.room.roomname = action.payload;
    },
    setInitialState: (state, action) => {
      const { user_id, room, entries } = action.payload;
      state.user_id = user_id;
      state.room = room;
      state.entries = entries;
    },
    loadChat: (state, action) => {
      // **DANGER DANGER DANGER!!!!***
      // Here we take the state pulled from the server and completely replace state.
      // It would be better to validate data from the backend here.
      console.log('Loading initial state.');
      return action.payload;
    },
  },
});

// Export actions for use in components
export const {
  addEntry,
  toggleVote,
  incrementVote,
  changeRoomName,
  setInitialState,
} = mainSlice.actions;

// Export the reducer function for store configuration
export default mainSlice.reducer;
