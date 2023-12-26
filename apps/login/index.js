import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  StatusBar
} from 'react-native';
import { StoreProvider, msg } from 'plume2';
import * as _ from '../../wmkit/common/util'; // added by scx
import AppStore from './store';
import Bottom from './component/bottom';
import LoginTab from './component/login-tab';
import AccountFrom from './component/account-from';
import DynamicFrom from './component/dynamic-from';
import { isAndroid } from 'wmkit/styles/index';
import { screenWidth } from '@/wmkit/styles';
import { Provider } from '@ant-design/react-native';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class Login extends React.Component {
  isClickCenter = false;

  UNSAFE_componentWillMount() {
    msg.on('login-page:refresh', this._refresh);
    this.store.init();
  }

  componentWillUnmount() {
    msg.off('login-page:refresh', this._refresh);
  }

  constructor(props) {
    super(props);
  }

  render() {
    const logoUrl = this.store.state().get('pcLogo');
    const isALogin = this.store.state().get('isALogin');
    return (
      <View
        style={styles.container}
        onStartShouldSetResponderCapture={() => {
          this.isClickCenter = false;
          this._dismissKeyboard();
          return false;
        }}
      >
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        {/*<Provider style={{ width: 600 }}>*/}
        <View style={styles.content}>
          <View style={styles.logoBox}>
            <Image
              resizeMode="contain"
              source={require('wmkit/theme/login.png')}
              style={styles.logo}
            />
          </View>
          <View
            style={{marginTop:57}}
            onStartShouldSetResponderCapture={() => {
              // 内层view后捕获事件;
              this.isClickCenter = true;
            }}
          >
            {isALogin ? <AccountFrom /> : <DynamicFrom />}
            <LoginTab />
          </View>
        </View>
        {/*</Provider>*/}
        {/*<View*/}
        {/*  style={{*/}
        {/*    ..._.ifIphoneX(*/}
        {/*      {*/}
        {/*        height: 140*/}
        {/*      },*/}
        {/*      {*/}
        {/*        height: isAndroid ? 100 : 120*/}
        {/*      }*/}
        {/*    )*/}
        {/*  }}*/}
        {/*/>*/}
        <Bottom />
      </View>
    );
  }

  _refresh = () => {
    this.store.init();
  };

  /**
   * 点击空白隐藏键盘
   * @private
   */
  _dismissKeyboard = () => {
    setTimeout(() => {
      if (!this.isClickCenter) {
        Keyboard.dismiss();
      }
    }, 100); // 延时100毫秒等待事件传递完成;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // justifyContent: 'flex-start',
    // alignItems: 'center'
  },
  content: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    ..._.ifIphoneX(
      {
        paddingTop: 85
      },
      {
        paddingTop: isAndroid ? 50 : 70
      }
    )
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    position:'absolute',
    width: 345,
    height: 57,
  },
  link: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bluetext: {
    fontSize: 14,
    color: '#000'
  },
  img: {
    width: 9,
    height: 7,
    marginLeft: 10
  }
});
