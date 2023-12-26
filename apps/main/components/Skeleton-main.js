'use strict';
import React, { Component } from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import SelfSalesLabel from 'wmkit/biz/selfsales-label';
// import * as WMkit from 'wmkit/kit';
// import * as _ from 'wmkit/common/util';
// import WMImage from 'wmkit/image';
// import Price from '../biz/cartprice';
import { priceColor, screenWidth,screenHeight } from 'wmkit/styles';

import Loading from 'wmkit/loading';
export default class SkeletonMain extends Component {
  render() {
    
    let functionList = [1,2,3,4,5,6,7,8,9,10];
    let goodList = [1,2,3,4,5,6,7,8,9]
    return (
      <View style={styles.skeContainer}>          
          <View style= {[styles.skeSwiper]}>
            <View style={[styles.dot, {opacity:1}]}></View>
            <View style={[styles.dot]}></View>
            <View style={[styles.dot]}></View>
            <View style={[styles.dot]}></View>
          </View>
          <View style={styles.skeFunctionList}>
            {
              functionList.map((item,index) => {
                return (
                  <View style={(index + 1) %5 == 0 ? styles.functionItem1: styles.functionItem} key={item}>
                      <View style= {[styles.functionTop,styles.skeColor]}></View>
                      <View style= {[styles.functionBottom,styles.skeColor]}></View>
                  </View>
                )
              })
            }
          </View>
          <View style={[styles.banner,styles.skeColor]}></View>
          <View style={[styles.title,styles.skeColor]}></View>
          <View style={[styles.content]}>
              <View style={[styles.contentLeft,styles.skeColor]}></View>
              <View style={[styles.contentRight]}>
                  <View style={[styles.contentTop,styles.skeColor]}></View>
                  <View style={[styles.contentTop,styles.skeColor]}></View>
              </View>
          </View>
          {
            goodList.map((item, index) => {
              return(
                  <View style={[styles.skeMainList]} key={item + 'list'}>
                      <View style={[styles.skeListLeft,styles.skeColor]}></View>
                      <View style={[styles.skeListRight]}>
                          <View style={[styles.skeListTop,styles.skeColor]}></View>
                          <View style={[styles.skeListMiddle,styles.skeColor]}></View>
                          <View style={[styles.skeListBottom]}>
                              <View style={[styles.skeListBottomLine,styles.skeColor]}></View>
                              <View style={[styles.skeListBottomLine,styles.skeColor]}></View>
                          </View>
                      </View>
                  </View>
              )
            })
          }
          
          <View style={styles.loading}>
            <Loading />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  skeMainList: {
    paddingHorizontal:12,
    flexDirection:'row',
    justifyContent:'space-between',
    width:screenWidth,
    marginTop:24
  },
  skeListLeft: {
    width:88,
    height:88
  },
  skeListRight: {
    alignContent:'space-between',
    width:screenWidth*0.66,


  },
  skeListTop: {
    height:32,
    marginBottom:8,

  },
  skeListMiddle: {
    height:12,
    marginBottom:16
  },
  skeListBottom: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  skeListBottomLine: {
    width:84,
    height:20
  },
  skeContainer: {
    flex:1,
    backgroundColor:"#fff",
    width:screenWidth
  }, 
  loading:{
    position:'absolute',
    width:screenWidth,
    height:screenHeight - 88,
    left:0,
    top:0,
    alignItems:'center',
    justifyContent:'center',
  },

  skeSwiper: {
    height:214,
    backgroundColor:"#ebebeb",
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end'
  },

  dot: {
    width:6,
    height:6,
    borderRadius:400,
    backgroundColor:"#feffff",
    marginRight:6,
    marginBottom:10,
    opacity:0.39
  },

  skeFunctionList: {
    paddingHorizontal:24,
    paddingTop:24,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignContent:'space-between',
    width:screenWidth,
    height:208
  },
  functionItem: {
    marginBottom:24,
    marginRight:10
  },
  functionItem1: {
    marginBottom:24,
    // marginRight:22
  },
  functionTop: {
    width:48,
    height:48,
    marginBottom:8
  },
  skeColor: {
    backgroundColor:'#f5f5f5',
  },
  functionBottom: {
    width: 48,
    height: 12,
  },
  banner: {
    width:351,
    height:40,
    alignSelf:'center',
    marginBottom:24
  },
  title: {
    width:64,
    height:16,
    marginLeft:12,
    marginBottom:12
  },
  content: {
    paddingLeft:12,
    paddingRight:12,
    flexDirection:'row',
    justifyContent:'space-between',
    width:screenWidth,
    height:172
  },
  contentLeft: {
    width:screenWidth*0.458,
    height:172
  },
  contentRight: {
    
    justifyContent:'space-between'
  },
  contentTop:{
    // width:171,
    width:screenWidth*0.456,

    height:82
  }

});
