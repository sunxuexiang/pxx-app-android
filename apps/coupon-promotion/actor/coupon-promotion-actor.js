import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class GoodsActor extends Actor {
  defaultState() {
    return {
      /**查询参数*/
      //优惠券id
      couponId: '',
      //优惠券活动id
      activity: '',
      //排序方式
      // sortType: 0,
      // 选中的分类Id
      cateIds: [],
      // 选中的品牌Id
      brandIds: [],
      //放入state,为了分页组件局部刷新
      toRefresh: false,

      //分类和品牌初始化加载一次标志
      firstFetchFlag: true,
      // 分类
      cates: [],
      // 品牌
      brands: [],
      // 优惠券信息
      couponInfo: {},

      // 筛选条件页签
      tabName: '',
      // 排序选项
      sortType: {
        type: '',
        sort: ''
      },
      //是否展示评价相关信息
      isShow: false
    };
  }

  /**
   * 设置数据
   */
  @Action('coupon: promotion: parameter')
  setParameter(state, { field, value }) {
    return state.set(field, fromJS(value));
  }

  /**
   * 保存WmListView控件的初始化方法,用于刷新
   */
  @Action('coupon: list: refresh')
  initToRefresh(state, flag) {
    return state.set('toRefresh', flag);
  }

  /**
   * 标识选中的品牌
   * @param {*} state
   */
  @Action('coupon: check: brands')
  checkBrands(state) {
    const branIds = state.get('brandIds');
    const brands = state.get('brands').map((brand) => {
      if (branIds && branIds.includes(brand.get('brandId'))) {
        brand = brand.set('checked', true);
      } else {
        brand = brand.set('checked', false);
      }
      return brand;
    });
    return state.set('brands', brands);
  }

  /**
   * 标识选中的分类
   * @param {*} state
   */
  @Action('coupon: check: cates')
  checkcates(state) {
    const cateIds = state.get('cateIds');
    const cates = state.get('cates').map((cate) => {
      if (cateIds && cateIds.includes(cate.get('cateId'))) {
        cate = cate.set('checked', true);
      } else {
        cate = cate.set('checked', false);
      }
      return cate;
    });
    return state.set('cates', cates);
  }

  /**************************************************
   ********************** 品牌 ***********************
   ***************************************************/
  /**
   * 选择品牌
   * @param {*} state
   * @param {*} brandId
   */
  @Action('coupon: choose: brand')
  chooseBrand(state, brandId) {
    const brands = state.get('brands').map((brand) => {
      if (brand.get('brandId') == brandId) {
        brand = brand.set('checked', !brand.get('checked'));
      }
      return brand;
    });
    return state.set('brands', brands);
  }

  /**
   * 清除品牌选中状态
   * @param {*} state
   */
  @Action('coupon: clear: brands')
  clearBrands(state) {
    const brands = state.get('brands').map((brand) => {
      brand = brand.set('checked', false);
      return brand;
    });
    return state.set('brands', brands);
  }

  /**
   * 选中的品牌Ids
   * @param {*} state
   */
  @Action('coupon: confirm: brands')
  okBrands(state) {
    const branIds = state
      .get('brands')
      .filter((brand) => brand.get('checked'))
      .map((brand) => brand.get('brandId'));
    return state.set('brandIds', branIds);
  }

  /**************************************************
   ********************** 分类 **********************
   ***************************************************/
  /**
   * 选择分类
   * @param {*} state
   * @param {*} cateId
   */
  @Action('coupon: choose: cate')
  chooseCate(state, cateId) {
    const cates = state.get('cates').map((cate) => {
      if (cate.get('cateId') == cateId) {
        cate = cate.set('checked', !cate.get('checked'));
      }
      return cate;
    });
    return state.set('cates', cates);
  }

  /**
   * 清除分类选中状态
   * @param {*} state
   */
  @Action('coupon: clear: cates')
  clearCates(state) {
    const cates = state.get('cates').map((cate) => {
      cate = cate.set('checked', false);
      return cate;
    });
    return state.set('cates', cates);
  }

  /**
   * 选中的分类Ids
   * @param {*} state
   */
  @Action('coupon: confirm: cates')
  okCates(state) {
    const cateIds = state
      .get('cates')
      .filter((cate) => cate.get('checked'))
      .map((cate) => cate.get('cateId'));
    return state.set('cateIds', cateIds);
  }

  /**
   * 设置排序
   */
  @Action('coupon: set: sort')
  setSort(state, { type, sort }) {
    return state
      .setIn(['sortType', 'type'], type)
      .setIn(['sortType', 'sort'], sort);
  }

  @Action('coupon:isShow')
  setIsShow(state, context) {
    return state.set('isShow', context);
  }
}
