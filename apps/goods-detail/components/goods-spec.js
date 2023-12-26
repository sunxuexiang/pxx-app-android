import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';
import moment from 'moment';
import { screenWidth } from '@/wmkit/styles';
@Relax
export default class GoodsSpec extends Component {
  static relaxProps = {
    goodsInfo: 'goodsInfo',
    goods: 'goods',
    changeNum: noop,
    changeWholesaleVisible: noop,
    changeRetailSaleVisible: noop,
    changePointsExchangeVisible: noop,
    goodsInfos: 'goodsInfos',
    pointsGoodsId: 'pointsGoodsId',
    bookingSaleVO: 'bookingSaleVO'
  };

  render() {
    const {
      goodsInfo,
      goods,
      changeWholesaleVisible,
      changeRetailSaleVisible,
      changePointsExchangeVisible,
      goodsInfos,
      pointsGoodsId,
      bookingSaleVO
    } = this.props.relaxProps;
    const buyPoint = goodsInfo.get('buyPoint');
    const isBookingSale = bookingSaleVO && this.isPresaleStatus(bookingSaleVO.toJS()) && !buyPoint ? true : false;
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
              pointsGoodsId
                ? changePointsExchangeVisible(true)
                : goods.get('saleType') == 0
                  ? changeWholesaleVisible(true)
                  : changeRetailSaleVisible(true,isBookingSale)
            }
          >
            <Text allowFontScaling={false} style={styles.specText} numberOfLines={1}>
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

  //判断当前的预售状态
  isPresaleStatus = (item) => {
    const {
      bookingStartTime,
      bookingEndTime,
      bookingType,
      handSelStartTime,
      handSelEndTime
    } = item;
    let isBetween = false;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      isBetween = moment(new Date()).isBetween(
          bookingStartTime,
          bookingEndTime
      );
    }

    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(
          handSelStartTime,
          handSelEndTime
      );
    }
    return isBetween;
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 48,
    paddingHorizontal: 12
  },
  specLabel: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '500'
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
    color: '#898989',
    paddingRight: 5,
    width: screenWidth - 90,
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
  }
});
