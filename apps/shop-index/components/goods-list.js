import React from 'react';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';

import SkuItem from './sku';

/**
 * 商品列表
 */
@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    changeShowShare: noop,
    saveCheckedSku: noop
  };

  constructor(props) {
    super(props);
  }
  render() {
    const { changeShowShare, saveCheckedSku } = this.props.relaxProps;
    const listViewProps = {
      url: '/goods/shop/sku-list',
      isPagination: true,
      dataPropsName: 'context.esGoodsInfoPage.content',
      otherProps: ['goodsIntervalPrices'],
      renderRow: (item) => {
        return (
          <SkuItem
            changeShowShare={() => changeShowShare()}
            saveCheckedSku={(checkedSku) => saveCheckedSku(checkedSku)}
            goodsItem={item}
            key={item.id}
          />
        );
      },
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          desc="没有搜到任何商品"
        />
      ),
      keyProps: 'id'
    };

    return <WmListView key="smallView" {...listViewProps} />;
  }
}
