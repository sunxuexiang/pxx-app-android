import React from 'react';
import {
  View,
  StyleSheet,
  PixelRatio,
  Dimensions,
  ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StoreProvider, msg } from 'plume2';

import * as Button from 'wmkit/button';
import * as WMkit from 'wmkit/kit';
import Header from 'wmkit/header';

import AppStore from './store';
import Tip from './components/tip';
import DetailForm from './components/detail-form';
import { Provider } from '@ant-design/react-native';
const LongButton = Button.LongButton;
const { height: SCREENHEIGHT } = Dimensions.get('window');
@StoreProvider(AppStore, { debug: __DEV__ })
export default class ImproveInformation extends React.Component {
  store;

  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    this.store.init(state.params.customerId).then(() => {
      const checked = this.store.state().get('checked');
      const initialName = this.store.state().get('initialName');
      if (checked == 0 && initialName != '') {
        this._doCount();
      }
    });
  }

  componentWillUnmount() {
    //清除倒计时
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {

    const enterpriseCheckState = this.store.state().get('enterpriseCheckState');
    const disabledFlag = enterpriseCheckState === 1;

    return (
      <View style={styles.container}>
        <Provider>
          <Header title="完善企业账户信息" />
          <KeyboardAwareScrollView>
            <Tip />
            <ScrollView>
              <DetailForm />
            </ScrollView>
          </KeyboardAwareScrollView>
          {!disabledFlag && (
            <LongButton text="提交" onClick={() => this.store.doEnterpriseSubmit()} />
          )}
        </Provider>
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
        msg.emit('router: back');
      }
      this.store.setTime();
    }, 1000);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    flexDirection: 'row'
  },
  smallText: {
    fontSize: 12,
    color: '#939495'
  },
  scroll: {
    height: SCREENHEIGHT,
    marginTop: -20,
    flex: 1
  }
});
