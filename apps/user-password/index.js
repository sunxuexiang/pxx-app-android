import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import ValidConst from 'wmkit/validate';
import * as Button from 'wmkit/button';
import Header from 'wmkit/header';
import { mainColor } from 'wmkit/styles/index';
import { StoreProvider, msg } from 'plume2';
import AppStore from './store';
const SendButton = Button.SendButton;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserPassword extends React.Component {
  store;

  componentDidMount() {
    msg.emit('router: setParams', { handleNext: this.store.doNext });
    this.store.init();
  }

  render() {
    const mobile = this.store.state().get('mobile');
    const code = this.store.state().get('code');
    const isLogin = this.store.state().get('isLogin');
    const state = this.props.route;
    return (
      <View style={styles.container}>
        <Header
          title="手机号验证"
          renderRight={() => {
            return (
              <View>
                <TouchableOpacity
                  style={styles.navigate}
                  onPress={() => state.params.handleNext()}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: 'rgba(0,0,0,0.8)',
                      fontSize: 14,
                      marginRight: 2
                    }}
                  >
                    下一步
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          onLeftMenuPress={()=>{
            msg.emit('router: back');
            !isLogin && msg.emit('loginModal:toggleVisible', {
              callBack: ()=>{
                msg.emit('router: goToNext', { routeName: 'Main' });
              }
            });
          }}
        />
        <View style={styles.content}>
          <View style={styles.item}>
            <Text allowFontScaling={false} style={styles.label}>
              手机号
            </Text>
            {isLogin ? (
              <Text allowFontScaling={false} style={styles.grey}>
                {mobile}
              </Text>
            ) : (
              <TextInput
                autoFocus={window.keyBoardShow}
                value={mobile}
                style={styles.input}
                placeholder="请输入您的手机号码"
                keyboardType="numeric"
                maxLength={11}
                underlineColorAndroid="transparent"
                placeholderTextColor="#999"
                onChangeText={(text) => this.store.getMobile(text)}
              />
            )}
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
