import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PixelRatio
} from 'react-native';
import { Relax, msg } from 'plume2';
import * as WMkit from 'wmkit/kit';
import { noop } from 'wmkit/noop';


@Relax
export default class GoodsTitle extends Component {
  static relaxProps = {
    goodsInfos: 'goodsInfos',
    goodsInfo: 'goodsInfo',
    follow: 'follow',
    goods: 'goods',
    changeFollow: noop,
    init: noop
  };

  render() {
    const { goodsInfo, follow, init, goods } = this.props.relaxProps;

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          {/*商品编号功能产品要删除的*/}
          {/*<Text allowFontScaling={false} style={styles.num}>*/}
          {/*{goodsInfo.get('goodsInfoNo')}*/}
          {/*</Text>*/}
          <View style={{ height: 50 }}>
            <Text
              allowFontScaling={false}
              style={styles.title}
              numberOfLines={2}
            >
              {goods.get('goodsName')}
            </Text>
            <Text
              style={styles.secTitle}
              allowFontScaling={false}
              numberOfLines={1}
            >
              {goods.get('goodsSubtitle') && goods.get('goodsSubtitle')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.barItem}
          onPress={() => this.collect()}
        >
          {follow ? (
            <Image style={styles.img} source={require('../img/loved.png')} />
          ) : (
            <Image
              style={[styles.img, { tintColor: '#333' }]}
              source={require('../img/brokenheart.png')}
            />
          )}
          <Text allowFontScaling={false} style={styles.barItemText}>
            {follow ? '已收藏' : '收藏'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  collect = () => {
    const {
      follow,
      changeFollow,
      goodsInfo,
      init,
      goods,
      goodsInfos
    } = this.props.relaxProps;
    let saleType = goods.get('saleType');
    if (WMkit.isLoginOrNotOpen()) {
      changeFollow(
        !follow,
        saleType == 0
          ? goodsInfos.get(0).get('goodsInfoId')
          : goodsInfo.get('goodsInfoId')
      );
    } else {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => init(goodsInfo.get('goodsInfoId'))
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 8
  },
  left: {
    paddingRight: 8,
    backgroundColor: '#fff',
    flex: 1
  },
  num: {
    color: '#333',
    fontSize: 14,
    marginBottom: 4
  },
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600'
  },
  secTitle: {
    color: '#898989',
    fontSize: 14,
    marginTop: 5
  },
  barItem: {
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#ebebeb',
    borderLeftWidth: 1 / PixelRatio.get()
  },
  img: {
    width: 17,
    height: 17,
    marginBottom: 15
  },
  barItemText: {
    color: '#333',
    fontSize: 12
  }
});
