import { Relax } from 'plume2';
import React, { Component } from 'react';
import { noop, FormInput } from 'wmkit';
import { StyleSheet, View, Text, TouchableOpacity, PixelRatio} from 'react-native';
import WmModal from 'wmkit/modal/modal';
import { screenHeight, screenWidth } from '@/wmkit/styles';

@Relax
export default class Modal extends Component {
  static relaxProps = {
    deliverSiteSet: noop,
    clearPersonalSite: noop,
    addPersonalCompany: noop,
    changeFieldValue: noop,
    personalSite: 'personalSite'
  }
  render(){
    const {personalSite, deliverSiteSet, clearPersonalSite, addPersonalCompany, changeFieldValue} = this.props.relaxProps;
    return(
      <View style={styles.shadow}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText} allowFontScaling={false}>添加物流公司</Text>
          </View>
          <View style={styles.body}>
            <FormInput
              required={true}
              label="物流公司名称"
              placeholder="请输入物流公司名称"
              defaultValue={(personalSite && personalSite.get('logisticsName')) || ''}
              onChange={(text) => deliverSiteSet('logisticsName', text)}
              maxLength={100}
              checkValue={true}
              placeholderTextColor="rgba(0,0,0,0.4)"
              itemStyle={{ borderBottomWidth: 0 }}
            />
            <FormInput
              required={true}
              type="number"
              label="物流公司电话"
              placeholder="请输入物流公司电话"
              defaultValue={(personalSite && personalSite.get('logisticsPhone')) || ''}
              onChange={(text) => deliverSiteSet('logisticsPhone', text)}
              minLength={11}
              maxLength={15}
              checkValue={true}
              placeholderTextColor="rgba(0,0,0,0.4)"
              itemStyle={{ borderBottomWidth: 0 }}
            />
            <FormInput
              label="收货站点"
              placeholder="请输入收货站点"
              defaultValue={(personalSite && personalSite.get('receivingPoint')) || ''}
              onChange={(text) => deliverSiteSet('receivingPoint', text)}
              maxLength={200}
              checkValue={true}
              placeholderTextColor="rgba(0,0,0,0.4)"
              itemStyle={{ borderBottomWidth: 0 }}
            />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => {
                changeFieldValue({ field: 'showModal', value: false })
                clearPersonalSite();
              }}
            >
              <Text
                style={styles.btnText}
                allowFontScaling={false}
              >
                取消
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.btn, {borderRightWidth: 0}]}
              onPress={() => addPersonalCompany()}
            >
              <Text
                style={styles.btnText}
                allowFontScaling={false}
              >
                确定
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: 'rgba(0,0,0,.5)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    flex: 1,
    zIndex: 1000
  },
  container: {
    backgroundColor: '#fff',
    width: screenWidth * 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44
  },
  titleText: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: '500'
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  item: {
    
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderColor: '#e6e6e6',
    borderTopWidth: 1 / PixelRatio.get(),
    borderRightWidth: 1 / PixelRatio.get()
  },
  btnText: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.8)',
  },
});