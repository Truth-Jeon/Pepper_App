import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  is_user_validation: false,
  is_first_transaction_agree: false,
  is_bank_certification_validation: false,
  is_trans_permission: false,
  single_charge_limit: 0,
  daily_trans_limit: 0,
  min_trans_limit: 0,
  daily_charge_limit: 0,
  daily_withdrawal_limit: 0,
  min_withdrawal_limit: 0,
  access: '',
  refresh: '',
  private_key: '',
  public_address: '',
  quick_address: '',
  referral_code: '',
  balance: 0,
  status: 'ACCOUNT_INIT',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setCreateAccount: (state, action) => {
      state.isAuth = false;
    },
    setCreateAccountSuccess: (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.public_address = action.payload.account.public_address;
      state.quick_address = action.payload.account.quick_address;
      state.balance = action.payload.account.balance;
      state.referral_code = action.payload.account.referral_code;
      state.is_user_validation = action.payload.account.is_user_validation;
      state.is_first_transaction_agree =
        action.payload.account.is_first_transaction_agree;
      state.isAuth = true;
      state.is_bank_certification_validation = false;
      state.single_charge_limit = action.payload.account.single_charge_limit;
      state.daily_trans_limit = action.payload.account.daily_trans_limit;
      state.min_trans_limit = action.payload.account.min_trans_limit;
      state.daily_charge_limit = action.payload.account.daily_charge_limit;
      state.min_charge_limit = action.payload.account.min_charge_limit;
      state.daily_withdrawal_limit =
        action.payload.account.daily_withdrawal_limit;
      state.min_withdrawal_limit = action.payload.account.min_withdrawal_limit;
    },
    setPrivateKey: (state, action) => {
      state.private_key = action.payload;
    },
    setAccessTokenRefreshRequest: () => {},
    setAccessTokenRefreshSuccess: (state, action) => {
      state.access = action.payload;
    },
    setAccessTokenRefreshFail: () => {},
    setAccount: (state, action) => {},
    logout: (state, action) => {
      state.isAuth = false;
      state.is_user_validation = false;
      state.access = '';
      state.refresh = '';
      state.public_address = '';
      state.quick_address = '';
      state.balance = '';
      state.private_key = '';
      state.is_first_transaction_agree = false;
      state.single_charge_limit = 0;
    },
    setAccountSuccess: (state, action) => {
      state.public_address = action.payload.public_address;
      state.quick_address = action.payload.quick_address;
      state.referral_code = action.payload.referral_code;
      state.balance = action.payload.balance;
      state.is_user_validation = action.payload.is_user_validation;
      state.is_first_transaction_agree =
        action.payload.is_first_transaction_agree;
      state.isAuth = true;
      state.is_bank_certification_validation =
        action.payload.is_bank_certification_validation;
      state.is_trans_permission = action.payload.is_trans_permission;
      state.single_charge_limit = action.payload.single_charge_limit;
      state.daily_trans_limit = action.payload.daily_trans_limit;
      state.min_trans_limit = action.payload.min_trans_limit;
      state.daily_charge_limit = action.payload.daily_charge_limit;
      state.daily_withdrawal_limit = action.payload.daily_withdrawal_limit;
      state.min_withdrawal_limit = action.payload.min_withdrawal_limit;
      state.min_charge_limit = action.payload.min_charge_limit;
    },
    setCertificationValidationSuccess: (state, action) => {
      state.is_bank_certification_validation = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  accountInitial,
  setCreateAccount,
  setCreateAccountSuccess,
  setAccount,
  setAccountSuccess,
  setPrivateKey,
  logout,
  setAccessTokenRefreshRequest,
  setAccessTokenRefreshSuccess,
  setAccessTokenRefreshFail,
  setCertificationValidationSuccess,
} = accountSlice.actions;

export default accountSlice.reducer;
