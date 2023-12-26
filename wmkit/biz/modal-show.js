import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { screenWidth, screenHeight } from 'wmkit/styles/index';
import * as _ from '../common/util';

/**
 * 规则弹窗组件
 */
export default class ModalShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { isModalFlag, imgUrl, link, imgHeight, nextPopupId, handleClose, isFull } = this.props;
    return isModalFlag ? (
      <View style={styles.modalBox}>
        <TouchableOpacity
          style={styles.modalBox}
          onPress={() => handleClose(nextPopupId)}
        />
        <View style={styles.modalImg}>
          <TouchableOpacity
            style={styles.modalBtn}
            onPress={() => {
              link();
              handleClose(nextPopupId);
            }}
            activeOpacity={0.8}
          >
            <Image
              style={[
                isFull ? styles.modalFullContent : styles.modalContent
              ]}
              source={{
                uri: imgUrl
              }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleClose(nextPopupId)}
            activeOpacity={0.8}
            style={isFull ? styles.fullClose : {}}
          >
            <Image
              source={require('../add-cart/img/modal-close.png')}
              style={styles.modalClose}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  modalBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
    justifyContent: 'center'
  },
  modalImg: {
    alignItems: 'center',
    zIndex: 3,
  },
  modalBtn: {
    width: '100%',
    alignItems: 'center'
  },
  modalContent: {
    width: 280,
    height: 400,
    marginBottom: 15
  },
  modalFullContent: {
    width: screenWidth,
    height: screenHeight
  },
  fullClose: {
    position: 'absolute',
    top: 24,
    right: 24,
    ..._.ifIphoneX(
      {
        top: 100
      },
      {
        top: 48
      }
    ),
    zIndex: 3
  },
  modalClose: {
    width: 25,
    height: 25
  }
});
