/**
 * Created by feitingting on 2017/12/19.
 */
import { Store, msg } from 'plume2';
import { fromJS, List } from 'immutable';
import { Confirm } from 'wmkit/modal/confirm';
import { config } from 'wmkit/config';
import AttentionActor from './actor/attention-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new AttentionActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 编辑
   * @param isEdit
   */
  changeEditStatus = () => {
    this.dispatch('store:edit');
  };

  /**
   * 取消关注，弹出提示框
   */
  deleteAttention = () => {
    const deleteIds = this.state()
      .get('checkedStoreIds')
      .toJS();
    if (deleteIds.length == 0) {
      msg.emit('app:tip', '请选择需要取消关注的店铺');
    } else {
      Confirm({
        title: '取消关注',
        text: '确定要取消关注所选店铺？',
        cancelText: '取消',
        okText: '确定',
        okFn: async () => {
          const res = await webApi.cancelStoreAttention({
            storeIds: deleteIds
          });
          if (res.code == 'K-000000') {
            msg.emit('app:tip', '取消关注成功');
            this.state().get('toRefresh')();
          } else {
            msg.emit('app:tip', res.message);
          }
        }
      });
    }
  };

  /**
   * 店铺列表ListView查询得到的数据返回处理
   */
  handleDataReached = (data) => {
    if (data.code !== config.SUCCESS_CODE) {
      return false;
    }
    const storeContext = data.context;
    this.setCheckedStore(List());
    this.transaction(() => {
      this.dispatch(
        'store:mergeStoreIds',
        fromJS(storeContext.content.map((store) => store.storeId))
      );
      this.dispatch('store:size', storeContext.totalElements);
      this.dispatch('store:setEdit');
    });
  };

  /**
   *设置勾选的店铺
   */
  setCheckedStore = (checkedStoreIds) => {
    this.dispatch('store:setCheckedStore', checkedStoreIds);
  };

  /**
   * 初始话刷新method
   * @param toRefresh
   */
  initToRefresh = (toRefresh) => {
    this.dispatch('store:toRefresh', toRefresh);
  };
}
