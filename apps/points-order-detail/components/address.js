/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import { Relax } from 'plume2';
import {
  View,
  StyleSheet,
  Text,
  PixelRatio,
  Image,
  TouchableOpacity
} from 'react-native';

import { screenWidth } from 'wmkit/styles/index';
import OrderWrapper from 'wmkit/order-wrapper';
@Relax
export default class Address extends Component {
  static relaxProps = {
    detail: 'detail'
  };

  render() {
    const { detail } = this.props.relaxProps;
    let orderWrapper = OrderWrapper(detail);

    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.box}>
        <View style={styles.container}>
        <Image style={styles.line} source={require('../img/line.png')} />
          {/* <View style={styles.leftDom}>
            <Image style={styles.img} source={require('../img/location.png')} />
          </View> */}
          <View style={styles.rightDom}>
            <View style={styles.center}>
              <View style={styles.item}>
                <Text allowFontScaling={false} style={styles.text}>
                  {orderWrapper.buyerAddress()}
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={styles.phone}
              >
                {orderWrapper.buyerName()} {orderWrapper.buyerPhone()}
              </Text>
            </View>
          </View>
        </View>
        {/* <Image source={require('../img/line.png')} style={styles.line} /> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    position: 'relative'
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between'
  },
  leftDom: {
    justifyContent: 'center',
    marginRight: 15
  },
  rightDom: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  img: {
    width: 17,
    height: 22
  },
  arrow: {
    width: 7,
    height: 13,
    marginLeft: 10
  },
  center: {
    flex: 1,
    marginLeft: 10
  },
  line: {
    height: 4,
    width: screenWidth - 24,
    position: 'absolute',
    top: 0
  }
});
