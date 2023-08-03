import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notices: [],
  isLoading: false,
  error: null,
};

export const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    setNotices: (state, action) => {
      state.isLoading = true;
    },
    setNoticesSuccess: (state, action) => {
      state.notices = action.payload;
      state.isLoading = false;
    },
    setNoticesFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setNotices, setNoticesSuccess, setNoticesFailure} =
  noticeSlice.actions;

export default noticeSlice.reducer;
