import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';

import { mainColor, screenWidth } from 'wmkit/styles/index';

const isAndroid = Platform.OS === 'android';

/**
 * 商品列表排序
 */
@Relax
export default class Sort extends React.Component {
  static relaxProps = {
    closeShade: noop,
    setSort: noop,
    sortType: 'sortType'
  };

  render() {
    const { closeShade, setSort, sortType } = this.props.relaxProps;

    // 排序字段
    const type = sortType.get('type');
    // 排序方式：升序 降序
    const sort = sortType.get('sort');

    return (
      <View style={styles.shadow}>
        <View style={styles.sort}>
          <TouchableOpacity
            style={styles.sortItem}
            activeOpacity={0.8}
            onPress={() => setSort('dateTime')}
          >
            <Text
              style={
                type === 'dateTime' || type === ''
                  ? [styles.textSelected, { color: mainColor }]
                  : styles.text
              }
              allowFontScaling={false}
            >
              最新
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            activeOpacity={0.8}
            onPress={() => setSort('salesNum')}
          >
            <Text
              style={type === 'salesNum' ? [styles.textSelected, { color: mainColor }] : styles.text}
              allowFontScaling={false}
            >
              销量
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            activeOpacity={0.8}
            onPress={() => setSort('commission')}
          >
            <Text
              style={type === 'commission' ? [styles.textSelected, { color: mainColor }] : styles.text}
              allowFontScaling={false}
            >
              佣金
            </Text>
            <Image
              source={require('../img/up.png')}
              style={
                type === 'commission' && sort === 'asc'
                  ? [styles.iconSelected, { tintColor: mainColor}]
                  : styles.icon
              }
            />
            <Image
              source={require('../img/ddown.png')}
              style={
                type === 'commission' && sort === 'desc'
                  ? [styles.iconSelected, { tintColor: mainColor }]
                  : styles.icon
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            activeOpacity={0.8}
            onPress={() => setSort('price')}
          >
            <Text
              style={type === 'price' ? [styles.textSelected, { color: mainColor }] : styles.text}
              allowFontScaling={false}
            >
              价格
            </Text>
            <Image
              source={require('../img/up.png')}
              style={
                type === 'price' && sort === 'asc'
                  ? [styles.iconSelected, { tintColor: mainColor }]
                  : styles.icon
              }
            />
            <Image
              source={require('../img/ddown.png')}
              style={
                type === 'price' && sort === 'desc'
                  ? [styles.iconSelected, { tintColor: mainColor }]
                  : styles.icon
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.shadowTouchable}>
          <TouchableWithoutFeedback onPress={closeShade}>
            <View style={styles.shadowTouchable} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    left: 0,
    top: isAndroid ? 89 : 109,
    width: screenWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    height: '100%'
  },
  shadowTouchable: {
    flex: 1,
    height: '100%'
  },
  sort: {
    backgroundColor: '#fff'
  },
  sortItem: {
    height: 40,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 12,
    color: '#666'
  },
  textSelected: {
    fontSize: 12
  },
  icon: {
    width: 4.5,
    height: 11
  },
  iconSelected: {
    width: 4.5,
    height: 11
  }
});
