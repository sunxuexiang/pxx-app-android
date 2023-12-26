import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { StoreProvider } from 'plume2';

import AppStore from './store';
import * as Button from 'wmkit/button';
import Header from 'wmkit/header';

const LongButton = Button.LongButton;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class DistributionRegister extends React.Component {
  UNSAFE_componentWillMount() {
    this.store.getRegisterLimitType();
  }

  render() {
    const openFlag = this.store.state().get('openFlag');
    return openFlag ? (
      <View style={styles.container}>
        <Header title="注册" />
        <Text style={styles.title} allowFontScaling={false}>
          请输入邀请码
        </Text>
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            maxLength={8}
            restrict="A-Z0-9"
            placeholder="请输入您获取的邀请码"
            placeholderTextColor="#999"
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.store.setInviteCode(value)}
          />
        </View>
        <LongButton text="提交" onClick={this.store.submit} />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 40
  },
  item: {
    width: '80%',
    marginLeft: '10%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#ffffff',
    marginBottom: 40
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
    overflow: 'hidden'
  }
});
