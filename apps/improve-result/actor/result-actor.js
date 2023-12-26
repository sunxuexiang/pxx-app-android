/**
 * Created by feitingting on 2017/9/7.
 */
import { Actor, Action } from 'plume2';
export default class ResultActor extends Actor {
  defaultState() {
    return {
      minutes: 5
    };
  }

  @Action('detail:time')
  time(state, time) {
    return state.set('minutes', time);
  }
}
