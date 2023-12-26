import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Relax } from 'plume2';

import { priceColor } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';
import WmListView from 'wmkit/list-view/index';
import * as _ from 'wmkit/common/util';

const FUNDS_TYPE = {
  1: '推广返利',
  2: '佣金提现',
  3: '邀新奖励',
  4: '自购返利',
  5: '推广提成',
  6: '余额支付',
  7: '余额支付退款'
};

@Relax
export default class List extends React.Component {
  static relaxProps = {
    tabType: 'tabType',
    toRefresh: 'toRefresh',
    dealData: noop
  };

  render() {
    const { tabType, toRefresh, dealData } = this.props.relaxProps;

    const listViewProps = {
      url: '/customer/funds/page',
      loadingStyle:{marginTop:200},
      params: {
        tabType: tabType,
        //排序规则 desc asc
        sortColumn: 'createTime',
        sortRole: 'desc'
      },
      isPagination: true,
      renderRow: (item) => this._renderAccountDetail(item),
      onDataReached: dealData,
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/list-none.png')}
          desc="您暂时还没有收入支出哦"
        />
      ),
      keyProps: 'customerFundsDetailId',
      extraData: { toRefresh: toRefresh }
    };

    return (
      <SafeAreaView style={styles.container}>
        <WmListView {...listViewProps} />
      </SafeAreaView>
    );
  }

  /**
   * 渲染收支明细
   * @param accountDetail
   * @private
   */
  _renderAccountDetail = (accountDetail) => {
    if (!accountDetail) {
      return;
    }

    return (
      <View style={styles.container}>
        {/*这个带下拉刷新的吧 是否要用WmListView套起来？*/}
        <View style={styles.item}>
          <View>
            <Text style={styles.darkText} allowFontScaling={false}>
              {FUNDS_TYPE[accountDetail.subType]}
            </Text>
            {/*<Text style={styles.text} allowFontScaling={false}>
              关联用户：小羊苏西
            </Text>*/}
            {/* {accountDetail.subType == 6 || accountDetail.subType == 7 ? ( */}
            <Text style={styles.darkText} allowFontScaling={false}>
              {accountDetail.businessId}
            </Text>
            {/* ) : null} */}
          </View>
          <View style={styles.rightCon}>
            <Text
              style={
                accountDetail.fundsType == 2 || accountDetail.fundsType == 5
                  ? styles.darkText
                  : [styles.price, { color: priceColor}]
              }
              allowFontScaling={false}
            >
              {this._renderAmount(
                accountDetail.subType,
                accountDetail.receiptPaymentAmount
              )}
            </Text>
            <Text style={styles.text} allowFontScaling={false}>
              {accountDetail && accountDetail.createTime
                ? _.formatDate(accountDetail.createTime)
                : '-'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  /**
   * 渲染金额
   * @param fundsType 收支类型
   * @param amount 收支金额
   * @returns {string}
   * @private
   */
  _renderAmount = (fundsType, amount) => {
    return `${fundsType == 2 || fundsType == 6 ? '-' : '+'}￥${amount.toFixed(
      2
    )}`;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rightCon: {
    alignItems: 'flex-end'
  },
  darkText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4
  },
  price: {
    fontSize: 14
  },
  text: {
    color: '#999',
    fontSize: 12
  }
});
