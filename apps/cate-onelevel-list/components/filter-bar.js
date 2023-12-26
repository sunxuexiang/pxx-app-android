import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { mainColor, screenWidth,screenHeight } from 'wmkit/styles/index';
import { Picker } from '@ant-design/react-native';
import { config } from 'wmkit/config';
const PriceIcon = require('wmkit/theme/price.png');

const sorts = {
  default: '默认',
  composite: '综合',
  dateTime: '最新',
  collection: '收藏'
};
const pickObj = {
  10:'默认',
  0:'综合',
  1:'最新',
  7:'收藏',
}

@Relax
export default class FilterBar extends React.Component {
  static relaxProps = {
    openShade: noop,
    closeShade: noop,
    setSort: noop,
    tabName: 'tabName',
    selectedCate: 'selectedCate',
    sortType: 'sortType'
  };

  state = {
    openSort: false
  };

  render() {
    const { tabName, selectedCate, sortType, setSort } = this.props.relaxProps;
    // 排序字段
    const type = {
      default: 10,
      composite: 0,
      dateTime: 1,
      collection: 7,
      salesNum:'salesNum',
      price:'price'
    }[sortType.get('type')];
    const sort = sortType.get('sort');

    return (
      <View style={styles.box}>
        <Picker
          data={[
            {label: '默认', value: 10},
            {label: '综合', value: 0},
            {label: '最新', value: 1},
            {label: '收藏', value: 7},
          ]}
          cols={1}
          value={type}
          onChange={(val) => this._handlePress('goodsSort'+val,val)}
          onVisibleChange={(bool) => {
            this.setState({
              openSort: bool
            })
          }}
        >
          <TouchableOpacity style={styles.item}>
            <Text
              allowFontScaling={false}
              style={[
                styles.text,
                'goodsSort'+type === tabName || type==10 ? {fontSize: 12, color: mainColor}:""
              ]}
            >
              {pickObj[type] || '默认'}
            </Text>
            <Image
              style={this.state.openSort ? [styles.upIcon, { tintColor: mainColor }] : styles.downIcon}
              source={'goodsSort'+type === tabName ? require('wmkit/theme/d-arrow-s.png') : require('wmkit/theme/d-arrow.png')}
            />
          </TouchableOpacity>
        </Picker>

        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => setSort('salesNum')}
        >
          <Text
            style={type === 'salesNum' ? {fontSize: 12, color: mainColor} : styles.text}
            allowFontScaling={false}
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
            style={type === 'price' ? {fontSize: 12, color: mainColor} : styles.text}
            allowFontScaling={false}
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
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.item}
          onPress={() => this._handlePress('goodsFilter')}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              'goodsFilter' === tabName && {fontSize: 12, color: mainColor}
            ]}
          >
            筛选品牌
          </Text>
          <Image
            style={styles.filterIcon}
            source={require('../img/filter.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }

  _handlePress = (name,val) => {
    const { openShade, closeShade, tabName ,setSort} = this.props.relaxProps;
    if (name == 'goodsSort'+val) {
      // setSort(val[0])
      switch (val[0]) {
        case 10:
          setSort('default')
          break;
        case 0:
          setSort('composite')
          break;
        case 1:
          setSort('dateTime')
          break;
        case 7:
          setSort('collection')
          break;
        default:
          setSort(val[0])
          break;
      }
    }
    // 是否是当前已展开的tab
    const match = name === tabName;

    // 在相同的tab上点击时，认为是要关闭tab
    match ? closeShade() : openShade(name);
  };
}

const styles = StyleSheet.create({
  box: {
    width:screenWidth - 84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 40
    // borderTopWidth: 1,
    // borderTopColor: '#ebebeb',
    // borderBottomWidth: 2,
    // borderBottomColor: '#ebebeb'
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
    transform: [{ rotate: '180deg' }]
  },
  text: {
    color: '#333',
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
    width: 12,
    height: 12,
    marginLeft: 5
  },
  icon: {
    width: 12,
    height: 12,
  }
});
