import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import { StoreProvider, msg } from 'plume2';
import AppStore from './store';
import ValidConst from 'wmkit/validate';
import * as Button from 'wmkit/button';
import Header from 'wmkit/header';
import { mainColor } from '@/wmkit/styles';

const SendButton = Button.SendButton;
@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserPhoneSubmit extends React.Component {
  store;

  componentDidMount() {
    //绑定按钮事件
    msg.emit('router: setParams', {
      handleChange: this.store.changeMobile
    });
  }

  render() {
    const mobile = this.store.state().get('mobile');
    const code = this.store.state().get('code');
    const state = this.props.route;
    return (
      <View style={styles.container}>
        <Header
          title="修改绑定手机号"
          renderRight={() => {
            return (
              <TouchableOpacity
                style={styles.navigate}
                onPress={() => state.params.handleChange()}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: 'rgba(0,0,0,0.8)',
                    fontSize: 14,
                    marginRight: 2
                  }}
                >
                  提交
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.content}>
          <View style={styles.item}>
            <Text allowFontScaling={false} style={styles.label}>
              新手机号
            </Text>
            <TextInput
              autoFocus={window.keyBoardShow}
              value={mobile}
              onChangeText={(text) => this.store.getMobile(text)}
              keyboardType="numeric"
              maxLength={11}
              style={styles.input}
              placeholder="请输入新的手机号"
              underlineColorAndroid="transparent"
            />
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
              onChangeText={(text) => this.store.getCode(text)}
            />
            <SendButton
              clickValid={() => this._sendCode()}
              resetWhenError
              time={60}
              onClick={() => this.store.sendCode()}
              btnStyle={{ borderColor: '#fff', paddingRight: 0 }}
              disableBdColor={{ borderColor: 'transparent' }}
              btnTextStyle={{ color: mainColor, fontSize: 14 }}
            />
          </View>
        </View>
        <View style={styles.textView}>
          <Text style={styles.text1}>提示</Text>
          <Text style={styles.text}>
            1.修改绑定手机将会同时修改您的登录手机，请您谨慎操作！
          </Text>
          <Text style={styles.text}>
            2.如出现收不到短信的情况，可能是由于通信网络异常造成，请您稍后重新尝试操作！
          </Text>
        </View>
      </View>
    );
  }

  _sendCode = () => {
    const mobile = this.store.state().get('mobile');
    const regex = ValidConst.phone;
    if (mobile == '') {
      msg.emit('app:tip', '手机号不能为空！');
      return false;
    } else if (!regex.test(mobile)) {
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
  content: {
    backgroundColor: '#fff',
    marginTop: 12
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  textView: {
    flexDirection: 'column',
    paddingHorizontal: 12,
    marginTop: 8
  },
  label: {
    width: 60,
    marginRight: 12
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
