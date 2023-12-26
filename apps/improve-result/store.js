/**
 * Created by feitingting on 2017/9/7.
 */
import { Store } from 'plume2';
import ResultActor from './actor/result-actor';
export default class AppStore extends Store {
  bindActor() {
    return [new ResultActor()];
  }

  /**
   * 倒计时每次事件减1秒
   */
  setTime = () => {
    const time = this.state().get('minutes');
    this.dispatch('detail:time', time - 1);
  };
}
