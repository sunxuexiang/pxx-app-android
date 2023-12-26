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
        <Image source={require('../img/line.png')} style={styles.line}/>
        <View style={styles.container}>
          <View style={styles.rightDom}>
            <View style={styles.center}>
              <View style={styles.item}>
                <Text allowFontScaling={false}>
                  {orderWrapper.buyerAddress()}
                </Text>
              </View>
              <Text style={styles.buyerInfo} allowFontScaling={false} numberOfLines={2}>
                {orderWrapper.buyerName()}&nbsp;&nbsp; {orderWrapper.buyerPhone()}
              </Text>

            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    marginTop: 10,
    borderRadius: 6

  },
  container: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between'
  },
  buyerInfo: {
    color:'rgba(0,0,0,.4)',
    fontSize:12
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
    width: screenWidth - 10
  }
});
