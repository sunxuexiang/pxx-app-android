import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import CouponActor from './actor/coupon-actor';
import * as webapi from './webapi';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';

import AsyncStorage from '@react-native-community/async-storage';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }
  bindActor() {
    return [new CouponActor()];
  }

  /**
   * 说明文档的显示隐藏
   */
  changeHelp = () => {
    this.dispatch('change:changeHelp');
  };

  /**
   * 初始化
   */
  init = (coupons, couponPageInfo, storeIds) => {
    
    this.dispatch('init', { coupons, storeIds });
    // if (couponPageInfo) {
    this.dispatch('set:page:info', couponPageInfo);
    // } else {
    // }
  };

  /**
   * 修改选中的页面
   */
  changeTabKey = (key) => {
    this.dispatch('change:tab:key', key);
  };

  /**
   * 选择优惠券
   */
  onChooseCoupon = async (flag, couponCodeId, storeId) => {
    if (storeId == -1) {
      if (flag) {
        // 1.如果是选择平台券
        this.dispatch('choose:common:coupon', couponCodeId);
      } else {
        // 2.如果是取消选择平台券
        this.dispatch('clean:common:coupon');
      }
    } else {
      // 3.设置店铺券
      this.dispatch('choose:store:coupon', { flag, couponCodeId, storeId });
    }

    // 4.根据已选的券，查询不满足门槛的平台券，以及均摊优惠券后的商品总价
    const enableCoupons = this.state().get('enableCoupons').toJS();
    let couponCodeIds = [];
    // 已选平台券
    couponCodeIds = couponCodeIds.concat(
      enableCoupons.commonCoupons
        .filter((c) => c.chosen == true)
        .map((c) => c.couponCodeId)
    );

    let storeCoupons = [];
    enableCoupons.stores.forEach(
      (store) => (storeCoupons = storeCoupons.concat(store.coupons))
    );

    // 已选店铺券
    couponCodeIds = couponCodeIds.concat(
      storeCoupons.filter((c) => c.chosen == true).map((c) => c.couponCodeId)
    );
    const res = await webapi.checkoutCoupons(couponCodeIds);
    if (res.code == config.SUCCESS_CODE) {
      let { unreachedIds, couponTotalPrice, checkGoodsInfos } = res.context;
      const chosenCommon = this.state()
        .getIn(['enableCoupons', 'commonCoupons'])
        .find((c) => c.get('chosen') == true);
      this.dispatch('clean:common:coupon');
      this.dispatch('set:unreached:ids', {
        unreachedIds: fromJS(unreachedIds),
        couponTotalPrice,
        checkGoodsInfos: fromJS(checkGoodsInfos)
      });
      if (
        chosenCommon &&
        !unreachedIds.includes(chosenCommon.get('couponCodeId'))
      ) {
        this.dispatch('choose:common:coupon', chosenCommon.get('couponCodeId'));
      }
    }
  };

  onSubmit = async () => {
    AsyncStorage.setItem(
      cache.ORDER_CONFIRM_COUPON,
      JSON.stringify(this.state().toJS())
    );
    msg.emit('router: back');
  };
}
