import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Relax } from 'plume2';
import SkuItem from './sku-item';

@Relax
export default class StockItemList extends React.Component {
  static relaxProps = {
    skus: 'skus',
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { skus } = this.props.relaxProps;
    const invalidGoods = skus.filter(item => {
      return item.get('goodsStatus') === 1;
    });
    return invalidGoods && Boolean(invalidGoods.size > 0) && (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.leftText} allowFontSacling={false}>
            缺货商品
          </Text>
        </View>
        {invalidGoods.map((sku) => {
            return (
              <SkuItem
                sku={sku}
                key={sku && sku.get('goodsInfoId')}
              />
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    borderRadius:6,
    marginBottom: 12,
    overflow:'hidden'
  },
  header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8
  },
  leftText: {
    fontSize: 14,
    color: '#333333'
  },
});