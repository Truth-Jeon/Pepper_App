import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  phone: '',
  name: '',
  birthdate: '',
};

export const phoneVerifySlice = createSlice({
  name: 'phoneVerify',
  initialState,
  reducers: {
    setPhoneVerify: (state, action) => {
      console.log('setPhoneVerify: ', action.payload);
      state.phone = action.payload.phone;
      state.name = action.payload.name;
      state.birthdate = action.payload.birthdate;
    },
  },
});

export const {setPhoneVerify} = phoneVerifySlice.actions;

export default phoneVerifySlice.reducer;
