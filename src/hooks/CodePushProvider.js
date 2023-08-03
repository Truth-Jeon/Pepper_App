import React, {createContext, useContext} from 'react';
import codePush from 'react-native-code-push';

const CodePushContext = createContext({});

export const useCodePush = () => useContext(CodePushContext);

export const CodePushProvider = codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL,
})(
  class extends React.Component {
    state = {
      status: null,
      progress: null,
    };

    codePushStatusDidChange(status) {
      this.setState({status});
    }

    codePushDownloadDidProgress(progress) {
      this.setState({progress: progress.receivedBytes / progress.totalBytes});
    }

    onStartSync = async () => {
      console.log('__DEV__ :', __DEV__);
      if (!__DEV__) {
        try {
          await codePush.sync(
            {
              updateDialog: false,
              installMode: codePush.InstallMode.IMMEDIATE,
            },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this),
          );
        } catch (error) {
          this.setState({status: codePush.SyncStatus.UP_TO_DATE});
        }
      } else {
        this.setState({status: codePush.SyncStatus.UP_TO_DATE});
      }
    };

    render() {
      return (
        <CodePushContext.Provider
          value={{
            status: this.state.status,
            progress: this.state.progress,
            onStartSync: this.onStartSync,
          }}>
          {this.props.children}
        </CodePushContext.Provider>
      );
    }
  },
);
