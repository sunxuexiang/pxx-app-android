import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class GoodsActor extends Actor {
  defaultState() {
    return {
      // 列表视图模式  true:列表 false:大图
      listView: true,
      // 赠品查看
      giftShow: false,
      // 营销Id
      marketingId: 0,
      // 分类
      cates: [],
      // 品牌
      brands: [],
      // 商品
      goods: [],
      // 选中的分类Id
      cateIds: [],
      // 选中的品牌Id
      brandIds: [],
      // 商品选择的营销
      goodsMarketing: fromJS({}),
      //评价相关信息是否展示
      isShow: false,
      //子类营销
      subType: 0
    };
  }

  /**
   * 切换商品列表视图模式
   */
  @Action('goodsActor:changeLayout')
  changeLayout(state) {
    return state.set('listView', !state.get('listView'));
  }

  /**
   * 查看赠品弹框展示
   */
  @Action('goodsActor: changeGiftShow')
  changeGiftShow(state) {
    return state.set('giftShow', !state.get('giftShow'));
  }

  /**
   * 存储营销id
   */
  @Action('goodsActor: marketingId')
  saveMarketingId(state, marketingId) {
    return state.set('marketingId', marketingId);
  }

  /**
   * 存储子类营销id
   */
  @Action('goodsActor: subType')
  saveMarketingSubType(state, subType) {
    return state.set('subType', subType);
  }

  /**
   * 存储分类集合
   * @param {*} state
   * @param {*} cates
   */
  @Action('goodsActor: cates')
  fetchCates(state, cates) {
    return state.set('cates', fromJS(cates));
  }

  /**
   * 存储品牌集合
   * @param {*} state
   * @param {*} cates
   */
  @Action('goodsActor: brands')
  fetchBrands(state, brands) {
    return state.set('brands', fromJS(brands));
  }

  /**
   * 存储商品集合
   * @param {*} state
   * @param {*} goods
   */
  @Action('goodsActor: goods')
  fetchGoodss(state, goods) {
    return state.set('goods', goods);
  }

  /**
   * 选择分类
   * @param {*} state
   * @param {*} cId
   */
  @Action('goodsActor: choose: cate')
  chooseCate(state, cId) {
    const cates = state.get('cates').map(cate => {
      if (cate.get('cateId') == cId) {
        cate = cate.set('checked', !cate.get('checked'));
      }
      return cate;
    });
    return state.set('cates', cates);
  }

  /**
   * 选择品牌
   * @param {*} state
   * @param {*} bId
   */
  @Action('goodsActor: choose: brand')
  chooseBrand(state, bId) {
    const brands = state.get('brands').map(brand => {
      if (brand.get('brandId') == bId) {
        brand = brand.set('checked', !brand.get('checked'));
      }
      return brand;
    });
    return state.set('brands', brands);
  }

  /**
   * 清除分类选中状态
   * @param {*} state
   */
  @Action('goodsActor: clear: cates')
  clearCates(state) {
    const cates = state.get('cates').map(cate => {
      cate = cate.set('checked', false);
      return cate;
    });
    return state.set('cates', cates);
  }

  /**
   * 清除品牌选中状态
   * @param {*} state
   */
  @Action('goodsActor: clear: brands')
  clearBrands(state) {
    const brands = state.get('brands').map(brand => {
      brand = brand.set('checked', false);
      return brand;
    });
    return state.set('brands', brands);
  }

  /**
   * 选中的分类Ids
   * @param {*} state
   */
  @Action('goodsActor: sure: cates')
  okCates(state) {
    const cateIds = state
      .get('cates')
      .filter(cate => cate.get('checked'))
      .map(cate => cate.get('cateId'));
    return state.set('cateIds', cateIds);
  }

  /**
   * 选中的品牌Ids
   * @param {*} state
   */
  @Action('goodsActor: sure: brands')
  okBrands(state) {
    const branIds = state
      .get('brands')
      .filter(brand => brand.get('checked'))
      .map(brand => brand.get('brandId'));
    return state.set('brandIds', branIds);
  }

  /**
   * 标识选中的分类
   * @param {*} state
   */
  @Action('goodsActor: check: brands')
  checkBrands(state) {
    const branIds = state.get('brandIds');
    const brands = state.get('brands').map(brand => {
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
   * 标识选中的品牌
   * @param {*} state
   */
  @Action('goodsActor: check: cates')
  checkcates(state) {
    const cateIds = state.get('cateIds');
    const cates = state.get('cates').map(cate => {
      if (cateIds && cateIds.includes(cate.get('cateId'))) {
        cate = cate.set('checked', true);
      } else {
        cate = cate.set('checked', false);
      }
      return cate;
    });
    return state.set('cates', cates);
  }


  /**
   * 存储商品选择的营销
   * @param state
   * @param type
   */
  @Action('goodsActor: goodsMarketing')
  goodsMarketings(state, goodsMarketings) {
    let goodsMarketing = fromJS({})

    if (goodsMarketings) {
      goodsMarketings.forEach(marketing => {
        goodsMarketing = goodsMarketing.set(marketing.goodsInfoId, marketing.marketingId)
      })
    }

    return state.set('goodsMarketing', goodsMarketing)
  }

  @Action('goodsActor: isShow')
  setIsShow(state, flag) {
    return state.set('isShow', flag);
  }
}
