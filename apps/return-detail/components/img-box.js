/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { screenHeight, screenWidth } from 'wmkit/styles/index';

export default class ImgBox extends Component {
  render() {
    return (
      <View style={styles.mask}>
        <View style={styles.box}>
          <Image
            style={styles.img}
            source={{
              uri:
                'https://img.alicdn.com/imgextra/i4/TB1UMShLXXXXXXFXVXXXXXXXXXX_!!0-item_pic.jpg'
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    height: screenHeight - 60,
    width: screenWidth,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: screenWidth,
    height: screenWidth
  }
});
