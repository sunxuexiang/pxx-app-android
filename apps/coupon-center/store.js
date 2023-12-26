import { Store, msg } from 'plume2';

import { fromJS } from 'immutable';
import { config } from 'wmkit/config';

import CouponActor from './actor/coupon-actor';
import FormActor from './actor/coupon-list-form-actor';
import * as webapi from './webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new CouponActor(), new FormActor()];
  }

  /**
   * 初始化数据-优惠券分类
   * @returns {Promise<void>}
   */
  init = async () => {
    //获取优惠券分类
    let couponCatesRes = await webapi.listCouponCate();
    if (couponCatesRes.code === config.SUCCESS_CODE) {
      let couponCateList = couponCatesRes.context;
      couponCateList.push({ couponCateId: -1, couponCateName: '全部优惠券' });
      this.dispatch('couponcates: list', couponCateList);
      //分类默认选择第一个
      this.setCouponCate(
        couponCateList[0] ? couponCateList[0].couponCateId : -1
      );

      this.dispatch('coupon: list: initial: end');
    } else {
      msg.emit('app:tip', couponCatesRes.message);
    }
  };

  /**
   *  初始化数据-优惠券
   */
  initCoupon = async () => {
    let couponCateId = this.state().get('couponCateId');
    let couponType = this.state().get('couponType');
    if (couponCateId == -1) {
      couponCateId = null;
    }
    if (couponType == -1) {
      couponType = null;
    }
    //获取优惠券分类及优惠券数据
    let couponsRes = await webapi.listCouponCenter(couponCateId, couponType);

    if (couponsRes.code == config.SUCCESS_CODE) {
      let couponList = couponsRes.context.couponCache.content;
      couponList = couponList.map((couponDetail) => {
        return couponDetail;
      });

      this.dispatch('coupon: list', {
        couponList: fromJS(couponList)
      });
    } else {
      msg.emit('app:tip', couponsRes.message);
    }
  };

  /**
   * 下拉菜单的显示隐藏
   */
  changeDrapMenu = () => {
    this.dispatch('change: drapmenu');
  };

  /**
   * 分类弹层的显示隐藏
   */
  changeCateMask = () => {
    this.dispatch('change: catemask');
  };

  /**
   * 优惠券类型选择
   * @param index
   */
  setCouponType = (index) => {
    this.transaction(() => {
      this.changeDrapMenu();
      this.dispatch('coupon: type: change', index);
      this.dispatch('coupon: list: form: set', {
        filed: 'couponType',
        value: index === -1 ? null : index
      });
      this.clearCouponState();
      // this.state().get('toRefresh')();
    });
  };

  /**
   * 优惠券分类选择
   * @param index
   */
  setCouponCate = (index) => {
    this.transaction(() => {
      this.dispatch('coupon: tab: change', index);

      this.dispatch('coupon: list: form: set', {
        filed: 'couponCateId',
        value: index === -1 ? null : index
      });
      this.clearCouponState();
      // this.state().get('toRefresh')();
    });
  };

  /**
   *设置选中分类索引
   */
  changeActivedKey = (index) => {
    this.dispatch('change: actived-key', index);
  };

  /**
   * 领取优惠券
   */
  fetchCoupon = async (coupon) => {
    const { code, message } = await webapi.fetchCoupon(
      coupon.couponId,
      coupon.activityId
    );
    if (code === config.SUCCESS_CODE) {
      this.setCouponState(coupon, 'fetchCoupon');
    } else {
      msg.emit('app:tip', message);
      //会员等级导致的领券失败不刷新页面
      if (code === 'K-080203') {
        return;
      }
      this.state().get('toRefresh')();
    }
  };

  /**
   *状态变化的优惠券
   */
  setCouponState = (coupon, opt) => {
    if (opt === 'fetchCoupon') {
      //领取成功
      this.dispatch('coupon: list: coupon-state: changed', {
        filed: coupon.activityConfigId,
        value: { hasFetched: true }
      });
    }
    if (opt === 'countOver') {
      //倒计时结束
      this.dispatch('coupon: list: coupon-state: changed', {
        filed: coupon.activityConfigId,
        value: { countOver: true }
      });
    }
  };

  /**
   *清空变化的优惠券
   */
  clearCouponState = () => {
    this.dispatch('coupon: list: coupon-state: clear');
  };

  /**
   * 优惠券倒计时结束
   */
  countOver = (coupon) => {
    this.setCouponState(coupon, 'countOver');
  };

  /**
   * 初始话刷新method
   * @param toRefresh
   */
  initToRefresh = (toRefresh) => {
    this.dispatch('coupon: list: torefresh', toRefresh);
  };
}
