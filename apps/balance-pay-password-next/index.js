import React from 'react';
import { StoreProvider } from 'plume2';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  PixelRatio,
  TouchableOpacity,
  Image
} from 'react-native';
import Header from 'wmkit/header';
import AppStore from './store';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserSafePassword extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //判断是忘记密码还是设置密码
    const state = this.props.route;
    const { forget } = (state && state.forget) || false;
    this.store.init(forget);
  }

  render() {
    const isShowpwd = this.store.state().get('isShowpwd');
    const password = this.store.state().get('password');
    console.log(password, 'v.password');
    return (
      <View style={styles.container}>
        <Header
          title="设置支付密码"
          renderRight={() => {
            return (
              <TouchableOpacity
                style={styles.navigate}
                onPress={() => this.store.updatePass()}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: 'rgba(0,0,0,0.8)',
                    fontSize: 13,
                    marginRight: 10
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
            <Text allowFontScaling={false} style={styles.nav}>
              请输入新的支付密码
            </Text>
            <View style={styles.payContent}>
              <View style={styles.payItem}>
                {[0, 1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={
                        index == 5
                          ? [styles.paylist, styles.payrow]
                          : styles.paylist
                      }
                    >
                      {password.length > index ? (
                        <Text style={styles.payPwd} />
                      ) : null}
                    </View>
                  );
                })}
              </View>
              <TextInput
                autoFocus={window.keyBoardShow}
                style={styles.input}
                secureTextEntry={isShowpwd ? false : true}
                keyboardType="ascii-capable"
                returnKeyType="done"
                maxLength={6}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onChangeText={(value) => this.store.getNewPass(value)}
              />
            </View>
          </View>
        </View>
        <View style={styles.textView}>
          <Text style={styles.text1}>提示</Text>
          <Text style={styles.text}>
            1.为了保障您的账户信息安全，在您变更账户重要信息时，需要对您的身份进行验证。感谢您的理解和支持！
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
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  textView: {
    flexDirection: 'column',
    paddingHorizontal: 12,
    marginTop: 8
  },
  imgEyes: {
    width: 22,
    height: 22,
    marginLeft: 10
  },
  nav: {
    fontSize: 14,
    color: '#333333'
  },
  input: {
    position: 'absolute',
    width: 1000,
    height: '100%',
    left: -500
  },
  payContent: {
    position: 'relative',
    left: 0,
    width: '100%',
    marginTop: 12
  },
  payItem: {
    // width: 345,
    height: 40,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e6e6e6'
  },
  paylist: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
    borderRightWidth: 1,
    height: 40,
    borderRightColor: '#e6e6e6'
  },
  payrow: {
    borderRightWidth: 0
  },
  payPwd: {
    width: 10,
    height: 10,
    borderRadius: 15,
    backgroundColor: '#555'
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
  navigate: {
    paddingLeft: 12,
    paddingRight: 12
  }
});
