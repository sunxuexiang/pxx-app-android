import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import WMImage from 'wmkit/image/index';
import { screenWidth, mainColor } from 'wmkit/styles/index';
import { msg } from 'plume2';
import Price from '../cartprice';
// 这边将class的名称从ListItem改成了GrouponListItem
export default class GrouponListItem extends React.Component<any, any> {
  render() {
    const { goodInfo, id } = this.props;
    console.log(goodInfo, 'v.goodsinfo');
    return (
      <View style={styles.grouponGoodsList} key={id}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            msg.emit('router: goToNext', {
              routeName: 'SpellGroupDetail',
              skuId: goodInfo.goodsInfoId
            })
          }
        >
          <View style={styles.listItem}>
            <View style={styles.imgBox}>
              <WMImage style={styles.itemImg} src={goodInfo.goodsImg} resizeMode='cover' />
            </View>
            <View style={styles.item}>
              <Text allowFontScaling={false} style={styles.goodsName} numberOfLines={2}>
                {goodInfo.goodsName}
              </Text>
              <View style={styles.box}>
                <View style={styles.priceItem}>
                  <Price price={goodInfo.grouponPrice.toFixed(2) || '0.00'} />
                  <Text allowFontScaling={false} style={styles.linePrice}>
                    单买&nbsp; ¥{goodInfo.marketPrice.toFixed(2) || '0.00'}
                  </Text>
                </View>
                <View style={styles.goJoin}>
                  <View style={styles.groupNum}>
                    <Text allowFontScaling={false} style={[styles.numRight, { color: mainColor, borderColor: mainColor }]}>
                      {goodInfo.grouponNum || 0}
                      <Text style={{ color: 'rgba(0,0,0,0.4)' }}>人团</Text>
                    </Text>
                  </View>
                  <LinearGradient
                    colors={[mainColor, mainColor]}
                    style={[styles.linearGradient]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                  >
                    <Text allowFontScaling={false} style={styles.joinTxt}>
                      立即参团
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  grouponGoodsList: {
    width: screenWidth,
    height: 'auto',
    paddingHorizontal: 12,
    marginBottom: 12
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    display:'flex',
    flexDirection:'row',
    padding: 12
  },
  imgBox: {
    width: 100,
    height: 100
  },
  itemImg: {
    width: '100%',
    height: '100%',
  },
  item: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 6,
    // paddingBottom: 14,
    justifyContent: 'space-between',
  },
  goodsName: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)',
    lineHeight: 16
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6
  },
  groupNum: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  numRight: {
    fontSize: 10,
    borderStyle: 'solid',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  priceItem: {
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  linePrice: {
    fontSize: 10,
    lineHeight: 10,
    color: '#999'
  },
  goJoin: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  joinTxt: {
    fontSize: 12,
    color: '#fff'
  },
  linearGradient: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 8 },
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
    // shadowOpacity: 0.3,
    // shadowRadius: 10,
    shadowColor: '#fc3749'
  }
});
