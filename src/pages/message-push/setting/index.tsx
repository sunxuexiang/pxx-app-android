import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  NativeAppEventEmitter,
  NativeModules
} from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import Header from 'wmkit/header';

import Info from './components/info';
let subscription;
@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class MessagePushSetting extends React.Component<
  Partial<T.IProps>,
  any
> {
  UNSAFE_componentWillMount() {
    this.props.actions.init();
    if (Platform.OS === 'ios') {
      subscription = NativeAppEventEmitter.addListener(
        'setMessageSetting',
        this.setMessageSetting.bind(this)
      );
      NativeModules.UMPushModule.getMessageSetting((result) => {
        this.setMessageSetting(result);
      });
    } else if (Platform.OS === 'android') {
      subscription = NativeAppEventEmitter.addListener(
          'setMessageSetting',
          this.setMessageSettingForAndroid.bind(this)
      );

      NativeModules.MessageModule.getMessageSetting((result) => {
        this.setMessageSettingForAndroid(result);
      });
    }
  }

  componentWillUnmount() {
    this.props.actions.clean();
    if (Platform.OS === 'ios') {
      subscription.remove();
    }
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return (
      <View style={styles.index}>
        <Header title="消息推送设置" />
        <Info />
      </View>
    );
  }

  /**
   * 设置消息开关 ios端
   * @param result
   */
  setMessageSetting(result) {
    this.props.actions.action.commonChange('main.isShow', result === '1');
    // this.props.actions.action.setMessageSetting(result);
  }

  /**
   * 设置消息开关 android端
   * @param result
   */
  setMessageSettingForAndroid(result) {
    if (result === undefined) {
      return;
    }

    this.props.actions.action.commonChange('main.isShow', !!result.isOpened);
  }
}

//==动态注入reducer===

import messagePushSettingMain from './reducers/main';

registerReducer({ messagePushSettingMain });

const styles = StyleSheet.create({
  index: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});
