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
import { mainColor } from 'wmkit/styles/index';
import ImproveResult from './components/result';
import DetailForm from './components/detail-form';
import { Provider } from '@ant-design/react-native';
import { _ } from 'wmkit';
import { screenWidth } from 'wmkit/styles/index';

const SubmitButton = Button.Submit;
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
    const checked = this.store.state().get('checked');
    const initialName = this.store.state().get('initialName');

    return (
      // TODO 下面的这段代码会导致注册完成后崩溃，需要排查
      <View style={styles.container}>
        <Provider>
          <Header title="完善账户信息" />
            {checked == 0 && initialName != '' ? null : <Tip />}

            <ScrollView>
              <ImproveResult />
              <DetailForm />
            </ScrollView>

          {checked == 0 && initialName != '' ? null : (
            <View style={styles.button}>
              <SubmitButton
                disabled={false}
                text="提交"
                aotuFixed={true}
                colors={[mainColor, mainColor]}
                boxStyle={{ flex: 1 }}
                isLinear={true}
                onClick={() => this.store.doPerfect()}
              />
            </View>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingHorizontal: 12,
    width: screenWidth,
    ..._.ifIphoneX(
      {
        height: 90,
        paddingBottom: 34
      },
      {
        height: 56
      }
    )
  }
});
