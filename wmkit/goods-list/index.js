'use strict';
import React, { Component } from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as WMkit from 'wmkit/kit';
import * as _ from 'wmkit/common/util';
import WMImage from 'wmkit/image/index';
import Price from '../biz/cartprice';
import { mainColor } from 'wmkit/styles/index';

const IS_ACCOUNT_STATUS = {
  0: '待入账',
  1: '已入账',
  2: '入账失败'
};
export default class SkuList extends Component {
  render() {
    const {
      // 是否自营
      isSelf,
      // 商品清单
      skus,
      // 是否不显示价格（发货商品清单不显示价格）
      hidePrice,
      // 是否显示返利
      rebate = false,
      // 返利图标字样(0:赚 1:返)
      commissionStrType = 0,
      // 是否显示返利图标
      showCommissionStr = true,
      // 是否是抢购商品
      isFlashSale
    } = this.props;

    return (
      <View style={styles.container}>
        {skus && skus.count() > 0
          ? skus.toJS().map((sku) => {
              const {
                isAccountStatus,
                distributionGoodsAudit,
                pointsGoodsId,
                points,
                buyPoint
              } = sku;
              let commissionFlag = false;
              if (WMkit.isDistributorLogin() && distributionGoodsAudit == 2) {
                // 小b登录时，分销商品显示返利
                commissionFlag = true;
              }
              return (
                <TouchableOpacity
                  key={sku.id}
                  activeOpacity={0.6}
                  disabled={true}
                  style={styles.item}
                >
                  <View>
                    <WMImage style={styles.img} src={sku.img&&`${sku.img}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_100,h_100`} />
                  </View>
                  <View style={styles.content}>
                    <View style={styles.between}>
                      <View style={styles.betweenLeft}>
                        <Text
                          style={styles.title}
                          allowFontSacling={false}
                          numberOfLines={2}
                        >
                          {sku.name}
                        </Text>
                      </View>
                      {(isAccountStatus || isAccountStatus == 0) && (
                        <View style={styles.betweenRight}>
                          <Text
                            allowFontScaling={false}
                            style={styles.accountStatus}
                          >
                            {IS_ACCOUNT_STATUS[isAccountStatus]}
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text
                      style={styles.gec}
                      allowFontSacling={false}
                      numberOfLines={1}
                    >
                      {sku.spec ? sku.spec : ''}
                    </Text>

                    <View style={styles.selfCommission}>
                      {/* {isSelf ? <SelfSalesLabel /> : <View />} */}
                      {commissionFlag &&
                        !isFlashSale &&
                        rebate && (
                          <View style={styles.rebate}>
                            <View style={[styles.rebateBg, { backgroundColor: mainColor }]}>
                              <Text
                                style={styles.rebateBgText}
                                allowFontScaling={false}
                              >
                                {showCommissionStr && commissionStrType == 0
                                  ? '赚'
                                  : '返'}
                              </Text>
                            </View>
                            <Text
                              allowFontScaling={false}
                              style={styles.rebateText}
                            >
                              ￥{_.addZero(sku.distributionCommission)}
                            </Text>
                          </View>
                        )}
                    </View>

                    <View style={styles.row}>
                      <Price
                        buyPoint={buyPoint}
                        price={`${_.addZero(sku.price)}`}
                      />
                      {/* <Text allowFontSacling={false} style={styles.price}>
                        {pointsGoodsId
                          ? `${points}积分`
                          : buyPoint > 0 && !hidePrice
                            ? `${buyPoint}积分+¥ ${_.addZero(sku.price)}`
                            : `¥ ${_.addZero(sku.price)}`}
                      </Text> */}
                      <Text allowFontSacling={false} style={styles.grey}>
                        ×{sku.num} {sku.unit ? sku.unit : ''}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: screenWidth,
    backgroundColor: '#fff',
    margin: 12,
    padding: 12,
    paddingTop: 16,
    paddingBottom: 0,
    borderRadius: 6,
    overflow: 'hidden'
  },
  img: {
    width: 80,
    height: 80
  },
  item: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 12,
    height: 80
  },
  between: {
    flexDirection: 'row',
    marginBottom: 4
  },
  betweenLeft: {
    flex: 1
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    lineHeight: 16
  },
  betweenRight: {
    marginLeft: 4
  },
  accountStatus: {
    fontSize: 10,
    color: '#333',
    textAlign: 'right'
  },
  gec: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 10
  },
  icon: {
    width: 10,
    height: 10
  },
  navItem: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderRadius: 11,
    backgroundColor: '#fff',
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    height: 22,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  price: {
    fontSize: 15,
    color: '#cb4255',
    flex: 1
  },
  blueText: {
    color: '#3d85cc',
    fontSize: 14,
    backgroundColor: '#cb4255'
  },
  grey: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.8)'
  },
  rebateBg: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rebateBgText: {
    fontSize: 8,
    color: '#fff'
  },
  rebate: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rebateText: {
    color: '#000',
    fontSize: 13
  },
  selfCommission: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
