import { Store } from 'plume2';
import * as webapi from './webapi';
import ShopActor from './actor/shop-actor';
import { config } from 'wmkit/config';
import { fromJS } from 'immutable';
export default class AppStore extends Store {
  bindActor() {
    return [new ShopActor()];
  }

  constructor(props) {
    super(props);
  }

  init = async () => {
    const { code, context } = await webapi.shopSkuList();
    if (code == config.SUCCESS_CODE) {
      const res = context.esGoodsInfoPage;
      this.dispatch('change:shopSkuList', res);
    }
  };

  changeListView = () => {
    this.dispatch('change:changeListView');
  };

  delCommodityDistribution = async (goodsInfoId, index) => {
    const { code, message } = await webapi.delCommodityDistribution(
      goodsInfoId
    );
    if (code == config.SUCCESS_CODE) {
      let newData = fromJS(this.state().get('shopSkuList')).delete(index);
      this.dispatch('shop-edit:shopSkuList', newData.toJS());
    }
  };

  save = async (data) => {
    let goodsArray = new Array();
    data.map((value, index, array) => {
      const goods = {
        id: value.goodsInfo.distributionGoodsInfoId,
        goodsInfoId: value.goodsInfo.goodsInfoId,
        goodsId: value.goodsInfo.goodsId,
        sequence: index,
        storeId: value.goodsInfo.storeId
      };
      goodsArray.push(goods);
    });
    const { code, message } = await webapi.changeSort(goodsArray);
    if (code == config.SUCCESS_CODE) {
      this.dispatch('shop-edit:shopSkuList', data);
    }
  };
}
