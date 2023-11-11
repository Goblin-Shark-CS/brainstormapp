import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        projects: [],
        entries: [
          'Message 1: Lorem ipsum',
          'Message 2: Lorem ipsum'
        ]
    }, // use object for multiple states
    reducers: {
        reducer1: (state) => state + 1,
        reducer2: (state) => state - 1,
        reducer3: (state, action) => state + action.payload,
    },
});

// Export actions for use in components
export const { reducer1, reducer2, reducer3 } = mainSlice.actions;

// Export the reducer function for store configuration
export default mainSlice.reducer;