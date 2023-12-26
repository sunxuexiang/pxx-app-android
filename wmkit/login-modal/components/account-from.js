import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import { Relax } from 'plume2';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';


const selectImage = require('wmkit/theme/check.png');
const unSelectImage = require('../img/uncheck.png');
/**
 * 登录页
 */

@Relax
export default class AccountFrom extends React.Component {
  static relaxProps = {
    isShowpwd: 'isShowpwd',
    buttonstate: 'buttonstate',
    buttonvalue: 'buttonvalue',
    account: 'account',
    password: 'password',
    showPass: () => { },
    doLogin: () => { },
    setAccount: () => { },
    setPassword: () => { },
    forgetPass: () => { },
    toggleShowPrivacyPolicyAgreement: () => { },
    userRegistrationAgreement: () => { },
    onChangeBox: () => { },
  };
  render() {
    const {
      isShowpwd,
      buttonstate,
      account,
      showPass,
      doLogin,
      setPassword,
      setAccount,
      forgetPass,
      toggleShowPrivacyPolicyAgreement,
      userRegistrationAgreement,
      onChangeBox
    } = this.props.relaxProps;
     const  {isCheckAccount} = this.props
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
            <Image style={styles.intIcon} source={require('../img/pass.png')} />
            <TextInput
              secureTextEntry={isShowpwd ? false : true}
              maxLength={16}
              keyboardType="ascii-capable"
              style={styles.input}
              placeholder="请输入密码"
              autoCapitalize="none"
              placeholderTextColor="#999"
              underlineColorAndroid="transparent"
              onChangeText={(text) => setPassword(text)}
              returnKeyType="done"
              restrict="a-zA-Z0-9"
            />
            <TouchableOpacity onPress={() => showPass()}>
              <Image
                style={[styles.imgEyes, isShowpwd ? {tintColor: mainColor} : {}]}
                source={
                  isShowpwd
                    ? require('wmkit/theme/open-eyes.png')
                    : require('../img/close-eyes.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.forget}
              activeOpacity={0.6}
              onPress={() => forgetPass()}
            >
              <Text allowFontScaling={false} style={styles.text}>
                忘记密码
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.registerLink}>
          <TouchableOpacity
            style={styles.checkOut}
            onPress={() => onChangeBox()}
            activeOpacity={0.8}
          >
            <Image style={[styles.isCheck, isCheckAccount ? {tintColor: mainColor} : {}]} source={isCheckAccount ? selectImage : unSelectImage}></Image>
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
}

const styles = StyleSheet.create({
  content: {
    marginTop: 40,
    paddingLeft: 40,
    paddingRight: 40
  },
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
  forget: {
    marginLeft: 20
  },
  text: {
    color: '#999',
    fontSize: 14
  },
  btn: {
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
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
  imgEyes: {
    width: 20,
    height: 20
  },
  smallText: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop:3.8
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
    paddingTop: 13,
    marginHorizontal: -8
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
