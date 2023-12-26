import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import WMEmpty from 'wmkit/empty';
import { Const } from 'wmkit/const';
import WmListView from 'wmkit/list-view/index';
import { mainColor } from 'wmkit/styles/index';
// type 0:普通方式 1:订单相关
const serviceTypeName = {
  0: {desc:'签到', type:0},
  1: {desc:'注册', type:0},
  2: {desc:'分享商品', type:0},
  3: {desc:'分享注册', type:0},
  4: {desc:'分享购买', type:0},
  5: {desc:'评论商品', type:0},
  6: {desc:'晒单', type:0},
  7: {desc:'完善基本信息', type:0},
  8: {desc:'绑定微信', type:0},
  9: {desc:'添加收货地址', type:0},
  10: {desc:'关注店铺', type:0},
  11: {desc:'订单完成', type:1}
};

export default class ValueList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WmListView
          key="wmListView"
          url="/customer/queryToGrowthValue"
          keyProps="opTime"
          renderRow={this._storeInfoRow}
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
          {this._showGrowValDesc(storeInfo, storeInfo.serviceType)}
          <Text style={styles.time} allowFontScaling={false}>
            {moment(storeInfo.opTime).format(Const.SECONDS_FORMAT)}
          </Text>
        </View>
        <Text style={[styles.value, { color: mainColor }]} allowFontScaling={false}>
          +{storeInfo.growthValue || 0}
        </Text>
      </View>
    );
  };

  _showGrowValDesc = (content, serviceType) => {
    const info = serviceTypeName[serviceType];
    if (info.type === 0) {
      return null;
    } else if (info.type === 1) {
      return <Text style={styles.orderRel} allowFontScaling={false}>订单编号:{content.tradeNo}</Text>;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  valueList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 12,
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
    color: '#666666'
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: '#999'
  },
  value: {
    fontSize: 14
  },
  darkValue: {
    color: '#000'
  }
});
