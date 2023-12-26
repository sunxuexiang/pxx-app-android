import React from 'react';
import {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit';

import { mainColor, screenWidth } from 'wmkit/styles';

const isAndroid = Platform.OS === 'android';

/**
 * 商品列表排序
 */
@Relax
export default class Sort extends React.Component {
  static relaxProps = {
    closeShade: noop,
    setSort: noop,
    sortType: 'sortType',
    isShow: 'isShow' //评论相关查询条件是否展示
  };

  render() {
    const { closeShade, setSort, sortType, isShow } = this.props.relaxProps;

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
            onPress={() => setSort('default')}
          >
            <Text
              style={
                type === 'default' || type === ''
                  ? [styles.textSelected, { color: mainColor }]
                  : styles.text
              }
              allowFontScaling={false}
            >
              默认
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            activeOpacity={0.8}
            onPress={() => setSort('composite')}
          >
            <Text
              style={type === 'composite' ? [styles.textSelected, { color: mainColor }] : styles.text}
              allowFontScaling={false}
            >
              综合
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            activeOpacity={0.8}
            onPress={() => setSort('dateTime')}
          >
            <Text
              style={type === 'dateTime' ? [styles.textSelected, { color: mainColor }] : styles.text}
              allowFontScaling={false}
            >
              最新
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            activeOpacity={0.8}
            onPress={() => setSort('collection')}
          >
            <Text
              style={type === 'collection' ? [styles.textSelected, { color: mainColor }] : styles.text}
              allowFontScaling={false}
            >
              收藏
            </Text>
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
  }
});
