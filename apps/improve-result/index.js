import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StoreProvider, msg } from 'plume2';

import * as WMkit from 'wmkit/kit';
import Header from 'wmkit/header';

import AppStore from './store';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class ImproveResult extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    this._doCount();
  }

  componentWillUnmount() {
    //清除倒计时
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const minutes = this.store.state().get('minutes');
    return (
      <View style={{ flex: 1 }}>
        <Header title="账户信息提交" />
        <View style={styles.header}>
          <Image style={styles.img} source={require('./img/result-suc.png')} />
          <Text allowFontScaling={false} style={[styles.text, {fontSize: 16, fontWeight: '500', marginTop: 16}]}>账户信息提交成功！</Text>
          <Text allowFontScaling={false} style={[styles.text, {color: 'rgba(0,0,0,0.4)', marginTop: 12}]}>
            您的账户信息已经提交审核
          </Text>
          <Text allowFontScaling={false} style={[styles.text, {color: 'rgba(0,0,0,0.4)'}]}>
            请耐心等待
          </Text>
          <Text allowFontScaling={false} style={[styles.text, {color: 'rgba(0,0,0,0.4)'}]}>
            {minutes}s后自动跳转到登录页面
          </Text>
        </View>
      </View>
    );
  }

  _doCount = () => {
    this.timer = setInterval(() => {
      const start = this.store.state().get('minutes');
      if (start == 1) {
        clearInterval(this.timer);
        WMkit.logout();
        msg.emit('login-page:refresh');
        // 返回上一页
        msg.emit('router: goToNext', { routeName: 'Login' });
      }
      this.store.setTime();
    }, 1000);
  };
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 53,
    paddingBottom: 36,
    paddingHorizontal: 12
  },
  img: {
    width: 48,
    height: 48
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    lineHeight: 22
  }
});
