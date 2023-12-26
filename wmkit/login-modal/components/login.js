import React from 'react';
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Relax } from 'plume2';
import AccountFrom from './account-from';
import DynamicFrom from './dynamic-from';
import QuickLogin from './quick-login';
import { isAndroid, screenWidth } from 'wmkit/styles/index';
import * as _ from '../../common/util';

@Relax
export default class Login extends React.Component {
  static relaxProps = {
    isALogin: 'isALogin',
    loginChange: () => {
    },
    toggleLogin: () => {
    },
    pcLogo: 'pcLogo',
    toggleVisible: () => {
    },
    wxFlag: 'wxFlag',
    setAccount:() => {
    },
  };
  isClickCenter = false;
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

  render() {
    const {
      isALogin,
      loginChange,
      toggleLogin,
      pcLogo,
      toggleVisible,
      wxFlag,
      setAccount
    } = this.props.relaxProps;
    const props = this.props
    return (
      <View style={styles.container}
        onStartShouldSetResponderCapture={() => {
          this.isClickCenter = false;
          this._dismissKeyboard();
          return false;
        }}
      >
        <View style={styles.loginContent}>
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
            {isALogin ? <AccountFrom isCheckAccount={props.IsCheck}/> : <DynamicFrom  isDynamic={props.IsCheck}/>}
          </View>
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.8}
              onPress={() => loginChange()}
            >
              <Text style={styles.itemText} allowFontScaling={false}>
                {isALogin ? '短信验证码登录' : '账号密码登录'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              activeOpacity={0.8}
              onPress={() => toggleLogin()}
            >
              <Text style={styles.registerText} allowFontScaling={false}>
                新用户注册
              </Text>
            </TouchableOpacity>
          </View>

          {wxFlag && <QuickLogin isCheckQuickLogin={props.IsCheck} />}
        </View>

        {/*关闭登录弹窗*/}
        <TouchableOpacity
          style={styles.closeBox}
          activeOpacity={0.8}
          onPress={() =>{
            toggleVisible({ visible: false, callBack: null })
            setAccount('');
          }
        }
        >
          <Image source={require('../img/close.png')} style={styles.close}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: '#fff',
    ..._.ifIphoneX(
      {
        paddingTop: 85,
      },
      {
        paddingTop: isAndroid ? 50 : 70,
      },
    ),
  },
  loginContent: {
    // flex: 1
    // width: '75%'
  },
  closeBox: {
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 30,
      },
      {
        top: isAndroid ? 0 : 20,
      },
    ),
    left: 0,
    padding: 20,
  },
  close: {
    width: 16,
    height: 16,
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    position:'absolute',
    width: 345,
    height: 57,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: screenWidth < 385 ? 20 : 50,
    marginBottom: screenWidth < 385 ? 0 : 30,
  },
  item: {
    flex: 1,
  },
  itemText: {
    color: '#999',
  },
  itemTextSelected: {
    color: '#000',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#999',
  },
  img: {
    width: 9,
    height: 7,
    marginLeft: 5,
  },
  copyText: {
    fontSize: 12,
    backgroundColor: 'transparent',
    lineHeight: 14,
    color: '#4992d9',
  },
});
