import React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { StoreProvider } from 'plume2';
import * as Button from 'wmkit/button';
import Header from 'wmkit/header';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppStore from './store';
import Payment from './components/payment';
import Tips from './components/tips';

const LongButton = Button.LongButton;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class FillPayment extends React.Component {
  store;

  isClickCenter = false;

  componentDidMount() {
    // 获取传过来的订单编号
    const state = this.props.route;
    const params = (state && state.params) || {}
    const { tid } = params;
    this.store.init(tid);
    if (window.y || window.y == 0) {
      this._scroll.scrollToPosition(0, window.y);
    }
  }

  render() {
    return (
      <View
        style={styles.container}
        onStartShouldSetResponderCapture={() => {
          this.isClickCenter = false;
          this._dismissKeyboard();
          return false;
        }}
      >
        <Header title="填写付款单" />
        <KeyboardAwareScrollView
          ref={(ref) => (this._scroll = ref)}
          onScroll={(event) => {
            window.y = event.nativeEvent.contentOffset.y;
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              onStartShouldSetResponderCapture={() => {
                // 内层view后捕获事件;
                this.isClickCenter = true;
              }}
            >
              <Tips />
              <Payment />
            </View>
          </View>
        </KeyboardAwareScrollView>

        <LongButton text="提交" btnStyle={{ borderRadius: 24 }} onClick={() => this.store.save()} />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
});
