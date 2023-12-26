import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Relax, msg } from 'plume2';

import { screenWidth } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';

@Relax
export default class GoodsSpec extends Component {
  static relaxProps = {
    goodsInfo: 'goodsInfo',
    goods: 'goods',
    changeNum: noop,
    changeWholesaleVisible: noop,
    changeRetailSaleVisible: noop,
    goodsInfos: 'goodsInfos'
  };

  render() {
    const {
      goodsInfo,
      goods,
      changeWholesaleVisible,
      changeRetailSaleVisible,
      goodsInfos
    } = this.props.relaxProps;

    const valid =
      goodsInfo.get('stock') <= 0 ||
      (goodsInfo.get('priceType') == '0' &&
        goodsInfo.get('stock') < goodsInfo.get('count'));

    return (
      <View style={styles.container}>
        <View style={styles.spec}>
          <Text allowFontScaling={false} style={styles.specLabel}>
            规格
          </Text>
          <TouchableOpacity
            style={styles.specTextBox}
            activeOpacity={0.8}
            onPress={() =>
              changeRetailSaleVisible(true)
            }
          >
            <Text allowFontScaling={false} style={styles.specText}>
              {goods.get('goodsSubtitle') || ''}
            </Text>
            <Image
              source={require('../img/more.png')}
              style={styles.icon}
            />

          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _changeNum(num) {
    let nums = num;
    const { goodsInfo, changeNum } = this.props.relaxProps;
    if (num > goodsInfo.get('stock')) {
      nums = goodsInfo.get('stock');
      msg.emit('app:tip', '库存数量' + nums + '!');
    }
    changeNum(nums);
    this.setState({});
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: screenWidth,
    marginBottom: 10
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 48,
    paddingHorizontal: 12
  },
  specLabel: {
    color: '#333',
    fontWeight: 'bold'
  },
  specTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1
  },
  specText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
    paddingRight: 5
  },
  stockBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 8
  },
  numBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 1
  },
  icon: {
    width: 24,
    height: 24
  },
  navItem: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderRadius: 11,
    backgroundColor: '#fff',
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    height: 22,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  stockText: {
    color: '#333',
    marginLeft: 10,
    paddingRight: 5,
    flex: 1
  }
});
