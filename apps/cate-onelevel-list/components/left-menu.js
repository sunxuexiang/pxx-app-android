import React, { Component } from 'react'
import {TouchableOpacity,Image,View, StyleSheet,ScrollView,Text,Dimensions} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { mainColor, screenHeight, panelColor } from 'wmkit/styles/index';

@Relax
export default class LeftMenu extends Component {
  static relaxProps = {
    thirdCateList: 'thirdCateList',
    activityThirdCate: 'activityThirdCate',
    setThirdCate: noop,
    _changeIsCateId:noop
  };

  render() {
    const {thirdCateList,activityThirdCate,setThirdCate,_changeIsCateId} = this.props.relaxProps;
    const height = this.props.isShowCarousel ? screenHeight - 290 : screenHeight - 150

    return (
      <View style={{paddingTop:40,paddingBottom:10,backgroundColor:'#fff',height:height }}>
        <ScrollView style={styles.leftMenu} showsVerticalScrollIndicator={false}>
          {thirdCateList &&
            thirdCateList.map((cate,index) => {
              if(!index){
                _changeIsCateId(cate.cateId)
              }
              return (
                <TouchableOpacity
                  onPress={() => setThirdCate(cate.cateId)}
                  activeOpacity={0.8}
                  style={[styles.item,cate.cateId === activityThirdCate && {backgroundColor: panelColor}]}
                  key={cate.cateId}
                >
                  <Text allowFontScaling={false} numberOfLines={1} style={[styles.text,cate.cateId === activityThirdCate && {color: mainColor}]}>{cate.cateName}</Text>
                </TouchableOpacity>
              );
            })}
          
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  leftMenu: {
    width: 84,
    flexDirection: 'column',
  },
  item: {
    height: 44,
    paddingHorizontal: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#333333',
    fontSize: 12,
    height: 14,
    lineHeight: 14,
    textAlign: 'center'
  },
})