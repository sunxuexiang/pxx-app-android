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
import GoodsNav from './goods-nav';
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
    showGoBack: 'showGoBack',
    menuList: 'menuList',
    openShade: noop,
    closeShade: noop,
    tabName: 'tabName',
    selectedCate: 'selectedCate',
    sortType: 'sortType',
    setQueryString: noop
  };

  render() {
    const {
      changeLayout,
      listView,
      queryString,
      showGoBack,
      menuList,
      tabName,
      selectedCate,
      setQueryString
    } = this.props.relaxProps;
    return (
      <View style={styles.box}>
        <View style={styles.searchBar}>
          {/*需求——页面-App消息推送设置（App商品列表增加返回按钮）*/}
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
              {queryString ?
                <View style={styles.keyBox}>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={[styles.input]}
                  >
                    {queryString}
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={() =>{
                      setQueryString('');
                      msg.emit('router: goToNext', {
                        routeName: 'Search',
                        queryString: ''
                      })
                    }}
                  >
                    <Image
                      source={require('../img/close.png')}
                      style={styles.closeIcon}
                    />
                  </TouchableWithoutFeedback>
                </View> :
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  style={[styles.input, { marginLeft: 20, color: '#939495' }]}
                >
                  搜索商品
                </Text>
              }
              <Image
                source={require('../img/search.png')}
                style={styles.icon}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            // onPress={() => this._handlePress('goodsCate')}
            onPress={() =>{
              msg.emit('router: goToNext', {
                routeName: 'ClassifyPage'
              })
            //   msg.emit('app:bottomVisible');
            }}
          >
            <Image
              style={styles.btnIcon}
              source={require('../img/classify.png')}
            />
            <Text
              allowFontScaling={false}
              style={[
                styles.darkText,
                'goodsCate' === tabName && styles.textSelected
              ]}
            >
              {selectedCate.get('cateName') || '分类'}
            </Text>
          </TouchableOpacity>
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
              {listView ? '大图' : '小图'}
            </Text>
          </TouchableOpacity>
          {menuList.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.btn}
              onPress={changeLayout}
            >
              <GoodsNav />
            </TouchableOpacity>
          )}
        </View>
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
    width: 20,
    height: 20,
    marginRight: 20,
  },
  icon: {
    width: 16,
    height: 16,
    position: 'absolute',
    left: 10,
    top: 8
  },
  content: {
    height: 32,
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  keyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    paddingHorizontal: 8,
    marginLeft: 20,
    backgroundColor: '#999',
    borderRadius: 12
  },
  closeIcon: {
    width: 8,
    height: 8,
    marginLeft: 4
  },
  input: {
    fontSize: 12,
    color: '#fff'
  },
  btnIcon: {
    width: 16,
    height: 16
  },
  btn: {
    marginLeft: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  darkText: {
    color: '#999',
    fontSize: 10,
    marginTop: 2
  }
});
