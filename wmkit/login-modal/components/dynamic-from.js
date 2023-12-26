import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PixelRatio,
  Image
} from 'react-native';
import { Relax } from 'plume2';
import * as WMkit from 'wmkit/kit';
import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';

const SendButton = Button.SendButton;
const selectImage = require('wmkit/theme/check.png');
const unSelectImage = require('../img/uncheck.png');

/**
 * 验证码登录
 */
@Relax
export default class DynamicFrom extends React.Component {
  static relaxProps = {
    account: 'account',
    verificationCode: 'verificationCode',
    doLogin: () => {},
    setAccount: () => {},
    setVerificationCode: () => {},
    toggleShowPrivacyPolicyAgreement: () => {},
    userRegistrationAgreement:()=>{},
    sendCode: () => { },
    onChangeBox: () => { }
  };

  render() {
    const {
      setAccount,
      account,
      verificationCode,
      doLogin,
      setVerificationCode,
      sendCode,
      buttonstate,
      toggleShowPrivacyPolicyAgreement,
      userRegistrationAgreement,
      onChangeBox
    } = this.props.relaxProps;
    const {isDynamic} = this.props
    return (
      <View>
        <View style={styles.loginBox}>
          <View style={styles.inputItem}>
            <Image
              style={styles.intIcon}
              source={require('../img/phone.png')}
            />
            <TextInput
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
              btnTextStyle={{ color: mainColor , fontWeight: '500'}}
            />
          </View>
        </View>
        <View style={styles.registerLink}>
        <TouchableOpacity
            style={styles.checkOut}
            onPress={() => {
              onChangeBox()
            }
            }
            activeOpacity={0.8}
          >
          <Image style={styles.isCheck} source={isDynamic ? selectImage : unSelectImage}></Image>
          </TouchableOpacity>
          <Text allowFontScaling={false} style={styles.smallText}>
            我已阅读并同意
          </Text>
          <TouchableOpacity
            onPress={() => userRegistrationAgreement()}
          >
            <Text
              allowFontScaling={false}
              style={[styles.smallText, { color: mainColor }]}
            >
              《用户协议》
            </Text>
          </TouchableOpacity>
          <Text style={styles.smallText}>和</Text>
          <TouchableOpacity
            onPress={() => toggleShowPrivacyPolicyAgreement()}
          >
            <Text
              allowFontScaling={false}
              style={[styles.smallText, { color: mainColor }]}
            >
              《隐私政策》
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity disabled={buttonstate} onPress={() => doLogin()}>
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
   */
  _beforeSendCode = (account) => {
    return WMkit.testTel(account);
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
    color: '#333',
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
  },
  smallText: {
    fontSize: 10,
    color: '#999',
    marginTop:3.5
  },
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:5
  },
  checkOut: {
    width: 42,
    height: 39,
    paddingHorizontal: 13,
    paddingTop:13,
    marginHorizontal: -8,
  },
  defaultSelect: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  isCheck: {
    width: 16,
    height: 16,
  }
});
