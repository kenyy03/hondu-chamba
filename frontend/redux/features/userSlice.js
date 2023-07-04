import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  receiver: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setReceiver: (state, action) => {
      state.receiver = action.payload;
    },
  }    
});

export const { setUserInfo, setReceiver } = userSlice.actions;
export default userSlice.reducer;