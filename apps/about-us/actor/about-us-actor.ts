import { Action, Actor } from 'plume2';

export default class AboutUsActor extends Actor {
  defaultState() {
    return {
      // 关于我们
      context: ''
    };
  }

  /**
   * 获取关于我们
   * @param state
   * @param context
   * @returns {any}
   */
  @Action('about: us: context')
  fetchAboutUsContext(state, context) {
    return state.set('context', context);
  }
}
