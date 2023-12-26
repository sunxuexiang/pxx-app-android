import React, { Component } from 'react';
import moment from 'moment';
import { Relax, msg } from 'plume2';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as _ from 'wmkit/common/util';
import { noop } from 'wmkit/noop';
import { mainColor } from 'wmkit/styles/index';

import CountDown from './count-down';
import LinearGradient from 'react-native-linear-gradient';

@Relax
export default class GoodsRushBuy extends Component {
  static relaxProps = {
    serverTime: 'serverTime',
    reload: noop,
    goodsInfo: 'goodsInfo',
    goods: 'goods'
  };

  render() {
    const { serverTime, reload, goodsInfo, goods } = this.props.relaxProps;
    const { flashsaleGoods } = this.props;

    //划线价
    // const lineShowPrice = this._originPriceInfo(
    //   goods.get('linePrice'),
    //   goodsInfo
    // );

    // const stock = flashsaleGoods.get('stock');
    // const volume = flashsaleGoods.get('salesVolume');
    // const total = _.add(stock, volume);
    // const num = _.div(volume, total);
    return (
      <LinearGradient
        colors={[mainColor, mainColor]}
        style={styles.bgc}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Image style={styles.icon} source={require('../img/flash-icon.png')} />
        {/*
        <View style={styles.leftStyle}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text allowFontScaling={false} style={styles.rushBuyPrice}>
              ￥{_.addZero(flashsaleGoods.get('price'))}
            </Text>
            <Text style={styles.rushPriPrice} allowFontScaling={false}>
              ￥{_.addZero(goodsInfo.get('marketPrice'))}
            </Text>
          </View>
        </View>
        */}

        <View style={styles.rightStyle}>
          <Text allowFontScaling={false} style={styles.rightText}>
            距离结束还剩
          </Text>
          <CountDown
            squareStyle={true}
            overHandler={() => {
              msg.emit('router: refresh');
            }}
            timeOffset={moment
              .duration(
                moment(flashsaleGoods.get('activityFullTime'))
                  .add(2, 'h')
                  .diff(serverTime)
              )
              .asSeconds()
              .toFixed(0)}
          />
        </View>
      </LinearGradient>
    );
  }

  /**
   * 获取是否展示划线价,以及划线价
   *   a.若划线价存在,则展示
   *   b.若划线价不存在
   *     b.1.登录前,不展示
   *     b.2.登陆后,展示sku市场价
   */
  _originPriceInfo = (linePrice, goodsInfoIm) => {
    if (linePrice) {
      return linePrice;
    } else {
      /*if (WMkit.isLoginOrNotOpen()) {
        return goodsInfoIm.get('marketPrice');
      } else {
        return null;
      }*/
      return null;
    }
  };
}

const styles = StyleSheet.create({
  bgc: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 62,
    paddingHorizontal: 12
  },
  icon: {
    width: 52,
    height: 32
  },
  leftStyle: {
    height: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10
  },
  rightText: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 10
  },
  rushBuyPrice: {
    color: '#fff',
    fontSize: 22,
    marginLeft: 10
  },
  rushPriPrice: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
    textDecorationLine: 'line-through'
  },
  rightStyle: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});
