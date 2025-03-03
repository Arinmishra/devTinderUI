import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeCardFromFeed: (state, action) => {
      const updatedFeed = state.filter((c) => c._id !== action.payload);
      return updatedFeed;
    },
    removeFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed, removeCardFromFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
