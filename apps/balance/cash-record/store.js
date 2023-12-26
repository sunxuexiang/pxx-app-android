import { Store, msg } from 'plume2';
import { config } from 'wmkit/config';
import { Confirm } from 'wmkit/modal/confirm';
import * as WMkit from 'wmkit/kit';

import DrawCashActor from './actor/draw-cash-actor';
import * as webapi from './webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new DrawCashActor()];
  }

  /**
   * 对请求数据的处理
   * @param result
   */
  dealData = (result) => {
    const { code, context, message } = result;
    if (context && context['first']) {
      this.initToRefresh(false);
    }
    if (code != config.SUCCESS_CODE) {
      Confirm({
        text: message,
        okFn: () => msg.emit('router: goToNext', { routeName: 'UserCenter' }),
        okText: '确定'
      });
    }
  };

  /**
   * 存储wmlistview组件的初始化方法,用于刷新
   * @param _init
   */
  initToRefresh = (flag) => {
    this.dispatch('cash: list: initial', flag);
  };

  /**
   * tab 页签切换事件
   * @param id
   */
  onTabChange = (key) => {
    this.dispatch('top:active', key);

    this.dispatch('form:audit:status', null);
    this.dispatch('form:finish:status', null);
    this.dispatch('form:customer:operate:status', null);

    if (key != 0) {
      this.dispatch('form:customer:operate:status', 0);
      if (key === 1) {
        this.dispatch('form:audit:status', 0);
      } else if (key === 2) {
        this.dispatch('form:audit:status', 1);
      } else if (key === 3) {
        this.dispatch('form:finish:status', 1);
      }
    }

    this.initToRefresh(true);
  };

  /**
   * 取消单个提现单申请
   * @param drawCashId
   */
  cancelDrawCash = async (drawCashId) => {
    const data = await webapi.sendCancel(drawCashId);
    if (data.code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '操作成功');
      this.initToRefresh(true);
    } else {
      Confirm({
        text: data.message,
        okBtn: '确定',
        okFn: () =>
          msg.emit('router: goToNext', {
            routeName: 'BalanceCashRecord'
          })
      });
    }
  };
}
