import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import { mainColor } from 'wmkit/styles/index';
import { IMainSalesTab } from '../types';

type ISalesTabProps = T.IProps & T.ISalesTabProps;

@connect<Partial<ISalesTabProps>, T.ISalesTabState>(
  store2Props,
  actions,
)
export default class SalesTab extends React.Component<
  Partial<ISalesTabProps>,
  T.ISalesTabState
> {
  constructor(props: ISalesTabProps) {
    super(props);
  }

  /**
    销售业绩tab页
*/
  render() {
    let {
      main: {
        salesTab
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.nav, salesTab === 'day' ? { borderBottomColor: mainColor } : {}]}
          activeOpacity={0.8}
          onPress={() => {
            this._changeSaleTab('day');
          }}
        >
          <Text
            style={[styles.text, salesTab === 'day' ? { color: mainColor } : {}]}
            allowFontScaling={false}
          >
            日销售业绩
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nav, salesTab === 'month' ? { borderBottomColor: mainColor } : {}]}
          activeOpacity={0.8}
          onPress={() => {
            this._changeSaleTab('month');
          }}
        >
          <Text
            style={[styles.text, salesTab === 'month' ? { color: mainColor } : {}]}
            allowFontScaling={false}
          >
            月销售业绩
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _changeSaleTab(tab :IMainSalesTab) {
    let {
      actions: {action}
    } = this.props;
    action.commonChange([
      { paths: 'main.salesTab', value: tab },
      { paths: 'main.month', value: null },
      { paths: 'main.monthFlag', value: false },
      { paths: 'main.dateTab', value: '0'}
    ]);
    action.querySalesList();
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    backgroundColor: '#fff'
  },
  nav: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent'
  },
  text: {
    color: '#333',
    fontSize: 12
  }
});
