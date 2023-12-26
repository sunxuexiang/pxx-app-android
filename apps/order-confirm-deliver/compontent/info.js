import { Relax } from 'plume2';
import React, { Component } from 'react';
import { noop } from 'wmkit';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Confirm } from 'wmkit/modal/confirm';
import { mainColor } from '@/wmkit/styles';

@Relax
export default class Info extends Component {
  static relaxProps = {
    delLogisticscompany: noop,
    personalSite: 'personalSite'
  }
  render(){
    const {personalSite} = this.props.relaxProps;
    return(
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText} allowFontScaling={false}>添加物流公司</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label} allowFontScaling={false}>物流公司名称：</Text>
          <Text style={styles.text} allowFontScaling={false}>
            {personalSite.get('logisticsName') || '-'}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label} allowFontScaling={false}>物流公司电话：</Text>
          <Text style={styles.text} allowFontScaling={false}>
            {personalSite.get('logisticsPhone') || '-'}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label} allowFontScaling={false}>
            <Text style={[styles.label, {opacity: 0}]} allowFontScaling={false}>
              占位
            </Text>
            收货站点：
          </Text>
          <Text style={styles.text} allowFontScaling={false}>{personalSite.get('receivingPoint') || '-'}</Text>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.onDel}
          >
            <Text
              style={[styles.btnText, { color: mainColor }]}
              allowFontScaling={false}
            >
              删除
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onDel = () => {
    const {delLogisticscompany} = this.props.relaxProps;
    Confirm({
      title: '删除',
      text: '是否删除已添加的物流公司',
      okText: '确定',
      cancelText: '再想想',
      okFn: () => delLogisticscompany(),
      cancelFn: () => {}
    });
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginTop: 12,
    backgroundColor: '#fff'
  },
  title: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: '500'
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  label: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)'
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnText: {
    fontSize: 14
  },
});