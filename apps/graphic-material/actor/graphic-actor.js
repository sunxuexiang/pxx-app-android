import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class GraphicActor extends Actor {
  defaultState() {
    return {
      visible: false, // 全文与收起切换
      annexMaskShow: false, //图片大图预览
      shareVisible: false, //分享弹窗
      momentsSuccess: false, //朋友圈分享成功弹窗
      sortEnclosures: fromJS([]),
      //每一个item推荐文字的展开隐藏
      visibleMap: fromJS({}),
      currentMatterList: fromJS([]),
      currentMatterId: '',
      moments: false,
      imageList: [],
      chooseImageIndex: 0,
      imageModal: false
    };
  }

  /**
   * 全文与收起切换
   */
  @Action('change:visible')
  changeCateVisible(state, id) {
    //获取原来的状态值
    const oldState = state.get('visibleMap').get(id);
    return state.setIn(['visibleMap', id], !oldState);
  }

  /**
   * 分享弹窗的显示
   */
  @Action('change:shareVisible')
  changeShareVisible(state) {
    return state.set('shareVisible', !state.get('shareVisible'));
  }

  /**
   * 朋友圈分享成功弹窗显示
   */
  @Action('change:momentsSuccess')
  changeShareMoments(state) {
    return state
      .set('moments', false)
      .set('shareVisible', false)
      .set('momentsSuccess', !state.get('momentsSuccess'));
  }

  /**
   *
   */
  @Action('getImages:sortEnclosures')
  getImages(state, goodsInfoId) {
    return state.set('goodsInfoId', goodsInfoId);
  }

  /**
   * 图片的显示隐藏,重新排序
   */
  @Action('change:changeAnnexMask')
  changeAnnexMask(state, { states, index }) {
    return state.set('annexMaskShow', !state.get('annexMaskShow'));
  }

  @Action('save:currentMatter')
  currentMatter(state, { matter, id }) {
    //加上选中状态
    let currentMatterList = [];
    matter.split(',').map((v) => {
      currentMatterList.push({
        img: v,
        checked: true
      });
    });
    return state
      .set('currentMatterList', fromJS(currentMatterList))
      .set('currentMatterId', id);
  }

  @Action('change:changeCheck')
  changeCheck(state, { value, index }) {
    return state.setIn(['currentMatterList', index, 'checked'], value);
  }

  @Action('choose:moments')
  chooseMoments(state, value) {
    return state.set('moments', value);
  }

  @Action('save:imageIndex')
  imageIndex(state, { matter, index }) {
    return state
      .set('imageList', matter.split(','))
      .set('chooseImageIndex', index);
  }

  @Action('toggle:imageModal')
  imageModal(state) {
    return state.set('imageModal', !state.get('imageModal'));
  }
}
