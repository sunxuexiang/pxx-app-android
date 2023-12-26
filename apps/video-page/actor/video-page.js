/**
 * Created by hht on 2017/9/4.
 */
import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class UserStoreActor extends Actor {
  defaultState() {
    return {
      activityTab: '1',
      videoPage:fromJS([]),
      customerId:'',
      loading:true,
      h5Url:''
    };
  }


  @Action('user:getH5Url')
  getH5Url(state, content) {
    return state.set('h5Url', fromJS(content));
  }
  @Action('user:activityTab')
  activityTab(state, content) {
    return state.set('activityTab', fromJS(content));
  }

  @Action('video:init')
  init(state, content) {
    return state.set('videoPage', fromJS(content));
  }

  @Action('user:customerId')
  customerId(state, content) {
    return state.set('customerId', fromJS(content));
  }


  @Action('video:loading')
  loading(state, content) {
    return state.set('loading', fromJS(content));
  }



}
