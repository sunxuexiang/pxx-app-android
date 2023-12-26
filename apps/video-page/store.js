/**
 * Created by hht on 2017/9/4.
 */
import { msg, Store } from 'plume2';
import { Confirm } from 'wmkit/modal/confirm';
import { config } from 'wmkit/config';
import * as WMkit from 'wmkit/kit';
import AsyncStorage from '@react-native-community/async-storage';
import { cache } from 'wmkit/cache';
import * as webApi from './webapi';
import VideoPageActor from './actor/video-page';
import { fromJS } from 'immutable';
import _ from 'lodash'

export default class AppStore extends Store {
  bindActor() {
    return [new VideoPageActor()];
  }

  init = async() => {
    this.dispatch('video:loading', true);
    this.fetchBaseConfig();
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const customerId = loginData ? JSON.parse(loginData).customerId : ''
    this.dispatch('user:customerId', customerId);

    const params = {
      pageSize:10,
      pageNum:0,
      customerId
    }
    const { code, context, message } = await webApi.pageVideo(params);
    if (code === config.SUCCESS_CODE){
      this.dispatch('video:init', context.videoManagementVOPage.content);
    } else {
      msg.emit('app:tip', message);
    }
    this.dispatch('video:loading', false);
  }

  //播放次数统计
  getVideoById=async(videoId)=>{
    let customerId = this.state().get('customerId');
    const params = {
      customerId: customerId,
        videoId
    }
    await webApi.getVideoById(params);
    await this.filterVideoplayFew(videoId)
  }

  //重置播放次数
  filterVideoplayFew = (videoId)=>{
    const videoPage = this.state().get('videoPage').toJS();
    let newvideoPage = _.cloneDeep(videoPage);

    const currentIndex = videoPage.findIndex(item=>{
      return item.videoId == videoId
    })
    newvideoPage[currentIndex].playFew = videoPage[currentIndex].playFew + 1;
    this.dispatch('video:init', newvideoPage);
  }

  
  //重置点赞
  fliterLike = (videoId,likeIt) => {
    let videoPage = this.state().get('videoPage').toJS();
    let num = -1;
    if (likeIt == 1) {
      num = 1
    }
    const currentIndex = videoPage.findIndex(item=>{
      return item.videoId == videoId
    })
    videoPage[currentIndex].likeIt = likeIt
    videoPage[currentIndex].videoLikeNum = videoPage[currentIndex].videoLikeNum + num
    this.dispatch('video:init', videoPage);
  }

  //下拉加载页面
  refreshPage = async (pageNum) => {
    const params = {
      pageSize:10,
      pageNum,
      customerId:this.state().get('customerId')
    }
    const { code, context, message } = await webApi.pageVideo(params);
    const oldData = this.state().get('videoPage').toJS();

    if (code === config.SUCCESS_CODE && context.videoManagementVOPage.content.length > 0){
      let newData = oldData.concat(context.videoManagementVOPage.content)
      this.dispatch('video:init', newData);
    } else {
      // msg.emit('app:tip', message);
    }
  }

  //点赞
  addVideoLike=async(videoId)=>{
    const params = {
      videoLikeVO: {
        customerId: this.state().get('customerId'),
        videoId
      }
    }
    const { code, context, message } = await webApi.addVideoLike(params);
    if (code === config.SUCCESS_CODE) {
      this.fliterLike(videoId,1)
    } else {
      msg.emit('app:tip', message);
    }
  }

  //取消点赞
  cancelVideoLike=async(videoId)=>{
    const params = {
      videoLikeVO: {
        customerId: this.state().get('customerId'),
        videoId
      }
    }
    const { code, context, message } = await webApi.cancelVideoLike(params);
    if (code === config.SUCCESS_CODE) {
      this.fliterLike(videoId,0)
    } else {
      msg.emit('app:tip', message);
    }
  }

  /**
   * 切换tab栏
   * @returns {Promise.<void>}
   */
  changeTab = async (tab) => {
    this.dispatch('user:activityTab', tab);
  };

  /**
   * 获取h5地址，用于分享
   */
  fetchBaseConfig = async () => {
    const { code, context, message } = await webApi.fetchBaseConfig();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('user:getH5Url', context.mobileWebsite);
    } else {
      msg.emit('app:tip', message);
    }
  };

  
}
