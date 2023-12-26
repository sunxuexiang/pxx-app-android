import React from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { fromJS, is, List, Map } from 'immutable';
import * as WMkit from 'wmkit/kit';
import NumInput from 'wmkit/num-input';
import WMImage from 'wmkit/image/index';

import {
  calculateSpeInfo,
  changeNum,
  changeSpecDetail,
  createImmutableData,
  returnStockFlag,
  exchange
} from './state-change';
import {
  isIOS,
  mainColor,
  priceColor,
  screenHeight,
  screenWidth
} from 'wmkit/styles/index';
import * as _ from '../../common/util';
import { msg } from 'plume2';

/**
 *  积分商品-规格选择弹框
 */
export default class WMPointsChoose extends React.PureComponent {
  static defaultProps = {
    data: {},
    visible: false,
    changeSpecVisible: () => { },
    dataCallBack: () => { }
  };

  constructor(props) {
    super(props);
    this.keyboardDidShowListener = null;
    this.keyboardDidHideListener = null;
    this.state = {
      KeyboardShown: false
    };
  }

  UNSAFE_componentWillMount() {
    //监听键盘弹出事件
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShowHandler.bind(this)
    );
    //监听键盘隐藏事件
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHideHandler.bind(this)
    );
  }

  componentWillUnmount() {
    //卸载键盘弹出事件监听
    if (this.keyboardDidShowListener != null) {
      this.keyboardDidShowListener.remove();
    }
    //卸载键盘隐藏事件监听
    if (this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const goods = nextProps.data || {};
    const thisGoods = this.props.data || {};
    if (
      !is(fromJS(goods), fromJS(thisGoods)) &&
      (nextProps.data && nextProps.data.skuId && nextProps.data.pointsGoodsId)
    ) {
      // 组装层级结构的规格数据
      const dataIm = createImmutableData(nextProps.data);
      // 主要是计算每个规格值是否灰化不可点击, 以及计算得出当前的sku
      this.setState({
        ...dataIm,
        ...calculateSpeInfo(dataIm)
      });
    }
  }

  //键盘弹出事件响应
  keyboardDidShowHandler() {
    this.setState({ KeyboardShown: true });
  }

  //键盘隐藏事件响应
  keyboardDidHideHandler() {
    this.setState({ KeyboardShown: false });
  }

  render() {
    const { visible, changeSpecVisible } = this.props;
    const {
      goods = Map(),
      goodsInfo = Map(),
      pointsGoods = Map(),
      goodsInfoCache = Map(), //缓存之前选择的sku,防止用户取消选中规格时,无信息展示的问题
      goodsSpecs = List()
    } = this.state;
    let noSpecStockFlag = returnStockFlag(pointsGoods.get('stock'));
    let goodsStock = pointsGoods.get('stock') || 0;

    // 划线价
    const lineShowPrice = this._originPriceInfo(
      goods.get('linePrice'),
      goodsInfo,
      goodsInfoCache
    );

    return (
      <View
        style={[
          styles.panelBottom,
          (!visible || !goods) && { width : 0, height : 0 }
        ]}
      >
      {
        (visible && goods) && (
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={0.8}
            onPress={() => {
              changeSpecVisible(false);
              Keyboard.dismiss();
            }}
          />
        )
      }
        <View style={styles.panelBody}>
          {/*弹窗关闭按钮*/}
          <TouchableOpacity
            style={styles.closeBox}
            activeOpacity={0.8}
            onPress={() => {
              changeSpecVisible(false);
              Keyboard.dismiss();
            }}
          >
            <Image style={styles.close} source={require('../img/close.png')} />
          </TouchableOpacity>

          {/*sku图文信息*/}
          <View style={styles.topBox}>
            <WMImage
              style={styles.img}
              src={goodsInfoCache ? `${goodsInfoCache.get('goodsInfoImg')}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_120,h_120` : null}
            />
            <View style={styles.titleBox}>
              <Text
                style={styles.title}
                allowFontScaling={false}
                numberOfLines={2}
              >
                {goods ? goods.get('goodsName') : ' '}
              </Text>
              <Text
                style={styles.subTitle}
                allowFontScaling={false}
                numberOfLines={1}
              >
                {goods ? goods.get('goodsSubtitle') : ' '}
              </Text>
              {/*价格*/}
              <Text style={[styles.price, { color: priceColor }]} allowFontScaling={false}>
                {pointsGoods ? pointsGoods.get('points') : ''}
                积分
              </Text>
              <Text allowFontScaling={false} style={styles.orPrice}>
                市场价¥
                {_.addZero(goodsInfo.get('marketPrice'))}
              </Text>
            </View>
          </View>

          {/*sku中间滚动区域*/}
          <ScrollView
            style={[
              styles.content,
              isIOS && this.state.KeyboardShown && styles.contentKeyboard
            ]}
            alwaysBounceVertical={false}
          >
            {/*sku选择规格*/}
            {goodsSpecs &&
              goodsSpecs.size > 0 &&
              goodsSpecs.toJS().map((spec, index) => {
                return (
                  <View style={styles.specBox} key={spec.specId}>
                    <Text style={styles.specTitle} allowFontScaling={false}>
                      {spec.specName}
                    </Text>
                    <ScrollView
                      horizontal={true}
                      alwaysBounceHorizontal={false}
                      contentContainerStyle={styles.rowFlex}
                    >
                      {spec.specDetails.map((det) => {
                        return (
                          <TouchableOpacity
                            key={det.specDetailId}
                            style={[
                              styles.specItem,
                              spec.defaultVal === det.specDetailId
                                ? { borderColor: mainColor }
                                : det.disabled
                                  ? styles.invalidItem
                                  : {}
                            ]}
                            onPress={
                              spec.defaultVal !== det.specDetailId &&
                                det.disabled
                                ? () => { }
                                : () => {
                                  this._changeSpecDetail(
                                    spec.defaultVal === det.specDetailId
                                      ? null
                                      : det.specDetailId,
                                    index
                                  );
                                }
                            }
                            activeOpacity={0.8}
                          >
                            <Text
                              style={[
                                styles.specText,
                                spec.defaultVal === det.specDetailId
                                  ? { color: mainColor }
                                  : det.disabled
                                    ? styles.invalidText
                                    : {}
                              ]}
                              allowFontScaling={false}
                            >
                              {det.detailName}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                );
              })}

            {/*sku选择数量*/}
            <View style={styles.skuItem}>
              <View style={styles.skuBottom}>
                <Text style={styles.normalText} allowFontScaling={false}>
                  数量
                </Text>
                <View style={styles.retailNum}>
                  <Text style={styles.otherText} allowFontScaling={false}>
                    库存 {goodsStock}
                    {goods.get('goodsUnit')}
                    &nbsp;&nbsp;
                  </Text>

                  <NumInput
                    disableNumberInput={noSpecStockFlag}
                    value={noSpecStockFlag ? 0 : pointsGoods.get('num')}
                    max={goodsStock}
                    onDelayChange={(value) =>
                      this._changeNum(
                        value,
                        goodsStock,
                        pointsGoods.get('pointsGoodsId')
                      )
                    }
                    min={1}
                    error={goodsInfo.get('error')}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          {/*sku底部立即兑换*/}

          <View style={styles.bottom}>
            <Text style={styles.normalText} allowFontScaling={false}>
              已选
              {pointsGoods.get('num') || 0}
              {goods.get('goodsUnit')}
            </Text>
            <TouchableOpacity
              onPress={() => pointsGoods.get('num') && this._exchange()}
              style={[
                styles.buttonBox,
                { backgroundColor: mainColor },
                !pointsGoods.get('num') && styles.disabledBtn
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.button,
                  !pointsGoods.get('num') && styles.disabledText
                ]}
                allowFontSacling={false}
              >
                立即兑换
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 获取是否展示划线价,以及划线价
   *   a.若划线价存在,则展示
   *   b.若划线价不存在
   *     b.1.登录前,不展示
   *     b.2.登陆后,展示sku市场价
   * @private
   */
  _originPriceInfo = (linePrice, goodsInfoIm, goodsInfoCache) => {
    if (linePrice) {
      return linePrice;
    } else {
      /*if (WMkit.isLoginOrNotOpen()) {
        return (
          goodsInfoIm.get('marketPrice') || goodsInfoCache.get('marketPrice')
        );
      } else {
        return null;
      }*/
      return null;
    }
  };

  /**
   * 切换选中前n-1个规格项的规格值
   * @param specDetailId
   * @param index
   * @private
   */
  _changeSpecDetail = (specDetailId, index) => {
    this.setState(changeSpecDetail(this.state, specDetailId, index), () => {
      if (this.props.dataCallBack) {
        this.props.dataCallBack(this.state.goodsInfo, this.state.pointsGoods);
      }
    });
  };

  /**
   * 用户改变sku购买数量
   * @param num 数量
   * @param stock 库存
   * @param goodsInfoId sku标识
   * @private
   */
  _changeNum = (savedNum, stock, pointsGoodsId) => {
    savedNum = stock > 0 ? (savedNum < stock ? savedNum : stock) : 0;
    this.setState(changeNum(this.state, { num: savedNum, pointsGoodsId }));
  };

  /**
   * 立即兑换
   * @private
   */
  _exchange = async () => {
    if (WMkit.isLoginOrNotOpen()) {
      await exchange(this.state);
    } else {
      msg.emit('loginModal:toggleVisible', {
        callBack:
          async () => {
            msg.emit('router: refresh');
            await exchange(this.state);
          }
      });
    }
  };
}

const styles = StyleSheet.create({
  panelBottom: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: -1,
    left: 0,
    flex: 1,
    zIndex: 1000
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: screenHeight
  },
  panelBody: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
    maxHeight: screenHeight * 0.8,
    paddingTop: 49,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  closeBox: {
    position: 'absolute',
    top: 14,
    right: 17,
    zIndex: 100
  },
  close: {
    width: 20,
    height: 20
  },
  topBox: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 10,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  img: {
    width: 96,
    height: 96
  },
  titleBox: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    marginBottom: 6
  },
  subTitle: {
    color: '#898989',
    fontSize: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: '500'
  },
  orPrice: {
    fontSize: 13,
    color: '#999'
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    paddingLeft: 10,
    flex: 1,
    ..._.ifIphoneX(
      {
        marginBottom: 75
      },
      {
        marginBottom: 45
      }
    )
  },
  contentKeyboard: {
    ..._.ifIphoneX(
      {
        marginBottom: 295
      },
      {
        marginBottom: 245
      }
    )
  },
  specBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  specTitle: {
    color: '#333',
    fontSize: 14,
    marginRight: 10
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  specText: {
    color: '#333',
    fontSize: 12
  },
  specItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#ebebeb',
    borderWidth: 1,
    marginRight: 10
  },
  invalidItem: {
    backgroundColor: '#ebebeb'
  },
  invalidText: {
    color: '#999'
  },
  skuItem: {
    paddingRight: 10,
    paddingBottom: 20,
    paddingTop: 20
  },
  otherText: {
    color: '#999',
    fontSize: 10,
    paddingRight:30
  },
  skuBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  retailNum: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  normalText: {
    fontSize: 14,
    color: '#333'
  },
  bottom: {
    position: 'absolute',
    width: screenWidth,
    ..._.ifIphoneX(
      {
        height: 75,
        paddingBottom: 30
      },
      {
        height: 45
      }
    ),
    paddingLeft: 10,
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb'
  },
  socialBottom: {
    justifyContent: 'flex-end'
  },
  buttonBox: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  button: {
    color: '#fff',
    fontSize: 14
  },
  // disabledBtn: {
  //   backgroundColor: '#ebebeb'
  // },
  // disabledText: {
  //   color: '#999'
  // },
  commission: {
    color: '#333',
    fontSize: 12
  }
});
