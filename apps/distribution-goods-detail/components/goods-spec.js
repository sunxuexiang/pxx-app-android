import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Relax, msg } from 'plume2';
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
          <Text allowFontScaling={false} style={{ color: '#333' }}>
            规格
          </Text>
          <TouchableOpacity
            style={styles.specTextBox}
            activeOpacity={0.8}
            onPress={() =>
              goods.get('saleType') == 0
                ? changeWholesaleVisible(true)
                : changeRetailSaleVisible(true)
            }
          >
            <Text allowFontScaling={false} style={styles.specText}>
              {goods.get('saleType') == 0
                ? goodsInfos && goodsInfos.size > 0
                  ? goodsInfos.size + '种'
                  : '无'
                : goodsInfo && goodsInfo.get('specText')
                  ? goodsInfo.get('specText')
                  : '无'}
            </Text>
            <Image
              source={require('../img/icon-more.png')}
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  specTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1
  },
  specText: {
    color: '#333',
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
    width: 16,
    height: 16
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
  }
});
