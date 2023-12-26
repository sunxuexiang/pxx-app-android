import { Store } from 'plume2';
import { fromJS } from 'immutable';

import EquityActor from './actor/equity-actor';
import { getRightsList, getUserInfo } from './webapi';

export default class AppStore extends Store {
  init = () => {};

  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new EquityActor()];
  }

  query = async (id) => {
    const res = await Promise.all([getRightsList(), getUserInfo()]);
    let gradeList = res[0].context.customerLevelVOList;
    let userInfo = res[1].context;

    //找到当前是第几个
    let index = gradeList.findIndex((item) => {
      return userInfo.customerLevelId == item.customerLevelId;
    });
    let atPresentEquityNum = gradeList.findIndex((item) => {
      return id == item.customerLevelId;
    });
    this.transaction(() => {
      this.dispatch('equity: atPresentEquityNum', atPresentEquityNum);
      this.dispatch('equity: gradeList', fromJS(gradeList));
    });
    let levelInfo = {};
    if (index + 1 == gradeList.length) {
      //如果相等 那他就是最后一个了
      this.dispatch('equity: isLastOne');
      levelInfo = {
        atPresentLevelName: userInfo.customerLevelName
      };
    } else {
      //组装一下数据
      levelInfo = {
        atPresentLevelName: userInfo.customerLevelName,
        nextLevelName: gradeList[index + 1].customerLevelName,
        needGrowthValue:
          gradeList[index + 1].growthValue - userInfo.customerGrowthValue
      };
    }
    this.dispatch('equity: levelInfo', fromJS(levelInfo));
    // this.init(gradeList,id);
  };

  dispatchAtPresentEquityNum = (data) => {
    this.dispatch('equity: atPresentEquityNum', data);
  };
}
