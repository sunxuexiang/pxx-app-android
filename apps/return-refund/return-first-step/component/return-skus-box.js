import React from 'react';
import { View, Text, StyleSheet, PixelRatio, Image } from 'react-native';
import { Relax } from 'plume2';
import Check from 'wmkit/check';
import { noop } from 'wmkit/noop';

import { checkedAllQL } from '../../ql';
import RetuenSkusList from './return-skus-list';
import ReturnGiftsList from './return-gifts-list';

/**
 * 退货商品box
 */
@Relax
export default class RetuenSkusBox extends React.Component {
  static relaxProps = {
    //全选状态
    checkedAll: checkedAllQL,

    //全选方法
    checkAll: noop
  };

  render() {
    return (
      <View style={{ backgroundColor: '#fafafa', flex: 1, paddingBottom: 48 }}>
        <View style={styles.head}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Check
              checked={this.props.relaxProps.checkedAll}
              onCheck={() =>
                this.props.relaxProps.checkAll(this.props.relaxProps.checkedAll)
              }
            />
            <Text style={styles.tit}>选择退货商品</Text>
          </View>
          <View style={styles.giftTips}>
            <Image style={styles.img} source={require('../../img/tip.png')} />
            <Text
              style={{ color: '#333', fontSize: 12, flex: 1 }}
              allowFontScaling={false}
            >
              &nbsp;如因退货导致满赠活动失效，您需要返还赠品哦
            </Text>
          </View>
        </View>
        <RetuenSkusList />
        <ReturnGiftsList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    padding: 10,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    backgroundColor: '#ffffff'
  },
  tit: {
    marginLeft: 10,
    color: '#333333',
    fontSize: 14
  },
  giftTips: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 28,
    marginTop: 5
  },
  img: {
    width: 16,
    height: 16
  }
});
