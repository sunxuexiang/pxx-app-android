import React, { Component } from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { msg, Relax } from 'plume2';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import * as _ from '../../../wmkit/common/util'; // added by scx

const isAndroid = Platform.OS === 'android';

@Relax
export default class SearchBar extends Component {
  static relaxProps = {
    purchaseCount: 'purchaseCount',
    preKeywords:'preKeywords'
  };

  render() {
    let { purchaseCount,preKeywords } = this.props.relaxProps;
    let placeholder;
    if (preKeywords){
      placeholder=preKeywords;
    }
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
                routeName: 'Search'
              })
            }
          >
            <View style={styles.content}>
              <Image
                source={require('../img/search.png')}
                style={styles.icon}
              />
              <Text style={styles.input} allowFontScaling={false}>
                {placeholder?placeholder:'搜索商品'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.barItem}
            onPress={() => msg.emit('router: goToNext', { routeName: 'PurchaseOrder' })}
          >
            <View>
              {purchaseCount ? (
                <View style={[styles.numTip, { backgroundColor: mainColor }]}>
                  <Text allowFontScaling={false} style={styles.numTipText}>
                    {purchaseCount}
                  </Text>
                </View>
              ) : null}
              <Image style={styles.img} source={require('../img/cart.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    ..._.ifIphoneX(
      {
        paddingTop: 30
      },
      { paddingTop: isAndroid ? 0 : 20 }
    )
  },
  searchBar: {
    height: 48,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftImg: {
    height: 16,
    width: 16,
    marginRight: 14,
    marginLeft: 4,
    tintColor: 'rgba(0,0,0,0.4)'
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft:5,
    marginRight:5,
  },
  content: {
    height: 28,
    paddingRight: 8,
    paddingLeft: 5,
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 15
  },
  input: {
    fontSize: 13,
    paddingLeft: 6,
    color: '#939495',
    textAlign: 'left',
    width: screenWidth - 110
  },
  btn: {
    marginLeft: 8
  },
  btnText: {
    color: '#000',
    fontSize: 14
  },
  barItem:{
    position:'relative',
    marginHorizontal: 5,
    paddingTop:3
  },
  numTip: {
    position: 'absolute',
    top: -5,
    right: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
    borderRadius: 50,
    zIndex: 999
  },
  numTipText: {
    color: '#fff',
    fontSize: 8,
    backgroundColor: 'transparent'
  },
  img: {
    width: 20,
    height: 20,
    tintColor: '#000',
    marginBottom: 4
  },

});
