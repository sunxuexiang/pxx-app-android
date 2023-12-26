import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';

import { mainColor } from 'styles';

const sorts = {
  default: '综合',
  dateTime: '最新',
  salesNum: '销量',
  price: '价格',
  evaluateNum: '评论数',
  praise: '好评',
  collection: '收藏'
};

/**
 * 商品列表中间的筛选栏
 */
@Relax
export default class FilterBar extends React.Component {
  static relaxProps = {
    openShade: noop,
    closeShade: noop,
    tabName: 'tabName',
    selectedCate: 'selectedCate',
    sortType: 'sortType'
  };

  render() {
    const { tabName, selectedCate, sortType } = this.props.relaxProps;
    // 排序字段
    const sort = sortType.get('type');

    return (
      <View style={styles.box}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.item}
          onPress={() => this._handlePress('goodsCate')}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              'goodsCate' === tabName && { color: mainColor }
            ]}
          >
            {selectedCate.get('cateName') || '分类'}
          </Text>
          <Image
            style={'goodsCate' === tabName ? [styles.upIcon, { tintColor: mainColor }] : styles.downIcon}
            source={require('../img/down.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.item}
          onPress={() => this._handlePress('goodsSort')}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              'goodsSort' === tabName && { color: mainColor }
            ]}
          >
            {sorts[sort] || '排序'}
            {/*排序*/}
          </Text>
          <Image
            style={'goodsSort' === tabName ? [styles.upIcon, { tintColor: mainColor }] : styles.downIcon}
            source={require('../img/down.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.item}
          onPress={() => this._handlePress('goodsFilter')}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              'goodsFilter' === tabName && { color: mainColor }
            ]}
          >
            筛选
          </Text>
          <Image
            style={styles.filterIcon}
            source={require('../img/filter.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }

  _handlePress = (name) => {
    const { openShade, closeShade, tabName } = this.props.relaxProps;
    // 是否是当前已展开的tab
    const match = name === tabName;

    // 在相同的tab上点击时，认为是要关闭tab
    match ? closeShade() : openShade(name);
  };
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ebebeb',
    borderBottomWidth: 2,
    borderBottomColor: '#ebebeb'
  },
  downIcon: {
    width: 10,
    height: 5,
    marginLeft: 6
  },
  upIcon: {
    width: 10,
    height: 5,
    marginLeft: 6,
    transform: [{ rotate: '180deg' }]
  },
  text: {
    color: '#666',
    fontSize: 12
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  filterIcon: {
    width: 12.5,
    height: 12.5,
    marginLeft: 5
  }
});
