import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Relax, msg } from 'plume2';

import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx 
const isAndroid = Platform.OS === 'android';

/**
 * 商品列表搜索栏
 */
@Relax
export default class SearchBar extends React.Component {
  static relaxProps = {
    queryString: 'queryString'
    // showGoBack: 'showGoBack'
  };

  render() {
    const { queryString } = this.props.relaxProps;

    return (
      <View style={styles.box}>
        <View style={styles.searchBar}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => msg.emit('router: back')}
          >
            <Image
              source={require('../img/arrow-left.png')}
              style={styles.leftImg}
            />
          </TouchableOpacity>

          <TouchableWithoutFeedback
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'Search',
                queryString: queryString,
                //key: distributeGoods 表示是分销推广商品的搜索
                key: 'distributeGoods'
              })
            }
          >
            <View style={styles.content}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={[styles.input, !queryString && { color: '#939495' }]}
              >
                {queryString || '搜索商品'}
              </Text>
              <Image
                source={require('../img/search.png')}
                style={styles.icon}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    ..._.ifIphoneX(
      {
        paddingTop: 30
      },
      {
        paddingTop: isAndroid ? 0 : 20
      }
    )
  },
  searchBar: {
    height: 48,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftImg: {
    height: 19,
    width: 11,
    marginRight: 20,
    tintColor: '#000'
  },
  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 10,
    top: 5
  },
  content: {
    height: 28,
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  input: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
    marginLeft: 20
  }
});
