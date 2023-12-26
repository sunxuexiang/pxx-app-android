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
import { mainColor } from 'wmkit/styles/index';

const isAndroid = Platform.OS === 'android';

/**
 * 商品列表搜索栏
 */
@Relax
export default class SearchBar extends React.Component {
  static relaxProps = {
    changeLayout: noop,
    listView: 'listView',
    queryString: 'queryString',
    showGoBack: 'showGoBack'
  };

  render() {
    const {
      changeLayout,
      listView,
      queryString,
      showGoBack
    } = this.props.relaxProps;

    return (
      <View style={[styles.box, { backgroundColor: mainColor }]}>
        <View style={styles.searchBar}>
          {showGoBack && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => msg.emit('router: back')}
            >
              <Image
                source={require('../img/arrow-left.png')}
                style={styles.leftImg}
              />
            </TouchableOpacity>
          )}

          <TouchableWithoutFeedback
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'Search',
                queryString: queryString
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
            <Text allowFontScaling={false} style={styles.whiteText}>
              {listView ? '大图' : '小图'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
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
    marginRight: 20
  },
  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 5,
    top: 5
  },
  content: {
    height: 28,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 3
  },
  input: {
    flex: 1,
    height: 18,
    textAlign: 'center',
    fontSize: 14,
    marginLeft: 20,
    lineHeight: 17
  },
  btnIcon: {
    width: 15,
    height: 13
  },
  btn: {
    marginLeft: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 2
  }
});
