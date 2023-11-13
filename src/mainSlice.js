import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    user_id: null,
    room: {},      // {room_id, roomname}
    entries: []    // [{entry_id, voteCount, userVote, message}, ...]
  },
  reducers: {
    addEntry: (state, action) => {
      // const { entry_id, message } = action.payload; 
      const { message } = action.payload; // [AFS] Removed entry_id; will not have this when we send message
      state.entries.push({
        id: null, // TODO: [AFS] need to calculate this
        voteCount: 0,
        userVote: false,
        message: message
      });
      console.log(action.payload);
    },
    toggleVote: (state, action) => {
      // Get entry clicked
      const entry_id = action.payload;
      const entry = state.entries.find(entry => entry.entry_id === Number(entry_id));
      // Toggle userVote and voteCount for that entry
      if (!entry.userVote) {
        entry.voteCount++;
        entry.userVote = true;
      } else {
        entry.voteCount--;
        entry.userVote = false;
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
      // Completely replace state.
      // NOTE: This is dangerous; it would be better to validate data from the backend.
      console.log('Loading initial state.');
      return action.payload;
    }
  },
});

// Export actions for use in components
export const { addEntry, toggleVote, changeRoomName, setInitialState, loadChat } = mainSlice.actions;

// Export the reducer function for store configuration
export default mainSlice.reducer;