import { Store } from 'plume2';
import { fromJS } from 'immutable';

import GrowthActor from './actor/growth-actor';
import { getRightsList, getUserInfo, basicRules } from './webapi';
import { config } from 'wmkit/config';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new GrowthActor()];
  }

  /**
   * 会员中心初始化数据
   */
  init = async () => {
    const res = await Promise.all([
      getRightsList(),
      getUserInfo(),
      basicRules()
    ]);
    if (
      res[0].code == config.SUCCESS_CODE &&
      res[1].code == config.SUCCESS_CODE &&
      res[2].code == config.SUCCESS_CODE
    ) {
      let gradeList = res[0].context.customerLevelVOList;
      let userInfo = res[1].context;
      let basicRules = res[2].context;
      let index = gradeList.findIndex((item) => {
        return userInfo.customerLevelId == item.customerLevelId;
      });
      this.dispatch('growth-value: basicRules', fromJS(basicRules));
      let levelInfo = {};
      if (index + 1 == gradeList.length) {
        this.dispatch('growth-value: isLastOne');
        levelInfo = {
          atPresentLevelName: userInfo.customerLevelName,
          nowHaveGrowthValue: userInfo.customerGrowthValue
        };
      } else {
        //组装一下数据
        levelInfo = {
          atPresentLevelName: userInfo.customerLevelName,
          nextLevelName: gradeList[index + 1].customerLevelName,
          needGrowthValue:
            gradeList[index + 1].growthValue - userInfo.customerGrowthValue,
          nowHaveGrowthValue: userInfo.customerGrowthValue,
          nextGrowthValue: gradeList[index + 1].growthValue
        };
      }
      this.dispatch('growth-value: levelInfo', fromJS(levelInfo));
    }
  };

  /**
   * 商品分类的显示隐藏
   */
  changeLayer = () => {
    this.dispatch('change: layerVisible');
  };
}
