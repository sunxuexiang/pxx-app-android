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
import { noop } from 'wmkit/noop';
import * as WMkit from 'wmkit/kit';
import NowSpellGroup from './now-spell-group';
import {SpecialLabel} from 'wmkit/biz';

@Relax
export default class GoodsTitle extends Component {
  static relaxProps = {
    goodsInfos: 'goodsInfos',
    goodsInfo: 'goodsInfo',
    goods: 'goods',
    changeFollow: noop,
    init: noop
  };

  render() {
    const { goods,goodsInfo } = this.props.relaxProps;

    return (
      <View style={styles.container}>
        <View style={styles.label}>
          {goodsInfo.get('goodsInfoType')===1 && <SpecialLabel/>}
        </View>
        <Text allowFontScaling={false} style={styles.title} numberOfLines={2}>
          {goodsInfo.get('goodsInfoType')===1 && (
              <Text style={styles.words}>占位</Text>
          )}
          {goods.get('goodsName')}
        </Text>
        {goods.get('goodsSubtitle') ? (
          <Text
            style={styles.secTitle}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {goods.get('goodsSubtitle')}
          </Text>
        ) : (
          <Text />
        )}
        <NowSpellGroup />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12
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
    lineHeight:20
  },
  secTitle: {
    fontSize: 14,
    color: '#898989',
    marginTop: 8
  },
  label: {
    position: 'absolute',
    left: 10,
    top:13,
  },
  words: {
    color: 'rgba(255,255,255,0)'
  },
});
