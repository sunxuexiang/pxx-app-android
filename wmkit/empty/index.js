import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { msg } from 'plume2';

import { screenHeight } from 'wmkit/styles/index';

/**
 * 列表为空
 */
export default class WMEmpty extends React.Component {
  render() {
    const {
      emptyImg,
      desc,
      isToGoodsList,
      marginTop,
      goUrl,
      imgStyle,
      tipStyle,
      boxStyle
    } = this.props;
    const url = this._getGoUrl(isToGoodsList, goUrl);
    const height = 200;
    return (
      <View style={[styles.emptyBox, { height }, boxStyle]}>
        <Image source={emptyImg} style={[styles.img, imgStyle]} />
        <Text allowFontSacling={false} style={[styles.tips, tipStyle]}>
          {desc}
        </Text>
        {isToGoodsList && (
          <View style={styles.toGoodsList}>
            {/* <Text allowFontScaling={false} style={styles.text}>
              您可以
            </Text> */}
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                msg.emit('router: goToNext', {
                  routeName: url,
                  showGoBack: isToGoodsList ? true : undefined
                })
              }
            >
              <Text allowFontScaling={false} style={styles.btnText}>
                逛逛商品
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  // empty点击跳转路径
  _getGoUrl = (isToGoodsList, goUrl) => {
    let url = '';
    if (isToGoodsList) {
      url = 'GoodsList';
    }
    if (goUrl) {
      url = goUrl;
    }
    return url;
  };
}

const styles = StyleSheet.create({
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  tips: {
    color: '#999',
    fontSize: 15,
    marginBottom: 5,
    marginTop: 10,
    marginHorizontal: 10,
    textAlign: 'center'
  },
  toGoodsList: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: '#999'
  },
  btn: {
    height: 24,
    // borderColor: '#000',
    // borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginTop: 10
  },
  btnText: {
    fontSize: 12,
    color: '#333'
  }
});
