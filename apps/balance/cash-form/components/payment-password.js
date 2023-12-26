import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { msg, Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { screenHeight, screenWidth,mainColor } from 'wmkit/styles/index';

@Relax
export default class PaymentPassword extends React.Component {
  static relaxProps = {
    setPayPassword: noop,
    payPassword: 'payPassword',
    cancelPayPwdModal: noop,
    // 支付密码是否正确 && 错误冻结后是否已过30分钟
    checkPayPwdRes: 'checkPayPwdRes',
    // 支付密码错误次数
    payPwdErrorTime: 'payPwdErrorTime',
    // 新增提现申请记录
    addCustomerDrawCash: noop,
  };

  render() {
    const {
      setPayPassword,
      payPassword,
      cancelPayPwdModal,
      checkPayPwdRes,
      payPwdErrorTime,
    } = this.props.relaxProps;

    return (
      <View style={styles.container}>
        <View style={styles.whiteBox}>
          <Text
            allowFontScaling={false}
            style={styles.title}>请输入支付密码</Text>
          <TextInput
            autoFocus={window.keyBoardShow}
            style={styles.password}
            secureTextEntry={true}
            keyboardType="ascii-capable"
            returnKeyType="done"
            value={payPassword + ''}
            maxLength={16}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(text) => setPayPassword(text)}
          />
          <View style={styles.textBox}>
            {checkPayPwdRes ? null : (
              <Text
                allowFontScaling={false}
                style={styles.errorTip}>
                {payPwdErrorTime == 3
                  ? '账户已冻结，请30分钟后重试'
                  : `密码错误，还有${3 - payPwdErrorTime}次机会`}
              </Text>
            )}
            <TouchableOpacity
              style={[styles.clickBox, styles.borderRight, styles.forget]}
              activeOpacity={0.8}
              onPress={() => {
                cancelPayPwdModal(false);
                msg.emit('router: goTo' + 'Next', {
                  routeName: 'PayPassword',
                  forget: true
                });
              }
              }
            >
              <Text
                allowFontScaling={false}
                style={styles.forgetPass}>忘记密码？</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={[styles.clickBox, styles.borderRight]}
              activeOpacity={0.8}
              onPress={() => cancelPayPwdModal(false)}
            >
              <Text
                allowFontScaling={false}
                style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clickBox}
              onPress={() => this._submitDrawCash()}
            >
              <Text
                allowFontScaling={false}
                style={[styles.submitText, { color: mainColor }]}>提交</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 提交提现申请
   * @returns {boolean}
   * @private
   */
  _submitDrawCash = () => {
    const { payPassword, addCustomerDrawCash, payPwdErrorTime } = this.props.relaxProps;
    if (payPwdErrorTime == 3) {
      msg.emit('app:tip', '账户已冻结，请30分钟后重试');
      return;
    }
    if (!payPassword) {
      msg.emit('app:tip', '支付密码不能为空！');
      return false;
    } else {
      addCustomerDrawCash();
    }
  };
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

    top: 0
  },
  whiteBox: {
    width: screenWidth * 0.888,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: '#333',
    paddingTop: 16,
    paddingBottom: 18
  },
  password: {
    backgroundColor: '#fafafa',
    height: 50,
    width: screenWidth * 0.888 - 40
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: screenWidth * 0.888 - 40,
    marginTop: 12,
    marginBottom: 12
  },
  errorTip: {
    color: '#FF1F4E',
    fontSize: 13,
    position: 'absolute',
    left: 0
  },
  forgetPass: {
    fontSize: 13,
    color: '#333'
  },
  btnBox: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    flexDirection: 'row'
  },
  clickBox: {
    width: screenWidth * 0.888 * 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12
  },
  cancelText: {
    fontSize: 16,
    color: '#000'
  },
  submitText: {
    fontSize: 16
  },
  borderRight: {
    borderRightWidth: 1 / PixelRatio.get(),
    borderRightColor: '#ebebeb'
  },
  forget: {
    justifyContent: 'flex-end'
  }
});
