import { msg, Store } from 'plume2';

import { config } from 'wmkit/config';
import { Confirm } from 'wmkit/modal/confirm';
import * as evaluateWebapi from 'wmkit/biz/evaluateIs-show-webapi';
import CouponPromotionActor from './actor/coupon-promotion-actor';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new CouponPromotionActor()];
  }

  /**
   * 初始化数据
   * @param couponId
   * @param activityId
   * @returns {Promise<void>}
   */
  init = async (couponId, activityId) => {
    const evacontext = await evaluateWebapi.isShow();
    this.transaction(() => {
      this.dispatch('coupon:isShow', evacontext);
      this.dispatch('coupon: promotion: parameter', {
        field: 'couponId',
        value: couponId
      });
      this.dispatch('coupon: promotion: parameter', {
        field: 'activity',
        value: activityId
      });
    });
  };

  /**
   * 拿到数据后的回调方法
   * @param result
   */
  dealData = (result) => {
    const firstFetchFlag = this.state().get('firstFetchFlag');
    const { code, context, message } = result;

    if (
      context['esGoodsInfoResponse'] &&
      context['esGoodsInfoResponse']['esGoodsInfoPage']['first']
    ) {
      this.initToRefresh(false);
    }
    if (code == config.SUCCESS_CODE) {
      if (firstFetchFlag) {
        if (context.esGoodsInfoResponse != null) {
          //设置分类
          this.dispatch('coupon: promotion: parameter', {
            field: 'cates',
            value: context.esGoodsInfoResponse.cateList
          });
          //设置品牌
          this.dispatch('coupon: promotion: parameter', {
            field: 'brands',
            value: context.esGoodsInfoResponse.brands
          });
        }
        //设置优惠券信息
        this.dispatch('coupon: promotion: parameter', {
          field: 'couponInfo',
          value: context.couponInfo
        });
        this.dispatch('coupon: promotion: parameter', {
          field: 'firstFetchFlag',
          value: false
        });
      }
    } else {
      Confirm({
        text: message,
        okFn: () => msg.emit('router: goToNext', { routeName: 'Main' }),
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
   * 条件筛选页签 显示遮罩
   * @param tabName 页签名称
   */
  openShade = (tabName) => {
    if (tabName == 'goodsCate') {
      this.dispatch('coupon: check: cates');
    } else if (tabName == 'goodsBrand') {
      this.dispatch('coupon: check: brands');
    }
    this.dispatch('coupon: promotion: parameter', {
      field: 'tabName',
      value: tabName
    });
  };

  /**
   * 隐藏遮罩
   */
  closeShade = () => {
    this.dispatch('coupon: promotion: parameter', {
      field: 'tabName',
      value: ''
    });
  };

  /************************************************
   ******************** 选中品牌********************
   ************************************************/
  chooseBrand = (brandId) => {
    this.dispatch('coupon: choose: brand', brandId);
  };

  /**
   * 清除品牌选中状态
   */
  clearBrands = () => {
    this.dispatch('coupon: clear: brands');
  };

  /**
   * 确认品牌
   */
  okBrands = () => {
    this.transaction(() => {
      this.dispatch('coupon: confirm: brands');
      //刷新
      this.initToRefresh(true);
      this.closeShade();
    });
  };

  /**************************************************
   ********************** 选中分类********************
   ***************************************************/
  chooseCate = (cateId) => {
    this.dispatch('coupon: choose: cate', cateId);
  };

  /**
   * 清除分类选中状态
   */
  clearCates = () => {
    this.dispatch('coupon: clear: cates');
  };

  /**
   * 确认分类
   */
  okCates = () => {
    this.transaction(() => {
      this.dispatch('coupon: confirm: cates');
      //刷新
      this.initToRefresh(true);
      this.closeShade();
    });
  };

  /**
   * 设置排序
   */
  setSort = (type) => {
    let newType = type;
    let newSort = '';
    const sortType = this.state().get('sortType');
    // 是否切换排序类型？
    if (newType !== sortType.get('type')) {
      if (newType === 'default') {
        newSort = '';
      } else if (newType === 'composite') {
        newSort = 'desc';
      } else if (newType === 'dateTime') {
        newSort = 'desc';
      } else if (newType === 'price') {
        newSort = 'asc';
      } else if (newType === 'salesNum') {
        newSort = 'desc';
      } else if (newType === 'evaluateNum') {
        newSort = 'desc';
      } else if (newType === 'praise') {
        newSort = 'desc';
      } else if (newType === 'collection') {
        newSort = 'desc';
      }
    } else if (newType !== 'default') {
      // 同一种排序类型，切换升降顺序，默认排序无顺序
      if (sortType.get('sort') === 'asc') {
        newSort = 'desc';
      } else if (sortType.get('sort') === 'desc') {
        newSort = 'asc';
      }
    }
    this.dispatch('coupon: set: sort', { type: newType, sort: newSort });
    //刷新
    this.initToRefresh(true);
    this.closeShade();
  };
}
