import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  TouchableOpacity
} from 'react-native';

import { Relax } from 'plume2';
import { mainColor } from 'wmkit/styles/index';
import { noop, WMImage } from '../../../wmkit';
import { _calculateGoodsPrice } from '../kit';

@Relax
export default class InvalidList extends React.Component {
  static relaxProps = {
    skus: 'skus',
    cleanInvalidGoods: noop,
    intervalPrices: 'intervalPrices'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { skus, cleanInvalidGoods, intervalPrices } = this.props.relaxProps;
    const renderSkus = skus.filter((sku) => sku.get('goodsStatus') === 2);
    const invalidSkus = renderSkus
      .map((sku) => {
        return (
          <View style={styles.rowItem} key={sku.get('goodsInfoId')}>
            <TouchableOpacity activeOpacity={1} style={styles.item}>
              <View style={styles.invalidLeft}>
                {/* <View style={styles.lack}>
                  <Text allowFontSca ling={false} style={styles.lackText}>

                  </Text>
                </View> */}
                <WMImage style={styles.img} src={sku.get('goodsInfoImg') && `${sku.get('goodsInfoImg')}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_150,h_150`} />
                <View style={styles.notGoods}>
                  <View style={styles.whiteBox}>
                    <Text style={styles.notGoodsText} allowFontScaling={false}>
                      失效
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.content}>
                <Text
                  style={[styles.title, { color: '#bcbcbc' }]}
                  allowFontSacling={false}
                  numberOfLines={2}
                >
                  {sku.get('goodsInfoName')}
                </Text>
                <Text
                  style={[styles.price, { color: '#bcbcbc' }]}
                  allowFontSacling={false}
                  numberOfLines={1}
                >
                  {sku.get('specText')}
                </Text>
                <Text
                  allowFontSacling={false}
                  style={[styles.price, { color: '#bcbcbc' }]}
                >{`¥ ${_calculateGoodsPrice(sku, intervalPrices).toFixed(
                  2
                )}`}</Text>
                {/*<Text style={{color: '#bcbcbc'}} allowFontSacling={false} numberOfLines={1}>*/}
                {/*失效原因</Text>*/}
              </View>
            </TouchableOpacity>
          </View>
        );
      })
      .toArray();

    return (
      renderSkus.toJS().length > 0 && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.leftText} allowFontSacling={false}>
              失效商品
              {renderSkus.toJS().length}件
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => cleanInvalidGoods()}
            >
              <Text allowFontSacling={false} style={[styles.blueText, { color: mainColor }]}>
                清空失效宝贝
              </Text>
            </TouchableOpacity>
          </View>
          {invalidSkus}
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container:{
    borderRadius:6,
    overflow:'hidden'
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    //borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    backgroundColor: '#ffffff'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 10,
    height: 80
  },
  title: {
    color: '#333333',
    fontSize: 14,
    marginBottom: 10
  },
  gec: {
    color: '#999999',
    fontSize: 13,
    marginBottom: 10
  },
  price: {
    fontSize: 15,
    color: '#cb4255'
  },
  img: {
    width: 80,
    height: 80,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  },
  lack: {
    width: 35,
    height: 15,
    backgroundColor: '#cccccc',
    borderRadius: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  lackText: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  invalidLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    //marginTop: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8
    //borderTopWidth: 1 / PixelRatio.get(),
    //borderTopColor: '#ebebeb',
  },
  leftText: {
    fontSize: 14,
    color: '#333333'
  },
  blueText: {
    fontSize: 14
  },
  notGoods: {
    position: 'absolute',
    width: 80,
    height: 80,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(000,000,000,0.3)',
    borderRadius: 6
  },
  whiteBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notGoodsText: {
    fontSize: 14,
    color: '#fff'
  },
});
