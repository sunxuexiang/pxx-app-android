import React from 'react';
import { noop } from 'wmkit/noop';
import { Relax, msg } from 'plume2';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { screenHeight, screenWidth, mainColor } from 'wmkit/styles/index';
@Relax
export default class PaymentPassword extends React.Component {

  static relaxProps = {
    showPassword: noop,
    submit: noop,
    changePayPwd: noop,
    checkPayPwdRes: 'checkPayPwdRes',
    payPwdTime: 'payPwdTime',
  };
  render() {
    const {
      showPassword,
      submit,
      changePayPwd,
      checkPayPwdRes,
      payPwdTime
    } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <View style={styles.whiteBox}>
          <Text allowFontScaling={false} style={styles.title}>请输入支付密码</Text>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => showPassword(false)}
          >
            <Text allowFontScaling={false} style={styles.title}>X</Text>
          </TouchableOpacity>
          <TextInput
            autoFocus={window.keyBoardShow}
            style={styles.password}
            secureTextEntry={true}
            keyboardType="ascii-capable"
            returnKeyType="done"
            maxLength={16}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(text) => changePayPwd(text)}
          />
          <View>
            {checkPayPwdRes ? (
              null
            ) : (
                <Text allowFontScaling={false} style={styles.errorTip}>
                  {payPwdTime == 3
                    ? '账户已冻结，请30分钟后重试'
                    : `密码错误，还有${3 - payPwdTime}次机会`}
                </Text>
              )}
            <TouchableOpacity
              style={[styles.clickBox, styles.forget]}
              onPress={() => this.forgetPayPwd()}>
              <Text allowFontScaling={false} style={styles.forgetPass}>忘记密码？</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: mainColor }]}
              onPress={() => payPwdTime != 3 && submit()}>
              <Text allowFontScaling={false} style={styles.submitText}>提交</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 忘记密码
   */
  forgetPayPwd() {
    msg.emit('router: goToNext', {
      routeName: 'PayPassword',
      forget: true
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'rgba(000,000,000,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    top: 0,
    paddingBottom: 32
  },
  whiteBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 200,
    width: screenWidth * 0.888,
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
    color: '#333',
    paddingTop: 16,
    paddingBottom: 18,
    fontFamily: 'PingFang SC'
  },
  forgetPass: {
    fontSize: 13,
    color: '#333'
  },
  password: {
    padding: 10,
    height: 43,
    width: screenWidth * 0.72,
    borderWidth: 1,
    borderColor: '#EEEEEE'
  },
  errorTip: {
    color: '#FF1F4E',
    fontSize: 13,
    position: 'absolute',
    left: 0,
    paddingTop: 12,
    paddingBottom: 12
  },
  clickBox: {
    width: screenWidth * 0.888 * 0.82,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12
  },
  forget: {
    justifyContent: 'flex-end'
  },
  submitText: {
    fontSize: 18,
    color: '#FFF'
  },
  submitButton: {
    width: screenWidth * 0.888 * 0.82,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12
  },
  cancelButton: {
    position: 'absolute',
    right: 15
  }
});
