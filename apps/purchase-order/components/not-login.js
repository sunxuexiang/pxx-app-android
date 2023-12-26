import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';

@Relax
export default class NotLogin extends Component {
  static relaxProps = {
    mergePurchaseAndInit: noop
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            msg.emit('loginModal:toggleVisible', {
              callBack: this.props.relaxProps.mergePurchaseAndInit
            });
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText} allowFontScaling={false}>
            登录
          </Text>
        </TouchableOpacity>
        <Text style={styles.tips} allowFontScaling={false}>
          登录后自动同步购物车中已有商品
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    marginBottom: 10,
    borderBottomColor: '#ececec',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  btn: {
    padding: 2,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 12
  },
  btnText: {
    color: '#000',
    fontSize: 13
  },
  tips: {
    marginLeft: 10,
    color: '#333',
    fontSize: 13
  }
});
