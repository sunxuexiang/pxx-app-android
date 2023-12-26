import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import * as Button from 'wmkit/button';
import * as WMkit from 'wmkit/kit';
import { mainColor, screenWidth } from '@/wmkit/styles';

const SendButton = Button.SendButton;

@Relax
export default class DynamicFrom extends React.Component {
  constructor(props) {
    super(props);
  }
  static relaxProps = {
    account: 'account',
    verificationCode: 'verificationCode',
    buttonstate: 'buttonstate',
    setAccount: noop,
    setVerificationCode: noop,
    sendCode: noop,
    doLogin: noop
  };

  render() {
    const {
      account,
      setAccount,
      verificationCode,
      setVerificationCode,
      sendCode,
      doLogin,
      buttonstate
    } = this.props.relaxProps;
    return (
      <View>
        <View style={styles.loginBox}>
          <View style={styles.inputItem}>
            <Image
              style={styles.intIcon}
              source={require('../img/phone.png')}
            />
            <TextInput
              autoFocus={window.keyBoardShow}
              maxLength={11}
              keyboardType="numeric"
              style={styles.input}
              placeholder="请输入手机号"
              placeholderTextColor="#999"
              underlineColorAndroid="transparent"
              value={account}
              onChangeText={(value) => setAccount(value)}
            />
          </View>
        </View>

        <View style={styles.loginBox}>
          <View style={styles.inputItem}>
            <Image style={styles.intIcon} source={require('../img/code.png')} />
            <TextInput
              maxLength={6}
              keyboardType="numeric"
              style={styles.input}
              value={verificationCode}
              placeholder="请输入验证码"
              autoCapitalize="none"
              placeholderTextColor="#999"
              underlineColorAndroid="transparent"
              onChangeText={(value) => setVerificationCode(value)}
              returnKeyType="done"
              restrict="a-zA-Z0-9"
            />
            {/* <View style={styles.lineStyle} /> */}
            <SendButton
              clickValid={() => this._beforeSendCode(account)}
              resetWhenError
              time={60}
              onClick={() => sendCode(account)}
              btnStyle={styles.btnStyle}
              disableBdColor={{ borderColor: 'transparent' }}
              btnTextStyle={{ color: mainColor }}
            />
          </View>
        </View>
        <TouchableOpacity
          disabled={buttonstate}
          onPress={() => doLogin()}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[mainColor, mainColor]}
            style={[
              styles.btn,
              { backgroundColor: mainColor },
              buttonstate && {
                backgroundColor: '#e1e1e1'
              }
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text
              allowFontScaling={false}
              style={[
                styles.whiteText,
                buttonstate && {
                  color: '#999'
                }
              ]}
            >
              登录
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * 发送验证码前校验手机号是否填写或正确
   * @returns {boolean}
   * @private
   */
  _beforeSendCode = (account) => {
    return WMkit.testTel(account);
  };

  /**
   * 发送验证码
   * @private
   */
  _sendCode = (account) => {
    const { sendCode } = this.props.relaxProps;
    return sendCode(account);
  };
}

const styles = StyleSheet.create({
  loginBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth - 40
  },
  inputItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    flex: 1,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#e5e5e5'
  },
  intIcon: {
    width: 20,
    height: 20
  },
  input: {
    fontSize: 14,
    flex: 1,
    paddingVertical: 0,
    paddingLeft: 10
  },
  btn: {
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 8 },
    // shadowOpacity: 0.2,
    // shadowRadius: 5
  },
  whiteText: {
    color: '#fff',
    fontSize: 16
  },
  icon: {
    width: 17,
    height: 17,
    marginRight: 15
  },
  btnStyle: {
    paddingLeft: 8,
    borderColor: 'transparent',
    borderLeftWidth: 1 / PixelRatio.get(),
    paddingRight: 0,
    marginLeft: 0
  },
  lineStyle: {
    width: 1,
    height: 20,
    backgroundColor: '#e5e5e5'
  }
});
