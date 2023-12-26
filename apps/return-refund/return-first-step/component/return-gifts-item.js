import React from 'react';
import { View, Image, Text, StyleSheet, PixelRatio } from 'react-native';

import * as _ from 'wmkit/common/util';
import Check from 'wmkit/check';
import { priceColor } from 'wmkit/styles/index';
const noneImg = require('../../img/none.png');

/**
 * 退货商品
 */
export default class ReturnGiftsItem extends React.Component {
  static defaultProps = {
    //赠品项
    sku: {}
  };

  render() {
    const sku = this.props.sku;
    return (
      <View style={styles.rowItem}>
        <Check
          checked={sku.giftChecked}
          disable={true}
          style={{ marginRight: 10 }}
        />
        <View style={styles.item}>
          <Image
            source={sku.pic ? { uri: sku.pic } : noneImg}
            style={styles.img}
          />
          <View style={styles.content}>
            <View style={styles.titBox}>
              <View style={styles.tagGift}>
                <Text style={styles.tagText} allowFontSacling={false}>
                  赠品
                </Text>
              </View>
              <Text
                style={styles.title}
                numberOfLines={1}
                allowFontSacling={false}
              >
                &nbsp;&nbsp;{sku.skuName.trim()}
              </Text>
            </View>
            <Text style={styles.gec} numberOfLines={1} allowFontSacling={false}>
              {sku.specDetails}
            </Text>
            <View style={styles.row}>
              <Text allowFontSacling={false} style={[styles.price, { color: priceColor }]}>
                ¥{_.addZero(sku.price)}
              </Text>
              <Text allowFontSacling={false} style={styles.num}>
                ×{sku.num}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 10
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 10,
    height: 55
  },
  title: {
    color: '#333333',
    fontSize: 14,
    flex: 1
  },
  gec: {
    color: '#999999',
    fontSize: 13,
    marginBottom: 5
  },
  price: {
    fontSize: 15
  },
  num: {
    fontSize: 15,
    color: '#333'
  },
  img: {
    width: 55,
    height: 55,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  },
  titBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  tagGift: {
    backgroundColor: '#ff7e90',
    width: 31,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagText: {
    color: '#fff',
    fontSize: 10
  }
});
