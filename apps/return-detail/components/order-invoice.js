/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  Text,
  Image
} from 'react-native';
import { Relax, msg } from 'plume2';

@Relax
export default class OrderInvoice extends Component {
  static relaxProps = {
    detail: 'detail'
  };

  render() {
    const { detail } = this.props.relaxProps;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          msg.emit('router: goToNext', {
            routeName: 'ReturnRecord',
            rid: detail.get('id'),
            returnFlowState: detail.get('returnFlowState')
          });
        }}
      >
        <Text allowFontScaling={false} style={styles.text}>
          退款记录
        </Text>
        <Image source={require('../img/arrow.png')} style={styles.arrow} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 50,
    justifyContent: 'space-between',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 8
  },
  arrow: {
    width: 7,
    height: 13
  },
  text: {
    color: '#333',
    fontSize: 12
  }
});
