import React from 'react';
import { ScrollView } from 'react-native';
import { Relax } from 'plume2';
import ReturnGiftsItem from './return-gifts-item';

/**
 * 退货商品列表
 */
@Relax
export default class ReturnGiftsList extends React.Component {
  static relaxProps = {
    //退货赠品
    gifts: 'gifts'
  };

  render() {
    const { gifts } = this.props.relaxProps;
    if (!gifts || gifts.size == 0) {
      return null;
    }
    const dataSource = gifts.toJS();

    return (
      <ScrollView>
        {dataSource.map((sku, index) => {
          //可退数量
          const returnNum = sku.canReturnNum;
          if (returnNum > 0) {
            return <ReturnGiftsItem key={index} sku={sku} />;
          } else {
            return null;
          }
        })}
      </ScrollView>
    );
  }
}
