import React, { Component } from 'react'
import { StyleSheet, View,Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Relax, msg } from 'plume2';
import BuyAmount from './buy-amount';

@Relax
export default class QRCodePage extends Component {
  static relaxProps = {
    h5Url: 'h5Url',
    jobNo: 'jobNo'
  };

  render() {
    const { h5Url ,jobNo} = this.props.relaxProps;

    return (
      <View style={styles.qrBlock}>
        <View style={styles.qrInner}>
          <BuyAmount />
          <View style={styles.scanCode}>
            <QRCode
                value={`${h5Url}/pages/package-A/login/register/index?jobNo=${jobNo}`}
                size={100}
            />
          </View>
          <Text style={styles.buyText}>面对面微信扫描</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  qrBlock:{
    position:'absolute',
    right:0,
    left:0,
    top:60,
    bottom:0,
    justifyContent:'center',
    alignItems: 'center',
  },
  qrInner:{
    alignItems: 'center',
    borderRadius:10,
    padding:10,
    backgroundColor:'#fff'
  },
  buyText:{
    color:'#666',
  },
  scanCode:{
    alignItems:'center',
    padding:10,
  }
});
