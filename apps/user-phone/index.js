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
import Header from 'wmkit/header';
import * as Button from 'wmkit/button';
import * as WMkit from 'wmkit/kit';

import AppStore from './store';
import { mainColor } from '@/wmkit/styles';

const SendButton = Button.SendButton;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserPhone extends React.Component {
  store;
  componentDidMount() {
    msg.emit('router: setParams', { handleNext: this.store.doNext });
    this.store.init();
  }

  render() {
    const mobile = this.store.state().get('mobile');
    const code = this.store.state().get('code');
    const state = this.props.route;

    return (
      <View style={styles.container}>
        <Header
          title="手机号验证"
          renderRight={() => {
            return (
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
            );
          }}
        />
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
              onChangeText={(text) => this.store.getCode(text)}
            />
            <SendButton
              clickValid={() => WMkit.testTel(mobile)}
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
