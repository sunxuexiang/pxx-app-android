'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';

import {  screenWidth, screenHeight, mainColor } from 'wmkit/styles';
import Loading from 'wmkit/loading';

export default class SkeletonDetail extends Component {
  render() {
    let imgList = [1, 2, 3, 4, 5];
    return (
      <View style={[styles.skeContainer, styles.skeBgColor]}>
        <View style={[styles.skeSwiper]}>
        </View>
        <View style={styles.goodsInfo}>
          <View
            style={[
              styles.priceContainer,
              styles.skeBgColor,
              { marginBottom: 10 }
            ]}
          >
            <View style={[styles.price, styles.skeBgColor]}></View>
            <View style={[styles.share, styles.skeBgColor]}></View>
          </View>
          <View style={[styles.box, { paddingBottom: 12 }]}>
            <View style={[styles.squre1, styles.skeBgColor]}></View>
            <View style={[styles.squre2, styles.skeBgColor]}></View>
          </View>
          <View style={[{ marginBottom: 8 }]}>
            <View style={[styles.squre3, styles.skeBgColor]}></View>
          </View>
          <View style={[styles.box, { marginBottom: 12 }]}>
            <View style={[styles.squre4, styles.skeBgColor]}></View>
          </View>

          <View style={[styles.squre5, styles.skeBgColor]}></View>
        </View>
        <View
          style={[
            styles.box,
            {
              paddingVertical: 14,
              backgroundColor: '#fff',
              marginBottom: 12,
              paddingHorizontal: 12,
              justifyContent: 'space-between'
            }
          ]}
        >
          <View style={styles.readMoreBox}>
            <View style={[styles.squre7, styles.skeBgColor]}></View>
            <View style={[styles.squre8, styles.skeBgColor]}></View>
            <View style={[styles.squre9, styles.skeBgColor]}></View>
          </View>
          <Image
            style={styles.readMoreImg}
            source={require('../img/readMore.png')}
          ></Image>
        </View>
        <View
          style={[
            styles.box,
            {
              paddingVertical: 17,
              backgroundColor: '#fff',
              marginBottom: 12,
              paddingHorizontal: 12,
              justifyContent: 'space-between'
            }
          ]}
        >
          <View style={styles.readMoreBox}>
            <View style={[styles.squre10, styles.skeBgColor]}></View>
            <View style={[styles.squre11, styles.skeBgColor]}></View>
          </View>
          <Image
            style={styles.readMoreImg}
            source={require('../img/readMore.png')}
          ></Image>
        </View>
        <View style={[styles.store]}>
          <View
            style={[
              styles.box,
              { justifyContent: 'space-between', marginBottom: 16 }
            ]}
          >
            <View style={[styles.squre12, styles.skeBgColor]}></View>
            <View style={styles.arrowRightbox}>
              <View style={[styles.squre13, styles.skeBgColor]}></View>
              <Image
                style={[styles.arrowRightImg, {tintColor: mainColor}]}
                source={require('wmkit/theme/r-arrow.png')}
              ></Image>
            </View>
          </View>
          <View style={[styles.iconBox, { marginBottom: 16 }]}>
            <View style={[styles.avatar, styles.skeBgColor]}></View>
            <View style={[styles.iconRight]}>
              <View style={[styles.iconRightTop, styles.skeBgColor]}></View>
              <View style={[styles.box1]}>
                <View style={[styles.squre14, styles.skeBgColor]}></View>
                <View style={[styles.squre14, styles.skeBgColor]}></View>
                <View style={[styles.squre14, styles.skeBgColor]}></View>
                <View style={[styles.squre14, styles.skeBgColor]}></View>
                <View style={[styles.squre14, styles.skeBgColor]}></View>
              </View>
            </View>
          </View>
          <View
            style={[styles.squre19, styles.skeBgColor, { marginBottom: 4 }]}
          ></View>
          <View
            style={[styles.squre19, styles.skeBgColor, { marginBottom: 16 }]}
          ></View>
          <View style={[styles.imageBox]}>
            {imgList.map((item) => {
              return <View style={[styles.imgItem, styles.skeBgColor]}></View>;
            })}
          </View>
        </View>
        <View style={styles.loading}>
            <Loading />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  skeBgColor: {
    backgroundColor: '#f5f5f5'
  },
  skeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: screenWidth
  },
  skeSwiper: {
    width: screenWidth,
    height: 329,
    backgroundColor: '#ebebeb',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  headLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headRight: {
    flexDirection: 'row'
  },
  pagination: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 14,
    width: 52,
    height: 24,
    opacity: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  pageCur: {
    fontSize: 14,
    color: '#fff'
  },
  pageTotal: {
    fontSize: 14,
    color: '#fff'
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  goodsInfo: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 12
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  price: {
    width: screenWidth * 0.442,
    height: 24
  },
  share: {
    width: screenWidth * 0.17,
    height: 24
  },
  squre1: {
    width: 38,
    height: 14,
    marginRight: 4
  },
  squre2: {
    width: 64,
    height: 14
  },

  squre4: {
    width: 258,
    height: 16
  },

  squre3: {
    height: 16
  },
  squre7: {
    width: 28,
    height: 14,
    marginRight: 12
  },
  squre8: {
    width: 68,
    height: 20,
    marginRight: 8
  },
  squre9: {
    width: 86,
    height: 20
  },
  squre10: {
    width: 28,
    height: 14,
    marginRight: 12
  },
  squre11: {
    width: 275,
    height: 14
  },
  store: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  squre12: {
    width: 28,
    height: 14
  },
  squre13: {
    width: 70,
    height: 12
  },
  iconBox: {
    flexDirection: 'row'
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 400,
    marginRight: 8
  },
  iconRight: {
    paddingVertical: 3,
    justifyContent: 'space-between'
  },
  iconRightTop: {
    width: 42,
    height: 14
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  squre14: {
    width: 10,
    height: 10,
    marginRight: 4
  },
  squre19: {
    width: 351,
    height: 12
  },
  imageBox: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
  imgItem: {
    width: 94,
    height: 94,
    borderRadius: 8,
    marginRight: 8
  },
  backImg: {
    width: 28,
    height: 28
  },
  shareBtnImg: {
    width: 28,
    height: 28
  },
  menuImg: {
    width: 28,
    height: 28,
    marginLeft: 8
  },
  readMoreBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  readMoreImg: {
    width: 24,
    height: 24
  },
  arrowRightbox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowRightImg: {
    width: 12,
    height: 12
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
});
