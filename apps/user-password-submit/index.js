import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import { StoreProvider, msg } from 'plume2';
import AppStore from './store';
import Header from 'wmkit/header';
import { mainColor } from 'wmkit/styles/index';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserPasswordSubmit extends React.Component {
  store;

  componentDidMount() {
    //绑定头部按钮点击事件
    msg.emit('router: setParams', { handleSubmit: this.store.updatePass });
    this.store.init();
  }

  render() {
    const showPass = this.store.state().get('isShowpwd');
    const state = this.props.route;
    return (
      <View style={styles.container}>
        <Header
          title="修改密码"
          renderRight={() => {
            return (
              <TouchableOpacity
                style={styles.navigate}
                onPress={() => state.params.handleSubmit()}
              >
                <Text
                  allowFontScaling={false}
                  style={{ color: '#000', fontSize: 14, marginRight: 2 }}
                >
                  提交
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.content}>
          <View style={styles.item}>
            <Text allowFontScaling={false} style={styles.nav}>
              新密码
            </Text>
            <TextInput
              autoFocus={window.keyBoardShow}
              style={styles.input}
              secureTextEntry={showPass ? false : true}
              keyboardType="ascii-capable"
              placeholder="请输入新的登录密码"
              returnKeyType="done"
              maxLength={16}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(value) => this.store.getNewPass(value)}
            />
            <TouchableOpacity onPress={() => this.store.showPass()}>
              {showPass ? (
                <Image
                  style={[styles.openimgEyes, { tintColor: mainColor }]}
                  source={require('../login/img/eyes-open.png')}
                />
              ) : (
                <Image
                  style={styles.imgEyes}
                  source={require('../login/img/eyes-close.png')}
                />
              )}
            </TouchableOpacity>
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
  },
  imgEyes: {
    width: 20,
    height: 20
  },
  openimgEyes: {
    width: 20,
    height: 20
  },
  nav: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    marginRight: 26
  }
});
