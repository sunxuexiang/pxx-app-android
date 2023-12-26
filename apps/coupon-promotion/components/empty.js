import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { screenHeight } from 'wmkit/styles/index';

/**
 * 商品列表为空
 */
export default class Empty extends React.Component {
  render() {
    return (
      <View style={styles.emptyBox}>
        <Image source={require('../img/empty.png')} style={styles.img} />
        <Text allowFontSacling={false} style={styles.tips}>
          没有搜到任何商品
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyBox: {
    flex: 1,
    height: screenHeight - 235,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 200,
    height: 200
  },
  tips: {
    color: '#333333',
    fontSize: 15,
    marginBottom: 5,
    marginTop: 10
  }
});
