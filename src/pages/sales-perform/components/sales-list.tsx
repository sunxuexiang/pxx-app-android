import React from 'react';
import { StyleSheet, View, Text, ScrollView, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import { IMainSaleData, IMainSalesItem, IMainSalesTab } from '../types';
import * as _ from 'wmkit/common/util';
import WMEmpty from 'wmkit/empty';

type ISalesListProps = T.IProps & T.ISalesListProps;

@connect<Partial<ISalesListProps>, T.ISalesListState>(
  store2Props,
  actions
)
export default class SalesList extends React.Component<
  Partial<ISalesListProps>,
  T.ISalesListState
> {
  constructor(props: ISalesListProps) {
    super(props);
  }

  /**
   销售业绩列表
   */
  render() {
    let {
      actions: { action },
      main: { saleData, salesTab, isReady }
    } = this.props;

    return (
      <ScrollView style={styles.container}>
        {this._renderHeader(saleData)}
        {saleData.dataList.map((item) => this._renderItem(item, salesTab))}
        {isReady &&
          saleData.dataList.length == 0 && (
            <WMEmpty
              marginTop={300}
              emptyImg={require('../img/list-none.png')}
              desc="暂无销售业绩"
            />
          )}
      </ScrollView>
    );
  }

  _renderHeader(saleData: IMainSaleData) {
    return (
      <View style={[styles.row, styles.headRow]}>
        <View style={[styles.col, styles.headFirstCol]}>
          <Text allowFontScaling={false} style={styles.totalText}>
            合计业绩
          </Text>
        </View>
        <View style={[styles.col, styles.headCol]}>
          <Text allowFontScaling={false} style={styles.normalText}>
            销售额
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.priceText, { color: mainColor }]}
            numberOfLines={1}
          >
            ￥{_.addZero(saleData.totalSaleAmount)}
          </Text>
        </View>
        <View style={[styles.col, styles.headCol]}>
          <Text allowFontScaling={false} style={styles.normalText}>
            返利
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.priceText, { color: mainColor }]}
            numberOfLines={1}
          >
            ￥{_.addZero(saleData.totalCommission)}
          </Text>
        </View>
      </View>
    );
  }

  _renderItem(item: IMainSalesItem, salesTab: IMainSalesTab) {
    const dateStr = salesTab === 'day' ? item.targetDate : item.targetMonth;

    return (
      <View key={dateStr} style={styles.row}>
        <View style={[styles.col, styles.firstCol]}>
          <Text
            allowFontScaling={false}
            style={styles.normalText}
            numberOfLines={1}
          >
            {dateStr}
          </Text>
        </View>
        <View style={styles.col}>
          <Text
            allowFontScaling={false}
            style={[styles.priceText, { color: mainColor }]}
            numberOfLines={1}
          >
            ￥{_.addZero(item.saleAmount)}
          </Text>
        </View>
        <View style={styles.col}>
          <Text
            allowFontScaling={false}
            style={[styles.priceText, { color: mainColor }]}
            numberOfLines={1}
          >
            ￥{_.addZero(item.commission)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#fff'
  },
  headRow: {
    height: 60,
    paddingTop: 10,
    paddingBottom: 15
  },
  col: {
    display: 'flex',
    width: (screenWidth - 20) / 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headCol: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  headFirstCol: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-start'
  },
  totalText: {
    fontSize: 14,
    color: '#333'
  },
  normalText: {
    fontSize: 12,
    color: '#000'
  },
  priceText: {
    fontSize: 14,
    paddingTop: 12
  },
  firstCol: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-start'
  }
});
