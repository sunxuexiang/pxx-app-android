import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import Swiper from 'react-native-swiper';
import { screenWidth, screenHeight, mainColor } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
const isAndroid = Platform.OS === 'android';

export default class WMImgPreview extends React.Component {
  static defaultProps = {
    data: [],
    changeAnnexMask: noop
  };
  render() {
    const { changeAnnexMask, data } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8} style={styles.mask} />
        <View style={styles.wrapper}>
          <Swiper
            removeClippedSubviews={true}
            // style={isAndroid ? styles.wrapper : null}
            showsPagination={false}
            loop={true}
          >
            {data.map((source) => (
              <View key={Math.random()} style={styles.imgBox}>
                <Image style={styles.img} source={{ uri: source }} />
              </View>
            ))}
          </Swiper>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.closeBox}
          onPress={() => changeAnnexMask()}
        >
          <Image style={styles.close} source={require('./img/close.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    zIndex: 100,
    flex: 1,
    width: screenWidth,
    height: screenHeight
  },
  container: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    left: 0,
    top: 0,
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mask: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000',
    left: 0,
    top: 0,
    opacity: 0.7
  },
  img: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'contain'
  },
  imgBox: {
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnStyle: {
    backgroundColor: 'red'
  },
  closeBox: {
    position: 'absolute',
    right: 25,
    top: 50,
    width: 30,
    height: 30,
    backgroundColor: '#eee',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 110
  },
  close: {
    width: 14,
    height: 14,
    tintColor: '#000'
  }
});
