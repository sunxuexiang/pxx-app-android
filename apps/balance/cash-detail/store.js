import { Store, msg } from 'plume2';
import { config } from 'wmkit/config';
import { Confirm } from 'wmkit/modal/confirm';
import { init, getLinkedAccountInfo, sendCancel } from './webapi';
import DetailActor from './actor/detail-actor';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new DetailActor()];
  }

  /**
   * 初始化数据
   */
  init = async (drawCashId) => {
    // 提现记录详情
    const data = await init(drawCashId);
    if (data.code == config.SUCCESS_CODE) {
      const vo = data.context.customerDrawCashVO;
      this.transaction(() => {
        this.dispatch('draw:cash:detail:fetch', vo);
        this.dispatch('draw:cash:detail:set:id', drawCashId);
      });
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

    // 提现账户信息
    const accountInfo = await getLinkedAccountInfo();
    if (accountInfo.code == config.SUCCESS_CODE) {
      const headImgUrl = accountInfo.context.headimgurl;
      this.dispatch('draw:cash:detail:head:img', headImgUrl);
    }
  };

  /**
   * 取消单个提现单申请
   * @param drawCashId
   */
  cancelDrawCash = async (drawCashId) => {
    const data = await sendCancel(drawCashId);
    if (data.code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '操作成功');
      msg.emit('router: goToNext', {
        routeName: 'BalanceCashRecord'
      });
      msg.emit('router: refreshRoute', {
        routeName: 'BalanceCashRecord'
      });
    } else {
      Confirm({
        text: data.message,
        okBtn: '确定',
        okFn: () => {
          msg.emit('router: goToNext', {
            routeName: 'BalanceCashRecord'
          });

          msg.emit('router: refreshRoute', {
            routeName: 'BalanceCashRecord'
          });
        }
      });
    }
  };
}
