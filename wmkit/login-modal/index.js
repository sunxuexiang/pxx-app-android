import React from 'react';
import { Keyboard, StatusBar, StyleSheet, View } from 'react-native';
import { msg, StoreProvider } from 'plume2';
import Login from './components/login';
import { isIOS } from 'wmkit/styles/index';
import AppStore from './store';
import Register from './components/register';
import Agreement from './components/agreement';
import EnterpriseRegister from './components/enterprise-register';
import EnterpriseAgreement from './components/enterprise-agreement';
import PrivacyPolicyAgreement from './components/privacyPolicy-agreement';
import UsersRegistrationAgreement from './components/usersregistration-agreement'
import { Provider } from '@ant-design/react-native';

/**
 * 登录弹窗
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class WMLoginModal extends React.PureComponent {
  store;

  //控制弹框显示隐藏
  UNSAFE_componentWillMount() {
    msg.on('loginModal:toggleVisible', this.toggleVisible);
  }

  //组件销毁事件解绑
  componentWillUnmount() {
    msg.off('loginModal:toggleVisible', this.toggleVisible);
  }

  constructor(props) {
    super(props);
  }

  render() {
    const showLogin = this.store.state().get('showLogin');
    const showAgreement = this.store.state().get('showAgreement');
    //企业购的flag
    const iepFlag = this.store.state().get('iepFlag');
    const showEnterpriseAgreement = this.store
      .state()
      .get('showEnterpriseAgreement');
    const showPrivacyPolicyAgreement = this.store
      .state()
      .get('showPrivacyPolicyAgreement');
    const showUserRegistrationAgreement = this.store
      .state()
      .get('showUserRegistrationAgreement');
    const showEnterprise = this.store.state().get('showEnterprise');
    const Check = this.store.state().get('isCheck')
    return (
      this.store.state().get('modalVisible') && (
        <View style={styles.container}>
          <Provider style={{ width: 600 }}>
            {isIOS && <StatusBar barStyle="dark-content" />}
            {showLogin ? (
              <Login  IsCheck={Check}/>
            ) : showEnterprise ? (
              <EnterpriseRegister IsCheck={Check}/>
            ) : (
                  <Register IsCheck={Check}/>
                )}
            {showAgreement && <Agreement />}
            {showEnterpriseAgreement && <EnterpriseAgreement />}
            {showPrivacyPolicyAgreement && <PrivacyPolicyAgreement />}
            {showUserRegistrationAgreement && <UsersRegistrationAgreement />}
          </Provider>
        </View>
      )
    );
  }

  toggleVisible = ({ callBack }) => {
    //初始化页面
    this.store.init();
    this.store.toggleVisible({ visible: true, callBack });
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
  }
});
