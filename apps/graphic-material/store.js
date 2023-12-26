import { Store } from 'plume2';

import GraphicActor from './actor/graphic-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new GraphicActor()];
  }

  constructor(props) {
    super(props);
  }
  /**
   * 初始化列表
   * @returns {Promise<void>}
   */
  init = async (goodsInfoId) => {
    this.dispatch('getImages:sortEnclosures', goodsInfoId);
  };
  /**
   * 全文
   */
  changeText = (id) => {
    this.dispatch('change:visible', id);
  };
  /**
   * 分享弹窗的显示
   */
  changeShare = (matter, id) => {
    if (matter) {
      //存储当前选中的素材内容和素材id
      this.dispatch('save:currentMatter', { matter, id });
    } else {
      //关闭时，将moments标识置为false
      this.dispatch('choose:moments', false);
    }
    this.dispatch('change:shareVisible');
  };
  /**
   * 朋友圈分享成功弹窗显示
   */
  changeMoments = () => {
    this.dispatch('change:momentsSuccess');
  };
  /**
   * 改变附件弹窗的显示隐藏，对图片对象重新排序
   */
  changeAnnexMask = (states, index) => {
    this.dispatch('change:changeAnnexMask', { states, index });
  };

  changeCheck = (index, value) => {
    this.dispatch('change:changeCheck', { index, value });
  };

  moments = () => {
    this.dispatch('choose:moments', true);
  };

  updateNum = async (id) => {
    const { res } = await webApi.updateNum({ id: id });
  };

  saveImageIndex = (matter, index) => {
    //存储图片当前选中的索引
    this.dispatch('save:imageIndex', { matter, index });
    //显示预览弹窗
    this.toggleImageModal();
  };

  toggleImageModal = () => {
    this.dispatch('toggle:imageModal');
  };
}
