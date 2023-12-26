/**
 * overlay
 * @type {ReactNative|exports|module.exports}
 */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { screenHeight } from 'wmkit/styles/index';

export default class Overlay extends Component {
  static defaultProps = {
    modal: false //是不是需要模态
  };

  render() {
    if (this.props.modal) {
      return (
        <View style={[styles.modalContainer, this.props.style]}>
          {this.props.children}
        </View>
      );
    } else {
      return (
        <View style={styles.tipContainer}>
          <View style={styles.container}>{this.props.children}</View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  //普通的overlay
  container: {
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  //模态
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },

  tipContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: screenHeight / 2,
    transform: [{ translate: [0, -100] }]
  }
});
