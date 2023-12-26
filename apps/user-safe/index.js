import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import AppStore from './store';
import { msg, StoreProvider } from 'plume2';
import Header from 'wmkit/header';
import {throttle} from 'lodash';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserSafe extends React.Component {
  store;

  componentDidMount() {
    this.store.init();
  }

  render() {
    const state = this.store.state();
    return (
      <View style={styles.container}>
        <Header title="账户安全" />
        <View style={styles.box1}>
          <TouchableOpacity
            onPress={
              throttle(()=>this._goToNext('UserPassword'),1000,
              {
                leading: true,
                trailing: false
              }
            )
            }
          >
            <View style={styles.item}>
              <Text style={styles.text} allowFontScaling={false}>
                登录密码
              </Text>
              <Image source={require('./img/arrow.png')} style={styles.img} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              throttle(()=>this._goToNext('PayPassword'),1000,
              {
                leading: true,
                trailing: false
              }
            )
            }
          >
            <View style={styles.item}>
              <Text style={styles.text} allowFontScaling={false}>
                支付密码
              </Text>
              <Image source={require('./img/arrow.png')} style={styles.img} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.box1}>
          <TouchableOpacity onPress={throttle(this._toUserPhone,1000,
                {
                  leading: true,
                  trailing: false
                }
              )}>
            <View style={styles.item}>
              <Text style={styles.text} allowFontScaling={false}>
                手机绑定
              </Text>
              <View style={styles.phoneNum}>
                <Text style={styles.number}>{state.get('accountName')}</Text>
                <Image source={require('./img/arrow.png')} style={styles.img} />
              </View>
            </View>
          </TouchableOpacity>
          {state.get('wxFlag') ? (
            <TouchableOpacity
              onPress={
                throttle(()=>this._goToNext('LinkedAccount'),1000,
                {
                  leading: true,
                  trailing: false
                }
              )
              }
            >
              <View style={styles.item}>
                <Text style={styles.text} allowFontScaling={false}>
                  关联账号
                </Text>
                <View style={styles.phoneNum}>
                  <Image
                    source={require('./img/arrow.png')}
                    style={styles.img}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }

  _goToNext = (routerName) => {
    msg.emit('router: goToNext', {
      routeName: routerName
    });
  };

  _toUserPhone = () => {
    msg.emit('app:tip', '修改绑定手机将会修改您的登录手机号，请您谨慎操作！');
    setTimeout(() => {
      msg.emit('router: goToNext', { routeName: 'UserPhone' });
    }, 2000);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  box1: {
    marginTop: 12
  },
  item: {
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff'
  },
  phoneNum: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  number:{
    fontSize:12,
    color:'rgba(0,0,0,0.8)',
    paddingRight:8
  },
  textRight: {
    textAlign: 'right',
    fontSize: 20,
    color: '#000',
    flex: 1
  },
  img: {
    width: 12,
    height: 12
  },
  text: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  }
});
