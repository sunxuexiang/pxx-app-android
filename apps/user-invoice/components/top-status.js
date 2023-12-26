/**
 * Created by hht on 2017/9/19.
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  StyleSheet
} from 'react-native';
import { Relax } from 'plume2';
import Lightbox from 'react-native-lightbox';

import { FormInput, noop, WmUpload, WMImage } from 'wmkit';

import { screenWidth } from 'styles';

const statusWait = require('../img/status-wait.png');
const statusSuccess = require('../img/success.png');
const statusError = require('../img/status-error.png');

@Relax
export default class TopStatus extends React.Component {
  static relaxProps = {
    invoiceBean: 'invoice',
    editStatus: 'editStatus'
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { invoiceBean } = this.props.relaxProps;
    let checkState = invoiceBean.get('checkState');

    return (
      <View style={{ flex: 1 }}>
        {checkState == 0 ? (
          <View style={styles.status}>
            <Image source={statusWait} style={styles.statusIcon} />
            <Text style={styles.statusName} allowFontScaling={false}>审核中</Text>
            <Text style={styles.statusInfo} allowFontScaling={false}>您无法编辑审核中增票资质</Text>
          </View>
        ) : (
          null
        )}
        {checkState == 1 ? (
          <View style={styles.status}>
            <Image source={statusSuccess} style={styles.statusIcon} />
            <Text style={styles.statusName} allowFontScaling={false}>审核通过</Text>
            <Text style={styles.statusInfo} allowFontScaling={false}>您的增票资质已通过审核，可正常使用</Text>
          </View>
        ) : (
          null
        )}
        {checkState == 2 ? (
          <View style={styles.status}>
            <Image source={statusError} style={styles.statusIcon} />
            <Text style={styles.statusName} allowFontScaling={false}>审核未通过</Text>
            <Text style={styles.statusInfo} allowFontScaling={false}>
              原因是：<Text style={styles.statusInfoReason} allowFontScaling={false}>{invoiceBean.get('rejectReason')}</Text>
            </Text>
            <Text style={styles.statusInfo} allowFontScaling={false}>请修改后重新提交</Text>
          </View>
        ) : (
          null
        )}
      </View>
    );
  }



}

const styles = StyleSheet.create({
  status: {
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    marginTop:28,
    marginBottom:24
  },
  statusIcon:{
    width:48,
    height:48,
    marginBottom:10
  },
  statusName:{
    fontSize:16,
    color:'#333',
    fontWeight:'bold',
    marginBottom:5
  },
  statusInfo:{
    fontSize:14,
    color:'#999',
  },
  statusInfoReason:{
    fontSize:14,
    color:'#FF0022',
  },
});
