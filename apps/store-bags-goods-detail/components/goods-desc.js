import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Relax } from 'plume2';

import { screenWidth } from 'wmkit/styles/index';
import WMEmpty from 'wmkit/empty';
import AutoHeightWebView from 'react-native-autoheight-webview';

const styleHtml = ` 
 <style type="text/css">
  body {font-size: 14px;word-break: break-all;}
	img {max-width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
	li {clear: both;}
 </style> 
 <meta name="format-detection" content="telephone=no" />
`;

@Relax
export default class GoodsDesc extends Component {
  static relaxProps = {
    descData: 'descData',
    goodsBrand: 'goodsBrand',
    goodsProps: 'goodsProps',
    goodsPropDetailRels: 'goodsPropDetailRels',
    storeGoodsTabs: 'storeGoodsTabs',
    tabKey: 'tabKey',
    storeGoodsTabContent: 'storeGoodsTabContent'
  };

  /**
   * 渲染具体属性值
   * @param prop
   * @param goodsPropDetailRels
   * @returns {string}
   */
  _renderPropDetail = (prop, goodsPropDetailRels) => {
    let detailNm = null;
    if (goodsPropDetailRels && goodsPropDetailRels.size > 0) {
      const goodsDetailRel = goodsPropDetailRels.find(
        (rel) => rel.get('propId') == prop.propId
      );
      if (goodsDetailRel) {
        const goodsDetail = prop.goodsPropDetails.find(
          (detail) => goodsDetailRel.get('detailId') == detail.detailId
        );
        if (goodsDetail) {
          detailNm = goodsDetail.detailName;
        }
      }
    }
    return detailNm ? (
      <View style={styles.parameterDec} key={prop.propId}>
        <Text allowFontScaling={false} style={styles.left}>
          {prop.propName}
        </Text>
        <Text allowFontScaling={false} style={styles.right}>
          {detailNm}
        </Text>
      </View>
    ) : null;
  };

  render() {
    const {
      descData,
      goodsBrand,
      goodsProps,
      goodsPropDetailRels,
      tabKey,
      storeGoodsTabContent
    } = this.props.relaxProps;
    return (
      <View style={{ paddingBottom: 8, marginBottom: 78 }}>
        <View style={styles.pullText}>
          <View style={styles.lineBorder} />
          <View style={styles.overText}>
            <Text allowFontScaling={false} style={styles.text}>
              图文详情
            </Text>
          </View>
        </View>
        {/*商品详情tab*/}
        {/*<ImgDetailTab />*/}
        {tabKey == -1 &&
          ((goodsBrand && goodsBrand.get('brandName')) ||
            (goodsProps && goodsProps.size > 0)) && (
            <View style={styles.parameter}>
              {/* <Text style={styles.title} allowFontScaling={false}>
                产品参数
              </Text> */}
              {goodsBrand &&
                goodsBrand.get('brandName') && (
                  <View style={styles.parameterDec}>
                    <Text allowFontScaling={false} style={styles.left}>
                      品牌
                    </Text>
                    <Text allowFontScaling={false} style={styles.right}>
                      {goodsBrand.get('brandName')}
                      {goodsBrand.get('nickName') &&
                        `（${goodsBrand.get('nickName')}）`}
                    </Text>
                  </View>
                )}

              {goodsProps &&
                goodsProps.size > 0 &&
                goodsProps
                  .toJS()
                  .map((prop) =>
                    this._renderPropDetail(prop, goodsPropDetailRels)
                  )
                  .filter((li) => li != null)}
            </View>
          )}
        {descData !== ''
          ? tabKey == -1 && (
              <AutoHeightWebView
                enableBaseUrl={true}
                source={{ html: styleHtml + descData }}
                scalesPageToFit={false}
              />
            )
          : tabKey == -1 && (
              <WMEmpty
                emptyImg={require('../img/empty.png')}
                desc="商家暂未添加商品详情哦"
              />
            )}
        {tabKey != -1 &&
          storeGoodsTabContent.size > 0 && (
            <View style={styles.parameter}>
              <AutoHeightWebView
                enableBaseUrl={true}
                source={{
                  html:
                    styleHtml +
                    storeGoodsTabContent
                      .filter((v) => v.get('tabId') == tabKey)
                      .get(0)
                      .get('tabDetail')
                }}
                scalesPageToFit={false}
              />
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pullText: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    backgroundColor: '#fafafa'
  },
  lineBorder: {
    height: 0.5,
    backgroundColor: '#e1e1e1',
    width: screenWidth - 20
  },
  overText: {
    position: 'absolute',
    height: 30,
    left: 0,
    top: 0,
    zIndex: 1,
    width: screenWidth - 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 12,
    paddingVertical: 0,
    color: '#999999'
  },
  parameter: {
    marginHorizontal: 8,
    paddingTop: 6,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  title: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10
  },
  parameterDec: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingTop: 5,
    borderTopColor: '#ddd',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  left: {
    width: 72,
    minWidth: 72,
    color: '#999',
    fontSize: 12,
    lineHeight: 16
  },
  right: {
    marginLeft: 5,
    flex: 1,
    color: '#333',
    fontSize: 12,
    lineHeight: 16
  }
});
