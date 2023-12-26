import React, { Component } from 'react'
import { Text, View, StyleSheet,Platform } from 'react-native';
import WMImage from 'wmkit/image/index';
import { Relax } from 'plume2';
import * as _ from 'wmkit/common/util';

@Relax
export default class FailGifts extends Component {
  static relaxProps = {
    gift:'gift'
  }

  render() {
    const {gift} = this.props.relaxProps;

    return (
      <View style={styles.failGiftContent}>
        {gift.length > 0 && <Text style={styles.failGiftText}>失效赠品</Text>}
        {gift.map((item) => {
          return (
            <View style={styles.failGiftItem} key={item.goodsInfoId}>
              <View style={styles.imgBox}>
                <WMImage
                  src={
                    item.goodsInfoImg&&`${item.goodsInfoImg}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_150,h_150`
                  }
                  style={styles.goodsImg}
                />
              </View>
              <View style={styles.failGiftRight}>
                <Text allowFontScaling={false} numberOfLines={2} style={styles.failGiftName}>{item.goodsInfoName}</Text>
                <Text style={styles.failGiftNum}>x {item.buyCount}</Text>
              </View>
            </View>
          );
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  failGiftContent:{
    marginHorizontal:10,
    backgroundColor:'#fff',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    paddingBottom:Platform.OS == 'android' ? 0 : _.isIphoneX() ? 35 : 20

  },
  failGiftText:{
    fontSize:13,
    paddingLeft:10,
  },
  failGiftItem:{
    display:'flex',
    flexDirection:'row',
    paddingVertical:20,
    paddingHorizontal:10,
  },
  imgBox:{
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
  },
  goodsImg:{
    width:88,
    height:88,
    borderRadius:10,
  },
  failGiftRight:{
    flex:1,
    justifyContent:'space-between',
  },
  failGiftName:{
    paddingHorizontal:15,
    fontSize:13,
    lineHeight:20,
  },
  failGiftNum:{
    fontSize:11,
    textAlign:'right',
  }
})