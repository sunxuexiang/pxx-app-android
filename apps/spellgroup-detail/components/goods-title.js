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
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10
  },
  num: {
    color: '#333',
    fontSize: 14,
    marginBottom: 4
  },
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secTitle: {
    fontSize: 14,
    color: '#898989',
    marginTop: 8
  }
});
