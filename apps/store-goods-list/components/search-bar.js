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
    changeLayout: noop,
    listView: 'listView',
    queryString: 'queryString'
  };

  render() {
    const { changeLayout, listView, queryString } = this.props.relaxProps;

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
                routeName: 'StoreSearch',
                storeId: this.props.storeId,
                queryString
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

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={changeLayout}
          >
            <Image
              source={
                listView
                  ? require('../img/bigbtn.png')
                  : require('../img/smallbtn.png')
              }
              style={styles.btnIcon}
            />
            <Text allowFontScaling={false} style={styles.darkText}>
              {listView ? '大图' : '列表'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    ..._.ifIphoneX(
      {
        paddingTop: 35
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
    marginRight: 10,
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
    paddingRight: 8,
    paddingVertical: 5,
    paddingLeft: 35,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 14
  },
  input: {
    flex: 1,
    height: 18,
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 17
  },
  btnIcon: {
    width: 15,
    height: 13,
    tintColor: '#000'
  },
  btn: {
    marginLeft: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  darkText: {
    color: '#000',
    fontSize: 10,
    marginTop: 2
  }
});
