import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { config } from 'wmkit/config';
const PriceIcon = require('wmkit/theme/price.png');
import { mainColor } from 'wmkit/styles/index';

const sorts = {
  default: '默认',
  composite: '综合',
  dateTime: '最新',
  // salesNum: '销量',
  // price: '价格',
  evaluateNum: '评论数',
  praise: '好评',
  collection: '收藏'
};
const SortTYPE = ['default', 'composite', 'dateTime', 'collection'];

/**
 * 商品列表中间的筛选栏
 */
@Relax
export default class FilterBar extends React.Component {
  static relaxProps = {
    openShade: noop,
    closeShade: noop,
    setSort: noop,
    tabName: 'tabName',
    sortType: 'sortType',
    brands: 'brands',
    cates: 'cates'
  };

  render() {
    const { tabName, sortType, brands, cates, setSort } = this.props.relaxProps;
    // 排序字段
    const sort = sortType.get('sort');
    const type = sortType.get('type');
    console.log(type, 'v.type');
    return (
      <View style={styles.box}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.item}
          onPress={() => this._handlePress('goodsSort')}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              SortTYPE.includes(type) && styles.textSelected,
              SortTYPE.includes(type) && { color: mainColor }
            ]}
          >
            {sorts[type] || '默认'}
            {/*排序*/}
          </Text>
          <Image
            style={'goodsSort' === tabName ? [styles.upIcon, { tintColor: mainColor }] : (SortTYPE.includes(type) ? [styles.downIcon, { tintColor: mainColor }] : styles.downIcon)}
            source={SortTYPE.includes(type) ? require('wmkit/theme/d-arrow-s.png') : require('wmkit/theme/d-arrow.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => setSort('salesNum')}
        >
          <Text
            allowFontScaling={false}
            style={type === 'salesNum' ? [styles.textSelected, { color: mainColor }] : styles.text}
          >
            销量
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => setSort('price')}
        >
          <Text
            allowFontScaling={false}
            style={type === 'price' ? [styles.textSelected, { color: mainColor }] : styles.text}
          >
            价格
          </Text>
           <Image
            source={
              type === 'price'
                ? sort === 'asc'
                  ? {uri: config.OSS_HOST + '/assets/image/theme/price-up.png'}
                  : {uri: config.OSS_HOST + '/assets/image/theme/price-down.png'}
                : PriceIcon
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        {cates &&
          cates.count() > 0 && (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.item}
              onPress={() => this._handlePress('goodsCate')}
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.text,
                  'goodsCate' === tabName && styles.textSelected,
                  'goodsCate' === tabName && { color: mainColor }
                ]}
              >
                分类
              </Text>
              <Image
                style={
                  'goodsCate' === tabName ? [styles.upIcon, { tintColor: mainColor }] : styles.downIcon
                }
                source={'goodsCate' === tabName ? require('wmkit/theme/d-arrow-s.png') : require('wmkit/theme/d-arrow.png')}
              />
            </TouchableOpacity>
          )}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.item}
          onPress={() => this._handlePress('goodsBrand')}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              'goodsBrand' === tabName && styles.textSelected,
              'goodsBrand' === tabName && { color: mainColor }
            ]}
          >
            品牌
          </Text>
          <Image
            style={'goodsBrand' === tabName ? [styles.upIcon, {tintColor: mainColor}] : styles.downIcon}
            source={'goodsBrand' === tabName ? require('wmkit/theme/d-arrow-s.png') : require('wmkit/theme/d-arrow.png')}
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
    backgroundColor: '#fff'
  },
  downIcon: {
    width: 12,
    height: 12,
    marginLeft: 6
  },
  upIcon: {
    width: 12,
    height: 12,
    marginLeft: 6,
    transform: [{ rotate: '180deg' }],
    tintColor: mainColor
  },
  text: {
    color: '#666',
    fontSize: 12
  },
  textSelected: {
    fontSize: 12
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  icon: {
    width: 12,
    height: 12
  },
  iconSelected: {
    width: 4.5,
    height: 11,
    tintColor: mainColor
  }
});
