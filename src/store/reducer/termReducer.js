import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  terms: [],
  isLoading: false,
  error: null,
};

export const termSlice = createSlice({
  name: 'term',
  initialState,
  reducers: {
    setTerms: (state, action) => {
      console.log('?212?');
      state.isLoading = true;
    },
    setTermsSuccess: (state, action) => {
      state.terms = action.payload;
      state.isLoading = false;
    },
    setTermsFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTerms, setTermsSuccess, setTermsFailure} = termSlice.actions;

export default termSlice.reducer;
