import React from 'react';
import { View, Image, Text, StyleSheet, PixelRatio } from 'react-native';
import { Relax, msg } from 'plume2';
import NumInput from 'wmkit/num-input';
import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util';
import Check from 'wmkit/check';
import { priceColor } from 'wmkit/styles/index';
const noneImg = require('../../img/none.png');

/**
 * 退货商品
 */
@Relax
export default class RetuenSkusItem extends React.Component {
  static relaxProps = {
    //单选
    checkOne: noop,
    changeNum: noop
  };

  static defaultProps = {
    //商品项
    sku: {},
    skuId: -1
  };

  render() {
    const sku = this.props.sku;
    console.log('sku item =========>', JSON.stringify(sku));
    let errorMsg = sku.skuChecked
      ? sku.num > sku.canReturnNum
        ? '可退数量' + sku.canReturnNum
        : sku.num == 0
          ? '退货数量不可小于1'
          : ''
      : '';

    return (
      <View style={styles.rowItem}>
        <Check
          checked={sku.skuChecked}
          onCheck={() => this.props.relaxProps.checkOne(sku.skuId)}
          style={{ marginRight: 10 }}
        />
        <View style={styles.item}>
          <Image
            source={sku.pic ? { uri: sku.pic } : noneImg}
            style={styles.img}
          />
          <View style={styles.content}>
            <View>
              <Text
                style={styles.title}
                numberOfLines={2}
                allowFontSacling={false}
              >
                {sku.skuName.trim()}
              </Text>
              <Text
                style={styles.gec}
                numberOfLines={1}
                allowFontSacling={false}
              >
                {sku.specDetails}
              </Text>
            </View>
            <View style={styles.row}>
              <Text allowFontSacling={false} style={[styles.price, { color: priceColor }]}>
                ¥{_.addZero(sku.price)}
              </Text>
              <NumInput
                max={sku.canReturnNum}
                min={0}
                error={errorMsg}
                value={sku.num}
                disableSubtraction={sku.skuChecked && sku.num == 1}
                onChange={(buyCount) => {
                  this._handleChange(buyCount);
                }}
                onAddClick={(addDisabled, nextValue) => {
                  const max = sku.canReturnNum;
                  if (addDisabled && nextValue > max) {
                    msg.emit('app:tip', `可退数量：${max}！`);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 修改sku数量
   * @param value
   * @private
   */
  _handleChange = (value) => {
    const { canReturnNum } = this.props.sku;

    if (value > canReturnNum) {
      msg.emit('app:tip', `可退数量${canReturnNum}`);
    }

    const sku = this.props.sku;
    this.props.relaxProps.changeNum({
      skuNum: value,
      skuId: sku.skuId
    });
    this.setState({});
  };
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 10
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 10,
    height: 100
  },
  title: {
    color: '#333333',
    fontSize: 14,
    marginBottom: 10
  },
  gec: {
    color: '#999999',
    fontSize: 13,
    marginBottom: 10
  },
  price: {
    fontSize: 15
  },
  img: {
    width: 100,
    height: 100,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  }
});
