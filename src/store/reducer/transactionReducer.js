import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  account_favorate: [],
  account_history: [],
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    requestTransacion: (state, action) => {
      // state.isAuth = false;
    },
    requestTransacionSuccess: (state, action) => {
      // history에 계정정보를 추가합니다.
      // state.account_favorate = action.payload.account_favorate;
      // state.account_history = action.payload.account_history;
    },
    setFavorate: (state, action) => {
      state.account_favorate = action.payload;
    },
    addFavorate: (state, action) => {
      state.account_favorate.push(action.payload);
    },
    removeFavorate: (state, action) => {
      state.account_favorate = state.account_favorate.filter(
        item => item.public_address !== action.payload.public_address,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  requestTransacion,
  requestTransacionSuccess,
  setFavorate,
  addFavorate,
  removeFavorate,
} = transactionSlice.actions;

export default transactionSlice.reducer;
