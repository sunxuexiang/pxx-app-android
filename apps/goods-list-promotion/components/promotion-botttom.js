import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { msg, Relax } from 'plume2';
import * as _ from '../../../wmkit/common/util'; // added by scx
import { screenWidth, mainColor } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
/**
 * 促销凑单底部
 */
@Relax
export default class PromotionBottom extends React.Component {
  static relaxProps = {
    calc1: 'calc',
    marketing: 'marketing'
  };

  render() {
    const { calc1, marketing } = this.props.relaxProps;
    if (calc1.isEmpty()) {
      return null;
    }
    const calc = calc1.toJS();
    let lackDesc = '';
    const { subType } = marketing;
    if (subType === 0 || subType === 2 || subType === 4) {
      lackDesc = '¥' + (calc.lack ? calc.lack : 0);
    } else if (subType === 1 || subType === 3 || subType === 5 || subType === 6 || subType === 7) {
      lackDesc = (calc.lack ? calc.lack : 0) + '件';
    }

    let desc = '';
    if (marketing.marketingType === 0) {
      desc = '可减¥' + calc.discount;
    } else if (marketing.marketingType === 1) {
      desc = '可享' + _.mul(calc.discount || 0, 10) + '折';
    } else if (marketing.marketingType === 2) {
      desc = '可获赠品';
    }else if (marketing.marketingType === 3) {
      desc = `已减${calc.discount}元`;
    }
    return (
      <View style={styles.proTotal}>
        <View style={styles.info}>
          <Text style={styles.criteria} allowFontSacling={false}>
            已选
            <Text style={[styles.txt, { color: mainColor }]}>
              {calc.goodsInfoList
                ? calc.goodsInfoList.filter((goodsInfo) => goodsInfo.buyCount)
                    .length
                : 0}
            </Text>
            种<Text style={[styles.txt, { color: mainColor }]}>{calc.totalCount}</Text>
            件&nbsp;商品总价
            <Text allowFontScaling={false} style={[styles.price, { color: mainColor }]}>
              &nbsp;&yen;
              {calc.totalAmount || 0}
            </Text>
          </Text>
          {calc.lack === 0 ? (
            <View style={styles.bottom}>
              <Image style={[styles.tipIcon, { tintColor: mainColor }]} source={require('wmkit/theme/dh.png')} />
              <Text style={styles.criText} allowFontSacling={false}>
                满足条件&nbsp;
                {desc}
              </Text>
            </View>
          ) : (
            <View style={styles.bottom}>
              <Image
                style={[styles.tipIcon, { tintColor: mainColor }]}
                source={require('../img/warning.png')}
              />
              <Text style={styles.criText} allowFontSacling={false}>
                未满足条件&nbsp;还差
                <Text style={[styles.txt, { color: mainColor }]}>{lackDesc}</Text>
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            // msg.emit('router: back')
            msg.emit('router: goToNext', { routeName: 'PurchaseOrder' })
          }
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[mainColor, mainColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.buttonBox, { backgroundColor: mainColor }]}
          >
            <Text style={styles.button} allowFontSacling={false}>
              去购物车
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  proTotal: {
    position: 'absolute',
    width: screenWidth,
    ..._.ifIphoneX(
      {
        paddingBottom: 30,
        height: 76
      },
      {
        height: 56
      }
    ),
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb'
  },
  btnBox2: {
    marginLeft: 5,
    height: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  info: {
    paddingLeft: 10
  },
  criteria: {
    fontSize: 12,
    color: '#999'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  txt: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  criText: {
    fontSize: 10,
    color: '#999'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tipIcon: {
    width: 10,
    height: 10,
    marginRight: 4
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginRight: 5,
    borderRadius: 18
  },
  button: {
    color: '#fff',
    fontSize: 14
  }
});
