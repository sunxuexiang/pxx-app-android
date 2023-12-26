import React from 'react';
import { ScrollView } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import RetuenSkusItem from './return-skus-item';

/**
 * 退货商品列表
 */
@Relax
export default class RetuenSkusList extends React.Component {
  static relaxProps = {
    //退货商品
    skus: 'skus',

    saveSkus: noop
  };

  render() {
    const dataSource = this.props.relaxProps.skus.toJS();
    return (
      <ScrollView>
        {dataSource.map((sku, index) => {
          //可退数量
          const returnNum = sku.canReturnNum;
          if (returnNum > 0) {
            return (
              <RetuenSkusItem
                key={index}
                sku={sku}
                skuId={sku.skuId}
                skuIndex={index}
              />
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
    );
  }
}
