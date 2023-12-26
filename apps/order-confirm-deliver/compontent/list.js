import { Relax } from 'plume2';
import React, { Component } from 'react';
import { noop } from 'wmkit';
import FormInput from 'wmkit/form/form-input';
import FormItem from 'wmkit/form/form-item';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, PixelRatio } from 'react-native';
import { mainColor, screenHeight } from '@/wmkit/styles';
import Loading from 'wmkit/loading';

@Relax
export default class List extends Component {
  static relaxProps = {
    changeFieldValue: noop,
    companyList: 'companyList',
    isAddPersonalSite: 'isAddPersonalSite',
    selectedItem: 'selectedItem',
    acceptSiteAddr: 'acceptSiteAddr',
    loading: 'loading'
  }
  render(){
    const { changeFieldValue, isAddPersonalSite, acceptSiteAddr, selectedItem} = this.props.relaxProps;
    let logisticsCompany = selectedItem && selectedItem.get('id') ?
    `${selectedItem.get('logisticsName') || ''} ${selectedItem.get('logisticsPhone') || ''} ${selectedItem.get('id') != 'default' && selectedItem.get('logisticsAddress') || ''}` :
    ''
    return(
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText} allowFontScaling={false}>物流公司</Text>
        </View>
        <TouchableOpacity
          style={styles.box}
          activeOpacity={1}
          onPress={() => {
            if(selectedItem && selectedItem.get('id')) {
              changeFieldValue({ field: 'companyList', value: [selectedItem] });
            }
            changeFieldValue({ field: 'showSearchModal', value: true });
          }}
        >
          <Image source={require('../img/search.png')} style={[styles.img, {marginRight: 12}]} />
          <Text allowFontScaling={false} style={styles.text} numberOfLines={1} >
            {logisticsCompany||'请输入物流公司'}
          </Text>
          {logisticsCompany?<Image source={require('../img/clear.png')} style={styles.img}  resizeMode="contain"/>:null}
        </TouchableOpacity>
        <View style={styles.selectedBox}>
          <Text allowFontScaling={false} style={styles.selectedText} numberOfLines={2}>
            <Text allowFontScaling={false} style={[styles.selectedPoint, { color: mainColor }]}>
              已选择：
            </Text>
            {logisticsCompany || '暂未选择'}
          </Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText} allowFontScaling={false}>收货站点</Text>
        </View>
        <View>
          <FormInput
            placeholder="请输入收货站点"
            defaultValue={acceptSiteAddr}
            disabled={isAddPersonalSite}
            maxLength={200}
            onChange={(value) => {
              changeFieldValue({ field: 'acceptSiteAddr', value })
            }}
            placeholderTextColor="rgba(0,0,0,0.4)"
            itemStyle={[{height: 36, backgroundColor: 'transparent', borderWidth: 1 / PixelRatio.get(), borderColor: '#e6e6e6', borderBottomColor: '#e6e6e6', borderRadius: 6 }, isAddPersonalSite ? {backgroundColor: '#f5f5f5', overflow: 'hidden'} : {}]}
            rightStyle={{paddingLeft: 2, paddingRight: 10}}
            rightTextStyle={{paddingLeft: 8}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#e6e6e6',
    borderRadius: 6
  },
  text: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.4)',
    flex:1
  },
  img: {
    width: 16,
    height: 16
  },
  selectedBox: {
    marginVertical: 12
  },
  selectedText: {
    lineHeight: 16,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.8)'
  },
  selectedPoint: {
    lineHeight: 16,
    fontSize: 12
  },
});
