/**
 * Created by feitingting on 2017/8/28.
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import { msg, StoreProvider } from 'plume2';
import AppStore from './store';
import Header from 'wmkit/header';
import {throttle} from 'lodash';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserFinance extends React.Component {
  store;

  componentDidMount() {
    this.store.init();
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="财务信息" />
        <View style={{ flex: 1 ,marginTop:12}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.item}
            onPress={
              throttle(()=>this._goToNext('UserAccount'),1000,
                {
                  leading: true,
                  trailing: false
                }
              )
            }
          >
            <Text allowFontScaling={false} style={styles.text}>银行账户</Text>
            <Image source={require('./img/arrow.png')} style={styles.img} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.item}
            onPress={
              throttle(()=>this._goToNext('UserInvoice'),1000,
                {
                  leading: true,
                  trailing: false
                }
              )
            }
          >
            <Text allowFontScaling={false} style={styles.text}>增票资质</Text>
            <Image source={require('./img/arrow.png')} style={styles.img} />
          </TouchableOpacity>
          {this.store.state().get('showEmailList') && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.item}
              onPress={
                throttle(()=>this._goToNext('UserEmail'),1000,
                {
                  leading: true,
                  trailing: false
                }
              )
              }
            >
              <Text allowFontScaling={false} style={styles.text}>财务邮箱</Text>
              <Image source={require('./img/arrow.png')} style={styles.img} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  _goToNext = (routerName) => {
    msg.emit('router: goToNext', {
      routeName: routerName
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
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
    backgroundColor:'#fff'
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14
  },
  img: {
    width: 12,
    height: 12
  }
});
