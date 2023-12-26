import React from 'react';
import { msg } from 'plume2';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { mainColor, priceColor, screenWidth } from 'wmkit/styles/index';
/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status, payState) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      return '待支付';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待发货';
    }
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }
};

//状态文字颜色
const flowStatusColor = (status, payState) => {
  if (status == 'INIT') {
    //待审核
    return mainColor;
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      //待支付
      return '#e61414';
    } else if (payState == 'UNCONFIRMED') {
      //待确认
      return '#333';
    } else if (payState == 'PAID') {
      //待发货
      return mainColor;
    }
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    //待发货
    return mainColor;
  } else if (status == 'DELIVERED') {
    //待收货
    return '#36b260';
  } else if (status == 'CONFIRMED') {
    //已收货
    return '#333';
  } else if (status == 'COMPLETED') {
    //已完成
    return '#999';
  }
};

export default class PointOrderItem extends React.Component {
  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }

  render() {
    const { item: order } = this.props;
    const gifts = order.gifts || [];
    return (
      <View style={styles.container}>
        <View style={styles.lineItem}>
          <Text
            style={styles.price}
            allowFontScaling={false}
          >订单积分 <Text style={{ color: priceColor }} allowFontScaling={false}>{order.tradePrice.points || 0}</Text></Text>
          <Text 
          style={[styles.status,{
            color: flowStatusColor(order.tradeState.flowState, order.tradeState.payState),
          }]}  allowFontScaling={false}>
            {flowState(order.tradeState.flowState, order.tradeState.payState)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.lineItem, styles.itemContainer]}
          onPress={() =>
            msg.emit('router: goToNext', {
              routeName: 'PointsOrderDetail',
              oId: order.id
            })
          }
        >
          <View style={styles.imgContainer}>
            {order.tradeItems
              .concat(gifts)
              .filter((val, index) => index < 4)
              .map((item) => (
                <Image
                  style={styles.img}
                  key={Math.random().toString()}
                  source={
                    item.pic ? { uri: item.pic } : require('../img/none.png')
                  }
                />
              ))}
          </View>
          <View style={styles.itemCount}>
            <Text style={styles.gray} allowFontScaling={false}>
            {order ? order.tradeItems.concat(gifts).length : null}
            </Text>
            <Image source={require('../img/arrow.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    backgroundColor:'#fff',
    paddingHorizontal: 12,
    paddingVertical:16,
    marginHorizontal:12,
    marginTop: 10,
    borderRadius:8
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:16
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: screenWidth - 150
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  img: {
    width: 56,
    height: 56,
    marginRight: 10,
    borderRadius:4
  },
  itemCount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bg: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3
  },
  white: {
    color: '#ffffff',
    fontSize: 10,
    backgroundColor: 'transparent'
  },
  code: {
    fontSize: 15,
    color: '#333333'
  },
  status: {
    fontSize: 12,
    color: '#666'
  },
  gray: {
    fontSize: 12,
    color: '#333'
  },

  icon: {
    width: 7,
    height: 13,
    marginLeft: 5,
    tintColor: '#999'
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  price: {
    fontSize: 12,
    color: '#333'
  },
  boline: {
    width: screenWidth - 21,
    height: 2,
    marginLeft: -10
  },
  btn: {
    width: 75,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
    marginLeft: 10,
    backgroundColor: '#ffffff'
  },
  box: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  text: {
    fontSize: 13,
    color: '#000'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
