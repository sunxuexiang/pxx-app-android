/**
 * Created by hht on 2017/9/4.
 */
import { Store, msg } from 'plume2';

import * as webapi from './webapi';
import SignActor from './actor/sign-actor';
import * as _ from 'wmkit/common/util';
import { config } from 'wmkit/config';
import { Alert } from 'wmkit/modal/alert';

import { fromJS } from 'immutable';

export default class AppStore extends Store {
  bindActor() {
    return [new SignActor()];
  }

  init = async () => {
    const res = await Promise.all([
      webapi.getUserInfo(),
      webapi.getSignRecordList(),
      webapi.pointsRules(),
      webapi.growthValueIsOpen()
    ]);
    //查询热门兑换
    this.getCenterData();
    if (
      res &&
      res[0].code == config.SUCCESS_CODE &&
      res[1].code == config.SUCCESS_CODE &&
      res[2].code == config.SUCCESS_CODE &&
      res[3].code == config.SUCCESS_CODE
    ) {
      this.transaction(() => {
        this.dispatch(
          'signRecord:list',
          res[1].context.customerSignRecordVOList
        );
        this.dispatch('userInfo:set', res[0].context.customerVO);
        this.dispatch('signPoint:set', res[0].context.signPoint);
        this.dispatch('pointsFlag: set', res[0].context.pointFlag);
        this.dispatch('signFlag: change', res[0].context.signFlag);
        this.dispatch('growthFlag: set', res[0].context.growthFlag);
        this.dispatch('growthValue: set', res[0].context.growthValue);
        if (res[2].context.status === 1) {
          this.dispatch('sign:pointsIsOpen');
        }
        if (res[3].context.open) {
          this.dispatch('sign:growthValueIsOpen');
        }
        let dayNumArr = Array();
        res[1].context.customerSignRecordVOList.forEach((v) => {
          let oneDay = _.formatDate(v.signRecord).split(' ')[0];
          let dayStr = oneDay.split('-')[2];
          dayNumArr.push(Number(dayStr));
        });
        console.log('===================dateSign-store-dayNumArr:', dayNumArr);
        this.dispatch('dayNumArr:set', dayNumArr);
      });
    } else {
      msg.emit('app:tip', '您的网络不给力!');
    }
  };

  /**
   * 签到
   */
  sign = async () => {
    const res = await webapi.doSign();
    const res1 = await webapi.getUserInfo();
    let successMessage = '签到成功';
    if (res.code == config.SUCCESS_CODE) {
      const pointsIncrease = res1.context.signPoint;
      // 成长值总开关
      let growthValueIsOpen = this.state().get('growthValueIsOpen');
      // 积分总开关
      let pointsIsOpen = this.state().get('pointsIsOpen');
      // 签到是否可以获取积分
      let pointsFlag = this.state().get('pointsFlag');
      // 签到是否可以获取成长值
      let growthFlag = this.state().get('growthFlag');

      //弹框
      if (pointsIsOpen && pointsFlag && growthValueIsOpen && growthFlag) {
        successMessage =
          successMessage +
          ',恭喜您获得' +
          pointsIncrease +
          '积分,' +
          this.state().get('growthValue') +
          '成长值';
      } else if (pointsIsOpen && pointsFlag) {
        successMessage =
          successMessage + ',恭喜您获得' + pointsIncrease + '积分';
      } else if (growthValueIsOpen && growthFlag) {
        successMessage =
          successMessage +
          ',恭喜您获得' +
          this.state().get('growthValue') +
          '成长值';
      }
      Alert({ text: successMessage });
      //this.init();
      this.transaction(() => {
        this.dispatch('signFlag: change', true);
        let today = new Date(Date.now()).getDate();
        let dayNumArr = this.state().get('dayNumArr');
        dayNumArr.push(today);
        this.dispatch('dayNumArr:set', dayNumArr);
        let userInfo = this.state().get('userInfo').toJS();
        userInfo.signContinuousDays = userInfo.signContinuousDays + 1;
        this.dispatch('userInfo:set', fromJS(userInfo));
      });
    } else {
      msg.emit('app:tip', res.message);
    }
  };

    /**
     * 热门兑换列表
     */
    getCenterData = async ()=> {
      const res = await webapi.findHotExchange(10);
      if (res.code == config.SUCCESS_CODE) {
        this.dispatch('hotExchange:set', res.context.pointsGoodsVOPage.content);
      }
    };

}
