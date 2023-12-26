import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  PixelRatio,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';
import ValidConst from 'wmkit/validate';
import * as Button from 'wmkit/button';
import Header from 'wmkit/header';
import Register from './components/register';
import Agreement from './components/agreement';
import EnterpriseRegister from './components/enterprise-register';
import EnterpriseAgreement from './components/enterprise-agreement';
import { StoreProvider, msg } from 'plume2';
import UUID from 'uuid-js';
import AppStore from './store';
import { Provider } from '@ant-design/react-native';

const LongButton = Button.LongButton;
const SendButton = Button.SendButton;
@StoreProvider(AppStore, { debug: __DEV__ })
export default class Main extends React.Component {
  store;
  isClickCenter = false;
  UNSAFE_componentWillMount() {
    this.store.init(UUID.create().toString());
  }

  render() {
    const showPass = this.store.state().get('isShowpwd');
        //企业购的flag
        const iepFlag = this.store.state().get('iepFlag');
        const showEnterpriseAgreement = this.store
          .state()
          .get('showEnterpriseAgreement');
        const showEnterprise = this.store.state().get('showEnterprise');
        const showAgreement = this.store.state().get('showAgreement');
    return (
      <View
        style={styles.container}
      >
        <Provider style={{ width: 600 }}>
          {showEnterprise ? (
            <EnterpriseRegister />
            ) : (
            <Register />
          )}
          {showAgreement && <Agreement />}
          {showEnterpriseAgreement && <EnterpriseAgreement />}
        </Provider>
      </View>
    );
  }

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

  _sendCode = () => {
    const mobile = this.store.state().get('mobile');
    const regex = ValidConst.phone;
    if (mobile == '') {
      msg.emit('app:tip', '手机号不能为空');
      return false;
    } else if (!regex.test(mobile)) {
      msg.emit('app:tip', '手机号格式有误');
      return false;
    } else {
      return true;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12
  },
  text: {
    color: '#333',
    fontSize: 14
  },
  input: {
    color: '#333',
    fontSize: 14,
    textAlign: 'right',
    flex: 1
  },
  smallBtn: {
    borderWidth: 1,
    borderColor: '#3d85cc',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10
  },
  bluetext: {
    color: '#3d85cc',
    fontSize: 12
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  registerLink: {
    padding: 12,
    flexDirection: 'row',
    height: 50
  },
  smallText: {
    fontSize: 12,
    color: '#333'
  },
  imgEyes: {
    width: 22,
    height: 22,
    marginLeft: 10,
    tintColor: '#333'
  },
  btnStyle: {
    borderColor: '#000'
  }
});
