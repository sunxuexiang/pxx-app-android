import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class CouponActor extends Actor {
  defaultState() {
    return {
      //说明文档的显示隐藏
      showHelp: false,

      // 页签key（0:可用优惠券 1:不可用优惠券）
      tabKey: 0,

      // 可用优惠券
      enableCoupons: {
        //平台优惠券
        commonCoupons: [],
        //按店铺分组优惠券，结构
        // [
        //   {
        //     storeId: '',
        //     storeName: '',
        //     coupons: []
        //   }
        // ]
        stores: []
      },
      enableCount: 0,

      // 确认订单中的店铺顺序
      storeIds: [],

      // 不可用优惠券
      disableCoupons: {
        unReachPrice: [],
        noAvailableSku: [],
        unReachTime: []
      },
      disableCount: 0,

      // 选择后，没有达到门槛的平台券id
      unreachedIds: [],
      // 优惠券优惠总价
      couponTotalPrice: null
    };
  }

  /**
   * 初始化
   */
  @Action('init')
  init(state, { coupons, storeIds }) {
    // 1.设值优惠券范围字符串
    coupons = coupons.map((coupon) => {
      let scopeTypeStr = '商品：';
      //范围名称
      let goodsName = '仅限';
      switch (coupon.get('scopeType')) {
        case 0:
          goodsName = '全部商品';
          break;
        case 1:
          scopeTypeStr = '品牌：';
          coupon.get('brandNames') &&
            coupon.get('brandNames').forEach((value) => {
              goodsName = `${goodsName}[${value}]`;
            });
          break;
        case 2:
          scopeTypeStr = '品类：';
          coupon.get('goodsCateNames') &&
            coupon.get('goodsCateNames').forEach((value) => {
              goodsName = `${goodsName}[${value}]`;
            });
          break;
        case 3:
          scopeTypeStr = '分类：';
          coupon.get('storeCateNames') &&
            coupon.get('storeCateNames').forEach((value) => {
              goodsName = `${goodsName}[${value}]`;
            });
          break;
        default:
          goodsName = '部分商品';
          break;
      }
      return coupon.set('scopeTypeStr', `${scopeTypeStr}${goodsName}`);
    });

    // 2.构建可用优惠券
    const enables = coupons.filter((coupon) => coupon.get('status') == 0);
    // 2.1.构建平台优惠券
    const commonCoupons = enables.filter(
      (item) => item.get('platformFlag') == 1
    );
    // 2.2.构建店铺优惠券
    let stores = fromJS([]);
    enables
      .filter((coupon) => coupon.get('platformFlag') != 1)
      .forEach((coupon) => {
        const index = stores.findIndex(
          (store) => store.get('storeId') == coupon.get('storeId')
        );
        if (index == -1) {
          stores = stores.push(
            fromJS({
              storeId: coupon.get('storeId'),
              storeName: coupon.get('storeName'),
              coupons: [coupon]
            })
          );
        } else {
          stores = stores.updateIn([index, 'coupons'], (coupons) =>
            coupons.push(coupon)
          );
        }
      });
    // 2.3.重新排序店铺
    let sortedStores = fromJS([]);
    storeIds.forEach((storeId) => {
      const store = stores.find((store) => store.get('storeId') == storeId);
      if (store) sortedStores = sortedStores.push(store);
    });

    // 3.构建不可用优惠券
    const disables = coupons
      .filter((coupon) => coupon.get('status') != 0)
      .map((item) => item.set('disabled', true));
    const unReachPrice = disables.filter((item) => item.get('status') == 1);
    const noAvailableSku = disables.filter((item) => item.get('status') == 2);
    const unReachTime = disables.filter((item) => item.get('status') == 3);

    // 4.设值
    return state
      .set(
        'enableCoupons',
        fromJS({
          commonCoupons,
          stores: sortedStores
        })
      )
      .set(
        'disableCoupons',
        fromJS({
          unReachPrice,
          noAvailableSku,
          unReachTime
        })
      )
      .set('enableCount', enables.size)
      .set('disableCount', disables.size);
  }

  /**
   * 设置页面状态
   */
  @Action('set:page:info')
  setPageInfo(state, pageInfo) {
    return state.merge(pageInfo);
  }

  /**
   * 说明文档的显示隐藏
   */
  @Action('change:changeHelp')
  changeHelp(state) {
    return state.set('showHelp', !state.get('showHelp'));
  }

  /**
   * 修改选中的页面
   */
  @Action('change:tab:key')
  changeTabKey(state, key) {
    return state.set('tabKey', key);
  }

  /**
   * 选择店铺优惠券
   */
  @Action('choose:store:coupon')
  chooseStoreCoupon(state, { flag, couponCodeId, storeId }) {
    return state.updateIn(['enableCoupons', 'stores'], (stores) => {
      const index = stores.findIndex(
        (store) => store.get('storeId') == storeId
      );
      return stores.updateIn([index, 'coupons'], (coupons) => {
        return coupons.map((coupon) => {
          coupon = coupon.set('chosen', false).set('disabled', flag);
          if (coupon.get('couponCodeId') == couponCodeId) {
            coupon = coupon.set('chosen', flag).set('disabled', false);
          }
          return coupon;
        });
      });
    });
  }

  /**
   * 清空平台券
   */
  @Action('clean:common:coupon')
  cleanCommonCoupon(state) {
    return state.updateIn(['enableCoupons', 'commonCoupons'], (coupons) => {
      return coupons.map((coupon) =>
        coupon.set('chosen', false).set('disabled', false)
      );
    });
  }

  /**
   * 选择平台优惠券
   */
  @Action('choose:common:coupon')
  chooseCommonCoupon(state, couponCodeId) {
    return state.updateIn(['enableCoupons', 'commonCoupons'], (coupons) => {
      return coupons.map((coupon) => {
        coupon = coupon.set('chosen', false).set('disabled', true);
        if (coupon.get('couponCodeId') == couponCodeId) {
          coupon = coupon.set('chosen', true).set('disabled', false);
        }
        return coupon;
      });
    });
  }

  /**
   * 设置没到门槛的平台优惠券
   */
  @Action('set:unreached:ids')
  setUnreachedIds(state, { unreachedIds, couponTotalPrice, checkGoodsInfos }) {
    return state
      .set('unreachedIds', fromJS(unreachedIds))
      .updateIn(['enableCoupons', 'commonCoupons'], (coupons) =>
        coupons.map((coupon) => {
          if (unreachedIds.contains(coupon.get('couponCodeId'))) {
            coupon = coupon.set('chosen', false).set('disabled', true);
          }
          return coupon;
        })
      )
      .set('couponTotalPrice', couponTotalPrice)
      .set('checkGoodsInfos', checkGoodsInfos);
  }
}
