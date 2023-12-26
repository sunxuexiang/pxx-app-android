import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { msg } from 'plume2';

import { mainColor } from 'wmkit/styles/index';

export default class GoodsEmpty extends Component {
  render() {
    const navigation = this.props.navigation;
    const state = navigation.state || {};
    const pointsGoodsId = state.pointsGoodsId;
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require('./img/goodsnone.png')} />
        <Text allowFontScaling={false} style={styles.text}>
          该商品不存在，或是已经失效了哦
        </Text>
        <TouchableOpacity
          style={[styles.btn, { borderColor: mainColor }]}
          onPress={() =>
            msg.emit(
              'router: goToNext',
              pointsGoodsId ? { routeName: 'Main' } : { routeName: 'Main' }
            )
          }
        >
          <Text allowFontScaling={false} style={[styles.btnText, { color: mainColor }]}>
            去首页
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 15
  },
  text: {
    color: '#333333',
    fontSize: 15
  },
  btn: {
    height: 45,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 30
  },
  btnText: {
    fontSize: 16
  }
});
