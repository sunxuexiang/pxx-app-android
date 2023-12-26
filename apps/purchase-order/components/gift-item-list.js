import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Relax, msg } from 'plume2';

import WMImage from 'wmkit/image/index';
import Check from 'wmkit/check';
import Price from 'wmkit/price';

import { mainColor } from 'wmkit/styles/index';

@Relax
export default class GiftItemList extends Component {
  static relaxProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { list, allowCheck, onCheck } = this.props;

    return (
      <View style={styles.container}>
        {list
          .map((sku, index) => {
            return (
              <View key={sku.goodsInfoId} style={styles.item}>
                <Check
                  style={styles.checkStyle}
                  checked={sku.checked}
                  disable={!allowCheck || (allowCheck && sku.disabled)}
                  disableCheckImg={!allowCheck && require('wmkit/theme/check.png')}
                  onCheck={() => {
                    if(!allowCheck || (allowCheck && sku.disabled)) {
                      return;
                    }
                    onCheck(sku);
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ flex: 1, flexDirection: 'row' }}
                >
                  <View>
                    <WMImage style={styles.img} src={sku.goodsInfoImg && `${sku.goodsInfoImg}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_150,h_150`} />
                    {sku.goodsStatus > 0 && (
                      <View style={styles.bignotGoods}>
                        <View style={styles.bigwhiteBox}>
                          <Text style={styles.bignotGoodsText} allowFontScaling={false}>
                            {sku.goodsStatus === 2 ? '失效' : '等货中'}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={styles.content}>
                    <View style={styles.titleBox}>
                      <View style={[styles.tagGift, { backgroundColor: mainColor }]}>
                        <Text style={styles.tagText} allowFontSacling={false}>
                          赠品
                        </Text>
                      </View>
                      <Text
                        style={styles.title}
                        allowFontSacling={false}
                        numberOfLines={2}
                      >
                        {sku.goodsInfoName}
                      </Text>
                    </View>
                    <Text
                      style={styles.gec}
                      allowFontSacling={false}
                      numberOfLines={1}
                    >
                      {sku.goodsSubtitle || ''}
                    </Text>
                    <View style={styles.bottom}>
                      <Price
                        price={0}
                        bigPriceStyle={{ fontSize: 16, marginBottom: -2 }}
                      />
                      <Text allowFontSacling={false} style={styles.grey}>
                        ×{sku.goodsNum}{sku.goodsUnit}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // borderBottomColor: '#ebebeb',
    // borderBottomWidth: StyleSheet.hairlineWidth
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 6
  },
  checkStyle: {
    marginRight: 10
  },
  item: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    alignItems: 'flex-start'
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    marginLeft: 5,
    flex: 1
  },
  gec: {
    color: '#999999',
    fontSize: 13
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'space-between',
    width: '100%'
  },
  blueText: {
    color: '#3d85cc',
    fontSize: 14,
    backgroundColor: '#cb4255'
  },
  grey: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)',
    paddingLeft: 5
  },
  tagGift: {
    width: 31,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagText: {
    color: '#fff',
    fontSize: 10
  },
  bignotGoods: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 6
  },
  bigwhiteBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bignotGoodsText: {
    fontSize: 14,
    color: '#fff'
  },
});
