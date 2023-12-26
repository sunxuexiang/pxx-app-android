import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';
import { screenHeight, screenWidth,mainColor } from 'wmkit/styles/index';
import * as WMkit from 'wmkit/kit';

type IPaymentModalProps = T.IProps & T.IPaymentModalProps;

@connect<Partial<IPaymentModalProps>, T.IPaymentModalState>(
  store2Props,
  actions
)
export default class PaymentModal extends React.Component<
  Partial<IPaymentModalProps>,
  T.IPaymentModalState
> {
  constructor(props: IPaymentModalProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: { action },
      main: {
        payPwd,
        pwdModalVisible,
        checkPayPwdRes,
        payPwdTime,
        pointsCouponId,
        latestPointsCouponInfoList,
        isExchange
      }
    } = this.props;
    return (
      pwdModalVisible && (
        <View style={styles.container}>
          <View style={styles.whiteBox}>
            <Text allowFontScaling={false} style={styles.title}>请输入支付密码</Text>
            <TextInput
              autoFocus={window.keyBoardShow}
              style={styles.password}
              secureTextEntry={true}
              keyboardType="ascii-capable"
              returnKeyType="done"
              value={payPwd + ''}
              maxLength={16}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(text) => action.setPayPwd(text)}
            />
            <View style={styles.textBox}>
              {checkPayPwdRes ? null : (
                <Text allowFontScaling={false} style={styles.errorTip}>
                  {payPwdTime == 3
                    ? '账户已冻结，请30分钟后重试'
                    : `密码错误，还有${3 - payPwdTime}次机会`}
                </Text>
              )}
              <TouchableOpacity
                style={[styles.clickBox, styles.borderRight, styles.forget]}
                activeOpacity={0.8}
                onPress={() => (
                  action.setPwdModalVisible(false),
                  action.setPayPwd(''),
                  action.setCheckPayPwdRes(true),
                  action.setPayPwdTime(0, true),
                  msg.emit('router: goTo' + 'Next', {
                    routeName: 'PayPassword',
                    forget: true
                  })
                )}
              >
                <Text allowFontScaling={false} style={styles.forgetPass}>忘记密码？</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnBox}>
              <TouchableOpacity
                style={[styles.clickBox, styles.borderRight]}
                activeOpacity={0.8}
                onPress={() => (
                  action.setPwdModalVisible(false),
                  action.setPayPwd(''),
                  action.setCheckPayPwdRes(true),
                  action.setPayPwdTime(0, true)
                )}
              >
                <Text allowFontScaling={false} style={styles.cancelText}>取消</Text>
              </TouchableOpacity>
              {!checkPayPwdRes && payPwdTime == 3 ? (
                <View
                  style={styles.clickBox}
                >
                  <Text allowFontScaling={false} style={styles.noSubmitText}>提交</Text>
                </View>
              ): (
                <TouchableOpacity
                  style={styles.clickBox}
                  onPress={() =>
                    this.exchange(payPwd, pointsCouponId, latestPointsCouponInfoList)
                  }
                >
                  <Text allowFontScaling={false} style={[styles.submitText, { color: mainColor }]}>提交</Text>
                </TouchableOpacity>
              )}

            </View>
          </View>
        </View>
      )
    );
  }

  exchange = WMkit.onceFunc(async(
    payPwd,
    pointsCouponId,
    latestPointsCouponInfoList) => {

    let {
      actions: { action }
    } = this.props;
    action.exchangeCoupon(
      payPwd,
      pointsCouponId,
      latestPointsCouponInfoList
    );
  }, 3000)
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
  noSubmitText: {
    fontSize: 16,
    color: '#cccccc'
  },
  borderRight: {
    borderRightWidth: 1 / PixelRatio.get(),
    borderRightColor: '#ebebeb'
  },
  forget: {
    justifyContent: 'flex-end'
  }
});
