import Item from '@ant-design/react-native/lib/list/ListItem';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  Image
} from 'react-native';
import { noop } from 'wmkit/noop';
import { mainColor, screenWidth } from 'wmkit/styles/index';
const check = require('wmkit/theme/check.png');
const uncheck = require('./img/uncheck.png');
const IconOne = require('./img/icon-one.png');
const IconTwo = require('./img/icon-two.png');
const IconThree = require('./img/icon-three.png');

/**
 * 公共RadioBox单选按钮(方)
 */
export default class RadioBox extends React.PureComponent {
  static defaultProps = {
    //选中值
    checked: 0,
    //选择方法
    onCheck: noop,
    //样式
    style: {},
    //选项数据
    data: [],
    //判断是否加勾
    isBadge: true,
    // 是否是选择支付方式
    isSelectPay: false,
    itemStyle: {},
    textStyle: {},
    checkIconBefore:false
  };

  render() {
    const {
      checked,
      style,
      data,
      isBadge,
      returnReason,
      isSelectPay,
      itemStyle,
      textStyle,
      checkIconBefore
    } = this.props;
    return returnReason ? (
      <View style={[styles.selectReason, styles.retReason, style]}>
        {data.map((val, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={[styles.retReasonItem, itemStyle]}
              onPress={() => this._onCheck(val.id)}
            >
              <View style={styles.deliveryLeft}>
                <Text style={[styles.retText, textStyle]}>{val.name}</Text>
              </View>
              <Image
                source={checked == val.id && isBadge ? check : uncheck}
                style={[styles.payIcon, checked == val.id && isBadge ? { tintColor: mainColor } : {}]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    ) : (
      <View style={[styles.selectReason, style]}>
        {data.map((val, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.deliveryItem, itemStyle]}
              onPress={() => this._onCheck(val.id)}
            >
              {
                checkIconBefore && <Image
                  source={checked == val.id && isBadge ? check : uncheck}
                  style={[styles.payIcon, checked == val.id && isBadge ? { tintColor: mainColor } : {}]}
                />
              }
              <View style={styles.deliveryLeft}>
                {isSelectPay && (
                  <Image
                    source={val.id === '1' ? IconTwo : IconOne}
                    style={styles.payIcon}
                  />
                )}
                <Text style={[styles.payText, textStyle]}>{val.name}</Text>
              </View>
              {
                !checkIconBefore && <Image
                  source={checked == val.id && isBadge ? check : uncheck}
                  style={[styles.payIcon, checked == val.id && isBadge ? { tintColor: mainColor } : {}]}
                />
              }
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  _onCheck = (k) => {
    this.props.onCheck(k);
  };
}

const styles = StyleSheet.create({
  selectReason: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
    // width:300
  },
  retReason: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  selectBtn: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#EBEBEB',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  text: {
    color: '#333',
    fontSize: 12
  },
  selectBtnChecked: {
    color: '#ff6600'
  },
  img: {
    width: 14,
    height: 14,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 5,
    marginRight: 10,
    width: screenWidth / 2 - 22
    // backgroundColor:'red'
  },
  retReasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 20,
    marginRight: 0,
    width: '100%'
  },
  deliveryLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  payIcon: {
    width: 16,
    height: 16,
    marginHorizontal:5
  },
  payText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    marginLeft: 8
  },
  retText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8
  }
});
