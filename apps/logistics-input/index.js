import React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { StoreProvider } from 'plume2';

import * as Button from 'wmkit/button';
import Header from 'wmkit/header';

import AppStore from './store';
import LogisticsForm from './components/logistics-form';
import { _ } from 'wmkit';
import {mainColor, screenWidth} from 'wmkit/styles/index';

const SubmitButton = Button.Submit;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class LogisticsInput extends React.Component {
  store;

  constructor(props) {
    super(props);
    this.isClickCenter = false;
  }

  componentDidMount() {
    // 获取传过来的退单编号
    const state = this.props.route;
    const params = (state && state.params) || {}
    // 退单编号
    const { rid, storeId } = params;
    this.store.init(rid, storeId);
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
        <Header title="填写物流信息" />
        <View style={{flex: 1}}
          onStartShouldSetResponderCapture={() => {
            // 内层view后捕获事件;
            this.isClickCenter = true;
          }}
        >
          <LogisticsForm />
        </View>
        <View style={styles.button}>
          <SubmitButton
            disabled={false}
            text="确定"
            aotuFixed={true}
            colors={[mainColor, mainColor]}
            boxStyle={{ flex: 1 }}
            isLinear={true}
            onClick={() => this.store.save()}
          />
        </View>
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
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    ),
    backgroundColor: '#ffffff'
  }
});
