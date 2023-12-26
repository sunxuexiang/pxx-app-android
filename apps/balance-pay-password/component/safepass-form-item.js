import React from 'react';
import { Relax } from 'plume2';
import { PixelRatio, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';
import * as WMkit from 'wmkit/kit';
import { mainColor } from 'wmkit/styles/index';
const SendButton = Button.SendButton;

@Relax
export default class SafeFormItem extends React.Component {
  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }

  static relaxProps = {
    code: 'code',
    mobile: 'mobile',
    buttonValue: 'buttonValue',
    getCode: noop,
    sendCode: noop
  };

  render() {
    const { mobile, code, getCode, sendCode } = this.props.relaxProps;
    return (
      <View>
        <View style={styles.content}>
          <View style={styles.item}>
            <Text allowFontScaling={false} style={styles.label}>
              手机号
            </Text>
            <Text allowFontScaling={false} style={styles.grey}>
              {mobile}
            </Text>
          </View>
          <View style={styles.item}>
            <Text allowFontScaling={false} style={styles.label}>
              验证码
            </Text>
            <TextInput
              value={code}
              style={styles.input}
              placeholder="请输入验证码"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              maxLength={6}
              onChangeText={(text) => getCode(text)}
            />
            <SendButton
              clickValid={() => WMkit.testTel(mobile)}
              resetWhenError
              time={60}
              onClick={() => sendCode()}
              btnStyle={{ borderColor: '#fff', paddingRight: 0 }}
              disableBdColor={{ borderColor: 'transparent' }}
              btnTextStyle={{ color: mainColor, fontSize: 14 }}
            />
          </View>
        </View>

        <View style={styles.textView}>
          <Text allowFontScaling={false} style={styles.text1}>
            提示
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            1.为了保障您的账户信息安全，在您变更账户重要信息时，需要对您的身份进行验证。感谢您的理解和支持！
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            2.如出现收不到短信的情况，可能是由于通信网络异常造成，请您稍后重新尝试操作！
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    backgroundColor: '#fff',
    marginVertical: 12
  },
  item: {
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  label: {
    width: 56,
    marginRight: 12
  },
  textView: {
    flexDirection: 'column',
    paddingHorizontal: 12,
    marginTop: 8
  },
  text1: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
    fontWeight: 'bold'
  },
  text: {
    color: 'rgba(0,0,0,0.4)',
    lineHeight: 20,
    fontSize: 12
  },
  grey: {
    color: 'rgba(0,0,0,0.8)'
  },
  input: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
    padding: 0
  },
  navigate: {
    paddingLeft: 12,
    paddingRight: 12
  }
});
