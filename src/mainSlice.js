import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        projects: [],
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
            id: 1,
            message: 'The third brainstorm idea',
            voteCount: 0,
            userVote: false
          }
        ]
    }, // use object for multiple states
    reducers: {
        reducer1: (state) => state + 1,
        reducer2: (state) => state - 1,
        reducer3: (state, action) => state + action.payload,
        increaseVote: (state) => { // TODO: Create function to increase vote count for specific entry
          // TODO: Increase vote count
          // TODO: Change user vote status
        },
    },
});

// Export actions for use in components
export const { reducer1, reducer2, reducer3 } = mainSlice.actions;

// Export the reducer function for store configuration
export default mainSlice.reducer;