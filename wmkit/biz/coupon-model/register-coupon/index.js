import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg } from 'plume2';
import { Const } from '../../../const';
import moment from 'moment';
import { screenWidth } from 'wmkit/styles/index';

export default class RegisterCoupon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示弹框
      visible: false,
      // 是否展示我的优惠券按钮
      isShowButton: false,
      //优惠券列表
      couponList: [],
      //活动标题
      title: '',
      //活动描述
      desc: ''
    };
  }

  UNSAFE_componentWillMount() {
    msg.on('registerCouponVisible', this.initModel);
  }

  componentWillUnmount() {
    msg.off('registerCouponVisible', this.initModel);
  }
  render() {
    const { visible, couponList, title, desc, isShowButton, isStoreModel } = this.state;
    return (
      visible && (
        <View style={styles.mask}>
          <View style={styles.content}>
            <ImageBackground style={styles.headerBox}
              source={isStoreModel ? require('../img/coupon-bg.png') : require('../img/coupon-bg-register.png')}>
              <Text style={styles.title} allowFontScaling={false}>
                {title}
              </Text>
              <Text style={styles.tips} allowFontScaling={false}>
                {desc}
              </Text>
            </ImageBackground>
            <View style={[styles.container, { backgroundColor: isStoreModel ? '#008DEB' : '#F53636' }]}>
              {couponList && (
                <ScrollView
                  contentContainerStyle={styles.couponList}
                  alwaysBounceHorizontal={false}
                >
                  {couponList.map((coupon) => {
                    return (
                      <View style={styles.item} key={coupon.couponId}>
                        <View style={styles.itemLeft}>
                          <Text
                            style={styles.price}
                            allowFontScaling={false} numberOfLines={1}
                          >
                            <Text allowFontScaling={false} style={styles.priceLabel}>￥</Text>
                            {coupon.denomination}
                          </Text>
                        </View>

                        <View style={styles.rightBox}>
                          <View style={styles.ruleBox}>
                            <Text style={styles.rules} allowFontScaling={false}>
                              {coupon.fullBuyType === 0
                                ? '无门槛'
                                : `满${coupon.fullBuyPrice}可用`}</Text>
                          </View>
                          <Text style={styles.time} allowFontScaling={false}>{this.showTime(coupon)}</Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              )
              }
            </View>
            {(isShowButton || isStoreModel) && (<TouchableOpacity activeOpacity={1} style={styles.bottom} onPress={() => {
              msg.emit('registerCouponVisible', { visible: false });
              msg.emit('router: goToNext', { routeName: 'MyCoupon' });
            }}>
              <ImageBackground style={styles.buttonBg}
                source={isStoreModel ? require('../img/button.png') : require('../img/button-register.png')}>
                <Text style={styles.bottomBtn} allowFontScaling={false}>
                  立即查看
                </Text>
              </ImageBackground>
            </TouchableOpacity>)}
            <TouchableOpacity
              style={styles.close}
              activeOpacity={0.8}
              onPress={() => {
                msg.emit('registerCouponVisible', { visible: false });
              }}
            >
              <Image
                style={styles.closeImg}
                source={require('../img/close.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      )
    );
  }

  //初始化弹框
  initModel = (params) => {
    const { couponList, title, desc, isShowButton, visible, isStoreModel } = params;
    if (visible) {
      let newArray = [];
      for(let j = 0; j< couponList.length; j ++){
          for (let i = 0; i < couponList[j].totalCount; i++) {
             newArray.push(couponList[j]);
          }
        }
      this.setState({ couponList:newArray, title, desc, isShowButton, isStoreModel, visible: true });
    } else {
      this.setState({ visible: visible });
    }
  };

  //关闭弹框
  close = () => {
    this.setState({ visible: false });
  };

  //展示时间
  showTime(coupon) {
    if (coupon.rangeDayType == 0) {
      return (
        moment(coupon.startTime).format(Const.DATE_FORMAT) +
        ' 至 ' +
        moment(coupon.endTime).format(Const.DATE_FORMAT)
      );
    } else {
      return (
        moment().format(Const.DATE_FORMAT) +
        ' 至 ' +
        moment()
          .add('days', coupon.effectiveDays)
          .format(Const.DATE_FORMAT)
      );
    }
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: 10,
    height: 230,
  },
  content: {
    width: screenWidth * 0.9,
    marginTop: 40
  },
  headerBox: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9 * 0.34286,
    alignItems: 'center',
    paddingTop: 28
  },
  price: {
    color: '#F51B1B',
    fontSize: 22,
    fontWeight: '700'
  },
  symbol: {
    fontSize: 16
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  },
  tips: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff'
  },
  couponList: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 3,
    paddingVertical: 14,
    height: 68,
    alignItems: 'center'
  },
  itemLeft: {
    width: 80,
    alignItems: 'center',
    borderRightColor: '#EBEBEB',
    borderRightWidth: 1,
    height: 40,
    justifyContent: 'center'
  },
  rightBox: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  rules: {
    color: '#333',
    fontSize: 14
  },
  time: {
    marginTop: 6,
    color: '#A3A3A3',
    fontSize: 12
  },
  box: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  btn: {
    backgroundColor: '#000'
  },
  close: {
    position: 'absolute',
    top: -60,
    right: 0
  },
  closeImg: {
    width: 43,
    height: 43
  },
  priceLabel: {
    fontSize: 14
  },
  bottomBtn: {
    color: '#F51B1B',
    fontSize: 14
  },
  buttonBg: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9 * 0.2143,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ruleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});
