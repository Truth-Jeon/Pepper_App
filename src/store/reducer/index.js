import test from './testReducer';
import notice from './noticeReducer';
import term from './termReducer';
import account from './accountReducer';
import appConfig from './appConfigReducer';
import transaction from './transactionReducer';
import market from './marketReducer';
import phoneVerify from './phoneVerifyReducer';

import {combineReducers} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';

import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'com.payper',
  storage: EncryptedStorage,
  blacklist: ['notice'],
};

const reducer = combineReducers({
  test,
  notice,
  term,
  account,
  transaction,
  appConfig,
  market,
  phoneVerify,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default persistedReducer;
