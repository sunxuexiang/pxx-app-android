import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native';
import { mainColor } from 'wmkit/styles/index';
import { Relax, msg } from 'plume2';
import WMEmpty from 'wmkit/empty';
import * as Button from 'wmkit/button';
import * as _ from 'wmkit/common/util';
import Check from 'wmkit/check';
import { config } from 'wmkit/config';
const LongButton = Button.LongButton;
@Relax
export default class CouponList extends React.Component {
  static relaxProps = {
    tabKey: 'tabKey',
    enableCoupons: 'enableCoupons',
    disableCoupons: 'disableCoupons',
    enableCount: 'enableCount',
    disableCount: 'disableCount',
    onChooseCoupon: Function,
    onSubmit: Function
  };

  render() {
    const {
      tabKey,
      enableCoupons,
      disableCoupons,
      enableCount,
      disableCount,
      onSubmit
    } = this.props.relaxProps;

    return tabKey == 0 ? (
      enableCount != 0 ? (
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            {enableCoupons.get('stores').map((store) => (
              <View key={store.get('storeId')} style={styles.list}>
                <View style={styles.listTitle}>
                  <Text allowFontScaling={false} style={styles.titleText}>
                    {`${store.get('storeName')}(${store.get('coupons').size})`}
                  </Text>
                </View>
                {store.get('coupons').map((coupon) => {
                  return this.renderItem(coupon);
                })}
              </View>
            ))}

            {enableCoupons.get('commonCoupons').size > 0 && (
              <View style={styles.list}>
                <View style={styles.listTitle}>
                  <Text allowFontScaling={false} style={styles.titleText}>
                    通用券(
                    {enableCoupons.get('commonCoupons').size})
                  </Text>
                </View>
                {enableCoupons.get('commonCoupons').map((coupon) => {
                  return this.renderItem(coupon);
                })}
              </View>
            )}
          </ScrollView>

          <LongButton
            btnStyle={[styles.btn, { backgroundColor: mainColor }]}
            text="确定"
            onClick={() => onSubmit()}
          />
        </View>
      ) : (
        <ScrollView>
          <WMEmpty
            emptyImg={require('../img/empty.png')}
            desc="啊哦，什么券都没有~"
          />
        </ScrollView>
      )
    ) : disableCount != 0 ? (
      <ScrollView style={styles.container}>
        {disableCoupons.get('unReachPrice').size > 0 && (
          <View style={styles.list}>
            <View style={styles.listTitle}>
              <Text allowFontScaling={false} style={styles.titleText}>
                未达到使用门槛(
                {disableCoupons.get('unReachPrice').size})
              </Text>
            </View>
            {disableCoupons
              .get('unReachPrice')
              .map((coupon) => this.renderDisableItem(coupon))}
          </View>
        )}
        {disableCoupons.get('noAvailableSku').size > 0 && (
          <View style={styles.list}>
            <View style={styles.listTitle}>
              <Text allowFontScaling={false} style={styles.titleText}>
                本单商品不可使用(
                {disableCoupons.get('noAvailableSku').size})
              </Text>
            </View>
            {disableCoupons
              .get('noAvailableSku')
              .map((coupon) => this.renderDisableItem(coupon))}
          </View>
        )}
        {disableCoupons.get('unReachTime').size > 0 && (
          <View style={styles.list}>
            <View style={styles.listTitle}>
              <Text allowFontScaling={false} style={styles.titleText}>
                未达到使用时间(
                {disableCoupons.get('unReachTime').size})
              </Text>
            </View>
            {disableCoupons
              .get('unReachTime')
              .map((coupon) => this.renderDisableItem(coupon))}
          </View>
        )}
      </ScrollView>
    ) : (
      <ScrollView>
        <WMEmpty
          imgStyle={{ width: 104, height: 104 }}
          tipStyle={{ color: '#999', fontSize: 14 }}
          emptyImg={require('../img/empty.png')}
          desc="啊哦，什么券都没有~"
        />
      </ScrollView>
    );
  }
  renderItem = (coupon) => {
    const { onChooseCoupon } = this.props.relaxProps;
    const flag = coupon.get('platformFlag');
    return (
      <TouchableOpacity
        key={coupon.get('couponCodeId')}
        activeOpacity={0.8}
        style={styles.item}
        onPress={() => {
          onChooseCoupon(
            !coupon.get('chosen'),
            coupon.get('couponCodeId'),
            coupon.get('storeId')
          );
        }}
      >
        <View
          style={[styles.bg, { borderLeftColor: mainColor }]}
        >
          <Text allowFontScaling={false} style={[styles.price, { color: mainColor }]} numberOfLines={1}>
            <Text allowFontScaling={false} style={styles.symbol}>
              ¥
            </Text>
            {coupon.get('denomination')}
          </Text>
          <Text allowFontScaling={false} style={styles.tip} numberOfLines={1}>
            {coupon.get('fullBuyType') == 0
              ? '无门槛'
              : `满${coupon.get('fullBuyPrice')}可用`}
          </Text>
          {coupon.get('nearOverdue') && (
            <Image
              source={require('../img/expiring.png')}
              style={styles.expiringImg}
            />
          )}
        </View>
        <View style={styles.rightBox}>
          <View style={styles.getLeft}>
            <View style={styles.topBox}>
              <ImageBackground
                style={styles.labelBox}
                source={{uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}}
              >
                <Text allowFontScaling={false} style={styles.labelText}>
                  {flag ? '通用券' : '店铺券'}
                </Text>
              </ImageBackground>
              <Text
                allowFontScaling={false}
                style={[styles.text, { flex: 1 }]}
                numberOfLines={1}
              >
                {flag ? '全平台可用' : `仅${coupon.get('storeName')}可用`}
              </Text>
            </View>
            <View style={styles.rangeBox}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={[
                  styles.rangeText,
                  {flex: 1}
                ]}
              >
                {coupon.get('prompt')}
              </Text>
            </View>
            <View style={styles.bottomBox}>
              <Text
                allowFontScaling={false}
                style={styles.rangeText}
                numberOfLines={1}
              >
                {`${_.formatDay(coupon.get('startTime'))}至${_.formatDay(
                  coupon.get('endTime')
                )}`}
              </Text>
            </View>
          </View>
          <Check
            checked={coupon.get('chosen')}
            onCheck={() => {
              onChooseCoupon(
                !coupon.get('chosen'),
                coupon.get('couponCodeId'),
                coupon.get('storeId')
              );
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderDisableItem = (coupon) => {
    const flag = coupon.get('platformFlag');
    return (
      <TouchableOpacity
        key={coupon.get('couponCodeId')}
        activeOpacity={0.8}
        style={styles.item}
      >
        <View style={[styles.bg, { borderLeftColor: mainColor }]}>
          <Text allowFontScaling={false} style={[styles.price, { color: mainColor }]} numberOfLines={1}>
            <Text allowFontScaling={false} style={styles.symbol}>
              ¥
            </Text>
            {coupon.get('denomination')}
          </Text>
          <Text allowFontScaling={false} style={styles.tip} numberOfLines={1}>
            {coupon.get('fullBuyType') == 0
              ? '无门槛'
              : `满${coupon.get('fullBuyPrice')}可用`}
          </Text>
          {coupon.get('nearOverdue') && (
            <Image
              source={require('../img/expiring.png')}
              style={styles.expiringImg}
            />
          )}
        </View>
        <View style={styles.rightBox}>
          <View style={styles.getConpon}>
            <View style={styles.getLeft}>
              <View style={styles.topBox}>
                <ImageBackground
                  style={styles.labelBox}
                  source={{uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}}
                >
                  <Text allowFontScaling={false} style={styles.labelText}>
                    {flag ? '通用券' : '店铺券'}
                  </Text>
                </ImageBackground>
                <Text
                  allowFontScaling={false}
                  style={[styles.text, { flex: 1 }]}
                  numberOfLines={1}
                >
                  {flag ? '全平台可用' : `仅${coupon.get('storeName')}可用`}
                </Text>
              </View>
              <View style={styles.rangeBox}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  style={[
                    styles.rangeText,
                    {flex: 1}
                  ]}
                >
                  {coupon.get('prompt')}
                </Text>
              </View>
              <View style={styles.bottomBox}>
                <Text
                  allowFontScaling={false}
                  style={styles.rangeText}
                  numberOfLines={1}
                >
                  {`${_.formatDay(coupon.get('startTime'))}至${_.formatDay(
                    coupon.get('endTime')
                  )}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13
  },
  list: {},
  item: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 12
  },
  bg: {
    width: 88,
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderLeftWidth: 2 / PixelRatio.get(),
    position: 'relative',
    overflow: 'hidden'
  },
  rightBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: { width: 5, height: 3 },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingLeft: 10,
    paddingRight: 14,
    paddingVertical: 15,
    height: 92,
    backgroundColor: '#fff',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    overflow: 'hidden'
  },
  price: {
    fontSize: 24,
    fontWeight: '500'
  },
  symbol: {
    fontSize: 10
  },
  tip: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  labelBox: {
    width: 38,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  labelText: {
    color: '#fff',
    fontSize: 10
  },
  text: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  help: {
    width: 15,
    height: 15
  },
  topLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  rangeText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)'
  },
  rangeBox: {
    flexDirection: 'row',
    marginTop: 15,
    height: 12,
    alignItems: 'center'
  },
  bottomBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20
  },
  bottomBtn: {
    width: 56,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  },
  invalidBox: {
    flexDirection: 'row'
  },
  invalidLeft: {
    flex: 1
  },
  grayBg: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  invalidText: {
    fontSize: 10,
    color: '#999'
  },
  expiringImg: {
    width: 71,
    height: 41,
    position: 'absolute',
    top: 0,
    left: 0
  },
  listTitle: {
    height: 42,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 13,
    color: '#333'
  },
  checkImg: {
    width: 38,
    height: 38,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  grayColor: {
    color: '#999'
  },
  getConpon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  getLeft: {
    flex: 1
  },
  btn: {
    borderRadius: 45
  }
});
