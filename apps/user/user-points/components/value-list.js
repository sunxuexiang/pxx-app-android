import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { Const } from 'wmkit/const';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';
import { mainColor } from 'wmkit/styles/index';
// type 0:普通方式 1:订单相关 2:退单相关
const serviceTypeName = {
  0: { desc: '签到', type: 0 },
  1: { desc: '注册', type: 0 },
  2: { desc: '分享商品', type: 0 },
  3: { desc: '分享注册', type: 0 },
  4: { desc: '分享购买', type: 0 },
  5: { desc: '评论商品', type: 0 },
  6: { desc: '晒单', type: 0 },
  7: { desc: '完善基本信息', type: 0 },
  8: { desc: '绑定微信', type: 0 },
  9: { desc: '添加收货地址', type: 0 },
  10: { desc: '关注店铺', type: 0 },
  11: { desc: '订单完成', type: 1 },
  12: { desc: '订单抵扣', type: 1 },
  13: { desc: '优惠券兑换', type: 1 },
  14: { desc: '积分兑换', type: 1 },
  15: { desc: '退单返还', type: 2 },
  16: { desc: '订单取消返还', type: 1 },
  17: { desc: '过期扣除', type: 0 },
  18: { desc: '会员导入增加积分', type: 0 },
  19: { desc: '权益发放', type: 0 },
  20: { desc: '管理员修改', types: 0},
  21: { desc: '账号合并', types: 0},
};

export default class ValueList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WmListView
          key="wmListView"
          url="/customer/points/page"
          keyProps="opTime"
          renderRow={this._storeInfoRow}
          dataPropsName={'context.customerPointsDetailVOPage.content'}
          renderEmpty={() => (
            <WMEmpty
              emptyImg={require('../img/empty.png')}
              desc="没有任何记录哦～"
            />
          )}
          onDataReached={() => {}}
        />
      </View>
    );
  }

  /**
   * 店铺信息
   */
  _storeInfoRow = (storeInfo) => {
    let content = storeInfo.content ? JSON.parse(storeInfo.content) : null;
    return (
      <View
        key={storeInfo.opTime}
        style={styles.valueList}
        onPress={() => {}}
        activeOpacity={0.8}
      >
        <View style={styles.leftItem}>
          <Text style={styles.title} allowFontScaling={false} numberOfLines={1}>
            {serviceTypeName[storeInfo.serviceType].desc}
          </Text>
          {this._showPointsDesc(content, storeInfo.serviceType)}
          <Text style={styles.time} allowFontScaling={false}>
            {moment(storeInfo.opTime).format(Const.SECONDS_FORMAT)}
          </Text>
        </View>
        <Text
          style={[styles.value, { color: mainColor }, storeInfo.type ? '' : styles.lessValue]}
          allowFontScaling={false}
        >
          {storeInfo.type ? ' + ' : ' - '}
          {storeInfo.points || 0}
        </Text>
      </View>
    );
  };

  _showPointsDesc = (content, serviceType) => {
    const info = serviceTypeName[serviceType];
    if (info.type == 0) {
      return null;
    } else if (info.type == 1) {
      return (
        <Text style={styles.orderRel} allowFontScaling={false}>
          订单编号:
          {content.orderNo}
        </Text>
      );
    } else if (info.type == 2) {
      return (
        <Text style={styles.orderRel} allowFontScaling={false}>
          退单编号:
          {content.returnOrderNo}
        </Text>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 12
  },
  valueList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    // paddingHorizontal: 12,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftItem: {},
  title: {
    color: '#333',
    fontSize: 14
  },
  orderRel: {
    marginTop: 6,
    fontSize: 12,
    color: '#999'
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: '#999'
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  lessValue: {
    color: '#999'
  },
  darkValue: {
    color: '#000'
  }
});
