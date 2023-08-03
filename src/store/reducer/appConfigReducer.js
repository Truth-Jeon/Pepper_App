import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  is_app_lock: false,
  is_biometric_authentication: false,
  bio_code: null,
};

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setAppLock: (state, action) => {
      state.is_app_lock = action.payload;
    },

    setBioCode: (state, action) => {
      state.bio_code = action.payload;
    },

    setBio: (state, action) => {
      if (state.is_biometric_authentication == false) {
        state.is_app_lock = true;
      }
      state.is_biometric_authentication = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAppLock, setBioCode, setBio} = appConfigSlice.actions;

export default appConfigSlice.reducer;
