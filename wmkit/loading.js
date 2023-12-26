import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { screenHeight, screenWidth} from 'wmkit/styles/index';

export default class Loading extends Component {
  render() {
    return (
      <View style={[styles.container,this.props.loadingStyle]}>
        <View style={styles.imgBox}>
          <Image style={styles.img} source={require('./image/loading.gif')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: screenWidth * 0.15,
    position: 'absolute',
    top: screenHeight * 0.45,
    zIndex: 300
  },
  imgBox: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: 28,
    overflow: 'hidden'
  },
  img: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15
  }
});
