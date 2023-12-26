import { Store } from 'plume2';
import PointsActor from './actor/points-actor';
import { queryPointsInfo, basicRules, queryWillExpirePoints } from './webapi';
import { config } from 'wmkit/config';
import { fromJS } from 'immutable';

export default class AppStore extends Store {
  bindActor() {
    return [new PointsActor()];
  }

  constructor(props) {
    super(props);
    if (__DEV__) {
      window._store = this;
    }
  }

  init = async () => {
    const res = await queryPointsInfo();
    const willExpirePoints = await queryWillExpirePoints();
    if (res.code !== config.SUCCESS_CODE || willExpirePoints.code !== config.SUCCESS_CODE) return;
    this.transaction(() => {
      this.dispatch('points:value', res.context.pointsAvailable);
      this.dispatch('points:willExpire', fromJS(willExpirePoints.context));
    });
  };

  expirePoints = async () => {
    const res = await queryWillExpirePoints();
    if (res.code !== config.SUCCESS_CODE) return;
    this.dispatch('points:willExpire', fromJS(res.context));
  };

  rule = async () => {
    const res = await basicRules();
    if (res.code !== config.SUCCESS_CODE) return;
    this.dispatch('points:rule', res.context.remark);
  };

  /**
   * 商品分类的显示隐藏
   */
  changeLayer = () => {
    this.dispatch('change: layerVisible');
  };
}
