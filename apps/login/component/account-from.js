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
import { noop } from 'wmkit/noop';
import LinearGradient from 'react-native-linear-gradient';
import { mainColor, screenWidth } from '@/wmkit/styles';

@Relax
export default class AccountFrom extends React.Component {
  constructor(props) {
    super(props);
  }
  static relaxProps = {
    account: 'account',
    isShowpwd: 'isShowpwd',
    buttonstate: 'buttonstate',
    buttonvalue: 'buttonvalue',
    setPass: noop,
    setAccount: noop,
    showPass: noop,
    doLogin: noop,
    forgetPass: noop
  };

  render() {
    const {
      account,
      isShowpwd,
      buttonstate,
      buttonvalue,
      setPass,
      setAccount,
      showPass,
      doLogin,
      forgetPass
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
              onChangeText={(text) => setPass(text)}
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
              {buttonstate ? buttonvalue : '登录'}
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
  }
});
