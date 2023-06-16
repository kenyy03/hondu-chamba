import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habilities: []
}

export const habilitiesSlice = createSlice({
  name: 'habilities',
  initialState,
  reducers: {
    setHabilities: (state, action) => {
      state.habilities = action.payload;
    }
  }
});

export const { setHabilities } = habilitiesSlice.actions;
export default habilitiesSlice.reducer;
