import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class EvaluateActor extends Actor {
  defaultState() {
    return {
      //评价相关信息是否展示
      isShow: false,
      //top3评价信息
      top3Evaluate: {},
      //大图模式图片数组
      bigImgList: [],
      //查看大图
      findBigImage: false,
      //获取图片地址
      bigImgIndex: 0
    };
  }

  @Action('evaluateActor:isShow')
  setIsShow(state, flag) {
    return state.set('isShow', flag);
  }

  @Action('evaluateActor:top3Evaluate')
  setTop3Evaluate(state, result) {
    const list = result.listResponse.goodsEvaluateVOList;
    let bigImglist = [];
    list.map((v) => {
      const evaluateImageList = v.evaluateImageList;
      if (evaluateImageList != null) {
        bigImglist.push(...evaluateImageList);
      }
    });
    return state
      .set('top3Evaluate', fromJS(result))
      .update('bigImgList', (imgs) => imgs.concat(fromJS(bigImglist)));
  }

  //查看大图
  @Action('evaluateActor:findBigPicture')
  findBigPicture(state, value) {
    return state.set('findBigImage', value);
  }

  //获取图片地址
  @Action('evaluateActor:bigImgIndex')
  setEvaluate(state, value) {
    const bigImgList = state.get('bigImgList');
    let index = 0;
    bigImgList.map((v, i) => {
      if (v.get('imageId') == value) {
        index = i;
      }
    });
    return state.set('bigImgIndex', index);
  }

  @Action('evaluateActor:changeIndex')
  changeIndex(state, val) {
    return state.set('bigImgIndex', val);
  }
}
