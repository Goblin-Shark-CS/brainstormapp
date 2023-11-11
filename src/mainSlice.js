import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        // username, board ID, etc
        session: {},
        entries: [
          {
            id: 0,
            message: 'The first brainstorm idea',
            voteCount: 0,
            userVote: false
          },
          {
            id: 1,
            message: 'The second brainstorm idea',
            voteCount: 0,
            userVote: false
          },
          {
            id: 2,
            message: 'The third brainstorm idea',
            voteCount: 0,
            userVote: false
          }
        ]
    },
    reducers: {
        addEntry: (state) => {
          // Placeholder: add new entry
          const newEntry = {id: 0, message: 'newEntry', voteCount: '0', userVote: null};
          state.entries.push(newEntry);
        },
        showPayload: (state, action) => console.log(action.payload),
        increaseVote: (state) => { // TODO: Create function to increase vote count for specific entry
          // TODO: Increase vote count
          // TODO: Change user vote status
        },
        loadChat: (state, action) => {
          // Completely replace state
          console.log('Loading initial state.');
          return action.payload
        }
    },
});

// Export actions for use in components
export const { addEntry, showPayload, increaseVote, loadChat } = mainSlice.actions;

// Export the reducer function for store configuration
export default mainSlice.reducer;