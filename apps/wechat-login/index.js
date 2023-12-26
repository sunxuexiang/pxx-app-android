import React from 'react';
import { View, Text, StyleSheet, TextInput, PixelRatio } from 'react-native';
import ValidConst from 'wmkit/validate';
import * as Button from 'wmkit/button';
import Header from 'wmkit/header';

import { StoreProvider, msg } from 'plume2';
import AppStore from './store';
const SendButton = Button.SendButton;
const LongButton = Button.LongButton;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class WechatLogin extends React.Component {
  store;

  componentDidMount() {
    const state = this.props.route;
    const { id } = (state && state.params) || {};
    this.store.init(id);
  }

  render() {
    const { changePhone, changeCode, sendCode, bind } = this.store;
    return (
      <View style={styles.container}>
        <Header title="微信登录" />
        <View style={styles.titleBox}>
          <Text allowFontScaling={false} style={styles.title}>
            为了您的账号安全，请绑定一个手机号：
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={{ color: '#333' }}>手机号</Text>
          <TextInput
            autoFocus={window.keyBoardShow}
            style={styles.input}
            placeholder="请输入您的手机号码"
            keyboardType="numeric"
            maxLength={11}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
            onChangeText={(value) => changePhone(value)}
          />
        </View>
        <View style={styles.item}>
          <Text style={{ color: '#333' }}>验证码</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入验证码"
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            maxLength={6}
            onChangeText={(value) => changeCode(value)}
          />
          <SendButton
            clickValid={() => this._sendCode()}
            resetWhenError
            time={60}
            onClick={() => sendCode()}
          />
        </View>
        {/* <View style={styles.tipBox}>
          <Text allowFontScaling={false} style={styles.tipText}>
            手机号已被使用，请更换手机号
          </Text>
        </View> */}
        <LongButton
          text="绑定"
          onClick={() => bind()}
          boxStyle={styles.buttonBox}
        />
      </View>
    );
  }

  _sendCode = () => {
    const phone = this.store.state().get('phone');
    const regex = ValidConst.phone;
    if (phone == '') {
      msg.emit('app:tip', '手机号不能为空！');
      return false;
    } else if (!regex.test(phone)) {
      msg.emit('app:tip', '手机号格式有误！');
      return false;
    } else {
      return true;
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12
  },
  input: {
    color: '#333',
    fontSize: 14,
    textAlign: 'right',
    flex: 1
  },
  titleBox: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get()
  },
  title: {
    fontSize: 15,
    color: '#000'
  },
  tipBox: {
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  tipText: {
    color: '#cb4255',
    fontSize: 13
  },
  buttonBox: {
    marginTop: 35
  }
});
