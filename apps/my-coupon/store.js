import { Store, msg } from 'plume2';

import { config } from 'wmkit/config';
import { Confirm } from 'wmkit/modal/confirm';

import CouponActor from './actor/coupon-actor';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }
  bindActor() {
    return [new CouponActor()];
  }

  /**
   * 对请求数据的处理
   * @param result
   */
  dealData = (result) => {
    const { code, context, message } = result;
    if (context['couponCodeVos'] && context['couponCodeVos']['first']) {
      this.initToRefresh(false);
    }
    if (code == config.SUCCESS_CODE) {
      this.dispatch('coupon: list', context);
    } else {
      Confirm({
        text: message,
        okFn: () => msg.emit('router: goToNext', { routeName: 'UserCenter' }),
        okText: '确定'
      });
    }
  };

  /**
   * 存储wmlistview组件的初始化方法,用于刷新
   * @param _init
   */
  initToRefresh = (flag) => {
    this.dispatch('coupon: list: refresh', flag);
  };

  /**
   * 我的优惠券tab页签切换
   * @param index
   */
  setUseStatus = (index) => {
    this.dispatch('coupon: tab: change', index);
    this.initToRefresh(true);
  };

  /**
   * 我的优惠券优惠券类型选择
   * @param index
   */
  setCouponType = (index) => {
    this.dispatch('coupon: type: change', index);
    this.changeDrapMenu();
    this.initToRefresh(true);
  };

  /**
   * 说明文档的显示隐藏
   */
  changeHelp = () => {
    this.dispatch('change:changeHelp');
  };

  /**
   * 下拉菜单的显示隐藏
   */
  changeDrapMenu = () => {
    this.dispatch('change:changeDrapMenu');
  };

  /**
   * 优惠券说明
   * @param desc
   */
  setCouponDesc = (desc) => {
    this.dispatch('coupon: desc', desc);
    this.changeHelp();
  };
}
