import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PixelRatio
} from 'react-native';
import { StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppStore from './store';
import Form from './components/form';
import Header from 'wmkit/header';
import { Confirm } from 'wmkit/modal/confirm';

/**
 * 提现记录详情
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class CashDetail extends React.Component {
  componentDidMount() {
    const state = this.props.route;
    const { drawCashId } = (state && state.params) || {};
    this.store.init(drawCashId);
  }

  render() {
    const drawCashId = this.store.state().get('drawCashId');
    const drawCashDetail = this.store.state().get('drawCashDetail');
    return (
      <View style={styles.container}>
        <Header title="提现详情" />
        <Form />
        {drawCashDetail.get('customerOperateStatus') == 0 &&
          drawCashDetail.get('auditStatus') == 0 && (
            <SafeAreaView style={styles.btnBox}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => this.cancelDrawCash(drawCashId)}
              >
                <Text allowFontScaling={false} style={styles.btnText}>
                  取消申请
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          )}
      </View>
    );
  }

  /**
   * 取消提现申请
   */
  cancelDrawCash = (drawCashId) => {
    Confirm({
      text: '是否确认取消当前提现申请',
      cancelText: '再想想',
      okText: '确认',
      okFn: async () => {
        this.store.cancelDrawCash(drawCashId);
      }
    });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  btnBox: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb',
    backgroundColor: '#fff',
    alignItems: 'flex-end'
  },
  btn: {
    marginVertical: 3,
    width: 84,
    height: 36,
    borderRadius: 18,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  btnText: {
    fontSize: 14,
    color: '#333'
  }
});
