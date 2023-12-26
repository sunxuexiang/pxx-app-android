import React, { Component } from 'react'
import { Text, View, StyleSheet,Image } from 'react-native';
import { Relax } from 'plume2';
import { mainColor } from 'wmkit/styles/index';

const _TYPE = {
  '0': {text: '立减'},
  '1': {text: '买折'},
  '2': {text: '买赠'},
};
@Relax
export default class MarketingItem extends Component {
  static relaxProps = {
    resultTradeMarketings:'resultTradeMarketings'
  }

  _marketingActivity = (marketings) => {
    let marketingText = '';
    if (marketings.marketingType == 0) {
      marketingText = '立减' + marketings.reductionLevel.reduction + '元';
    } else if (marketings.marketingType == 1) {
      marketingText = '立享' + marketings.fullDiscountLevel.discount * 10 + '折';
    } else if (marketings.marketingType == 2) {
      if (marketings.subType == 5) {
        marketingText = '买' + marketings.giftLevel.fullCount + '件送1件';
      } else if (marketings.subType == 4) {
        marketingText = '买' + marketings.giftLevel.fullAmount + '元送1件';
      }
    }
    marketings.marketingType;
    return marketingText;
  };

  render() {
    const {resultTradeMarketings} = this.props.relaxProps;

    return (
      <View style={styles.marketingContent}>
        {resultTradeMarketings.map((item) => {
          return (
            <View style={styles.marketingItem}>
              <View style={styles.goodsActive}>
                <View style={[styles.activeItem, { borderColor: mainColor }]}>
                  <Text style={[styles.activeText, { color: mainColor }]}>{_TYPE[item.marketingType].text}</Text>
                </View>
              </View>
              <Text style={styles.marketingText}>{this._marketingActivity(item)}</Text>
              <Image
                style={styles.failcon}
                source={require('../img/fail-marketing.png')}
              />
            </View>
          );
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  marketingContent:{
    padding:10,
  },
  marketingItem:{
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal:10,
    marginVertical:5,
    borderRadius:10,
  },
  goodsActive: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  activeItem:{
    flexShrink:0,
    borderRadius:2,
    borderWidth:0.5,
    paddingVertical:2,
    paddingHorizontal:4,
    marginRight:4
  },
  activeText:{
    fontSize:11
  },
  marketingText:{
    flex:1,
    fontSize:12,
    lineHeight:50,
  },
  failcon:{
    width:80,
    height:50,

  }
})
