import url from 'url';
import {NativeModules} from 'react-native';
import sagaPlugin from 'reactotron-redux-saga';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

let {hostname} = url.parse(NativeModules.SourceCode.scriptURL);

hostname = hostname || 'localhost';

let reactotron = Reactotron.configure({port: 9090, host: hostname})
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect();

console.log = Reactotron.log;

export default reactotron;
