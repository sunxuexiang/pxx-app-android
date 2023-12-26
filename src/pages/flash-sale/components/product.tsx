import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import actions from '../actions';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import WMImage from 'wmkit/image/index';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';
import { Const } from 'wmkit/const';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import { msg } from 'plume2';
import * as _ from '../../../../wmkit/common/util';
import LinearGradient from 'react-native-linear-gradient';
import Price from 'wmkit/price';
@connect(store2Props, actions)
export default class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;
    const activityDate = main.activityDate;
    const activityTime = main.activityTime;
    const cateId = main.cateId;

    return (
      <View>
        <WmListView
          url="/flashsale/goodsList"
          params={{
            activityDate,
            activityTime,
            cateId
          }}
          renderRow={this._infoGoodsRow}
          isPagination={false}
          dataPropsName={'context.flashSaleGoodsVOPage.content'}
          noMoreStyle={{backgroundColor:'f5f5f5'}}
          renderEmpty={() => (
            <WMEmpty
              imgStyle={{width:104,height:104}}
              emptyImg={require('../img/list-none.png')}
              desc="该时段暂无商品"
            />
          )}
        />
      </View>
    );
  }

  /**
   * 秒杀商品信息
   */
  _infoGoodsRow = (flashSaleGoods) => {
    let { main } = this.props;
    const { activityStatus } = main;
    let name = '去抢购';
    let isOver = false;
    let isOvershowProgress = false; //已抢完展示进度条
    if (activityStatus == '已结束') {
      name = '已结束';
      isOver = true;
    } else if (activityStatus == '即将开始' || activityStatus == '次日预告') {
      name = '即将开始';
    } else if (flashSaleGoods.stock <= 0) {
      name = '已抢完';
      isOver = true;
      isOvershowProgress = true;
    }

    let rate = (
      (flashSaleGoods.salesVolume /
        (flashSaleGoods.stock + flashSaleGoods.salesVolume)) *
      100
    ).toFixed(0) as any;
    if (isOvershowProgress) rate = (100).toFixed(0) as any; //已抢完展示进度条
    const processShortWidth = `${rate}%`;
    return (
      <TouchableOpacity
        onPress={() => {
          // 跳商品详情路由
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: flashSaleGoods.goodsInfo.goodsInfoId,
            type: Const.GOODS_DETAIL_TYPE.FLASHGOODS
          });
        }}
      >
        <View style={styles.item}>
          <View>
            <WMImage
              style={[styles.leftImg]}
              src={flashSaleGoods.goodsInfo.goodsInfoImg}
              width={96}
              height={96}
            />
          </View>
          <View style={styles.rightView}>
            <Text
              allowFontScaling={false}
              numberOfLines={2}
              style={styles.titleStyle}
            >
              {flashSaleGoods.goodsInfo.goodsInfoName}
            </Text>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={styles.specStyle}
            >
              {flashSaleGoods.specText || flashSaleGoods.goodsInfo.specText}
            </Text>

            <View style={styles.row}>
              <Price
                price={flashSaleGoods.price}
                linePrice={flashSaleGoods.goods.linePrice ? flashSaleGoods.goods.linePrice : flashSaleGoods.goodsInfo.marketPrice}
                bigPriceStyle={{fontSize: 16}}
              />
                <TouchableOpacity
                  style={{ flexDirection:'row' }}
                  activeOpacity={0.5}
                  onPress={() => {
                    // 跳商品详情路由
                    msg.emit('router: goToNext', {
                      routeName: 'GoodsDetail',
                      skuId: flashSaleGoods.goodsInfo.goodsInfoId,
                      type: Const.GOODS_DETAIL_TYPE.FLASHGOODS
                    });
                  }}
                >
                  {isOver ?
                    <LinearGradient
                      colors={['#e0e0e0', '#b3b3b3']}
                      style={styles.btnType}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                    >
                      <Text allowFontScaling={false} style={{ color: '#fff',fontSize:12 }}>{name}</Text>
                    </LinearGradient>
                    :
                    <LinearGradient
                      colors={[mainColor, mainColor]}
                      style={styles.btnType}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                    >
                      <Text allowFontScaling={false} style={{ color: '#fff',fontSize:12 }}>{name}</Text>
                      {/*进度条*/}
                      {(!isOver || isOvershowProgress) && (
                        <View style={styles.processStyle}>
                          {/*通过styles.processShort.width的方法动态改变width的值*/}
                          <View style={{  }}>
                            <View style={styles.processLong}>
                              <View
                                style={[styles.processShort, { width: processShortWidth }]}
                              />
                            </View>
                          </View>
                          <View style={{ marginTop: 2 }}>
                            <Text
                              allowFontScaling={false}
                              style={{ color: '#fff', fontSize: 8 }}
                            >
                              {flashSaleGoods.stock + flashSaleGoods.salesVolume
                                ? rate
                                : 100}
                              %
                            </Text>
                          </View>
                        </View>
                      )}
                    </LinearGradient>
                }
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor:'#fff',
    borderRadius:8,
    width:screenWidth - 24,
    marginBottom:12
  },
  leftImg: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 96,
    height: 96
  },
  goodTypeOne: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    width: 120,
    height: 25,
    lineHeight: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: '#fff',
    alignSelf: 'flex-end',
    textAlign: 'center'
  },
  goodTypeTwo: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
    top: 20,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 40,
    textAlign: 'center'
  },
  goodTypeThree: {},
  rightView: {
    flexDirection: 'column',
    paddingLeft: 15,
    flex:1
  },
  titleStyle: {
    flex:1,
    color: '#333',
    fontSize:12,
    maxHeight:36
  },
  btnType: {
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 36,
    borderRadius: 6
  },
  processStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 10
  },
  processLong: {
    marginTop: 6,
    marginRight:4,
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    position:'relative'
  },
  processShort: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    position:'absolute',
    left:0,
    top:0
  },
  specStyle: {
    fontSize: 12,
    color: '#999'
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flex:1
  },
});
