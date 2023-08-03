import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isLoading: false,
  error: null,

  isRefreshRequired: false,
};

export const marketSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.isLoading = true;
    },
    setProductsSuccess: (state, action) => {
      state.market = action.payload;
      state.isLoading = false;
    },
    setProductsFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setRefreshState: (state, action) => {
      state.isRefreshRequired = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProducts,
  setProductsSuccess,
  setProductsFailure,
  setRefreshState,
} = marketSlice.actions;

export default marketSlice.reducer;
