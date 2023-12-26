import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { mainColor } from 'wmkit/styles/index';

export default class WMCouponLabel extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    text: {},
    style: {}
  };
  render() {
    const { text } = this.props;
    return (
      <View style={[styles.couponBox, this.props.style]}>
        <Image
          style={[styles.bg, { tintColor: mainColor}]}
          resizeMode="stretch"
          source={require('wmkit/theme/coupon-bj.png')}
        />
        <Text style={[styles.couponText, { color: mainColor }]} allowFontScaling={false} numberOfLines={1}>
          {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  couponBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 42,
    maxWidth: 80,
    height: 20
  },
  couponText: {
    position: 'absolute',
    maxWidth: 80,
    paddingHorizontal: 4,
    fontSize: 10,
    fontWeight: 'bold'
  },
  bg: {
    top: 0,
    left: 0,
    minWidth: 42,
    maxWidth: 80,
    height: 20,
    paddingHorizontal: 12,
    overflow: 'hidden'
  }
});
