import { Store } from 'plume2';
import { fromJS } from 'immutable';
import {
  getRightsList,
  getUserInfo,
  queryPointsInfo,
  basicRules,
  getHotExchange
} from './webapi';

import CenterMemberActor from './actor/center-member-actor';
import { config } from 'wmkit/config';

export default class AppStore extends Store {
  getPointsInfo = async () => {
    let res = await queryPointsInfo();
    if (res.code !== config.SUCCESS_CODE) return;
    this.dispatch('userInfo: pointsAvailable', res.context.pointsAvailable);
  };

  basicRules = async () => {
    let res = await basicRules();
    if (res && res.code === config.SUCCESS_CODE && res.context.status === 1) {
      this.dispatch('userInfo:pointsIsOpen');
      const res = await getHotExchange();
      this.dispatch(
        'member-center: hotExchange',
        fromJS(res.context.pointsGoodsVOPage.content)
      );
    }
  };

  init = async () => {
    const res = await Promise.all([getRightsList(), getUserInfo()]);
    let gradeList = res[0].context.customerLevelVOList;
    let userInfo = res[1].context;
    /**1.基础信息和等级*/
    if (
      res[0].code == config.SUCCESS_CODE &&
      res[1].code == config.SUCCESS_CODE
    ) {
      this.dispatch('member-center: gradeList', fromJS(gradeList));
      this.dispatch('member-center: userInfo', fromJS(userInfo));
    } else {
      return false;
    }
    /**2.找到当前处于第几个等级*/
    let index = gradeList.findIndex((item) => {
      return userInfo.customerLevelId == item.customerLevelId;
    });
    /**3.当前的等级信息*/
    this.dispatch(
      'member-center: nowPossessGradeInfo',
      fromJS(gradeList[index])
    );
    /**4.这是 最后一个等级*/
    if (index + 1 == gradeList.length) {
      this.dispatch('member-center: isLastOne', true);
    } else {
      /**5.得到下一个等级的信息。处理未获得到的权益*/
      this.dispatch(
        'member-center: nextGradeInfo',
        fromJS(gradeList[index + 1])
      );
      let resultNextGradeList = [];
      gradeList.slice(index + 1).map((value) => {
        value.customerLevelRightsVOS.map((_data) => {
          let index = resultNextGradeList.findIndex((item) => {
            return item.rightsId == _data.rightsId;
          });
          if (index === -1) {
            resultNextGradeList.push({
              customerLevelId: value.customerLevelId,
              ..._data
            });
          }
        });
      });
      /**6.过滤已经获得的权益*/
      let data = resultNextGradeList
        .concat(gradeList[index].customerLevelRightsVOS)
        .filter((x) => {
          let d = gradeList[index].customerLevelRightsVOS.filter(
            (v) => v.rightsId == x.rightsId
          );
          return d.length == 0;
        });
      this.dispatch('member-center: notGetGradeList', fromJS(data));
    }
    this.transaction(() => {
      this.dispatch('member-center: gradeList', fromJS(gradeList));
      this.dispatch('member-center: userInfo', fromJS(userInfo));
    });
  };

  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new CenterMemberActor()];
  }
}
