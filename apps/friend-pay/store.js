import { msg, Store } from 'plume2';
import * as webapi from './webapi';
import FriendPayActor from './actor/friend-pay';
import { share, config} from 'wmkit';
import { NativeModules, Platform } from 'react-native';


export default class AppStore extends Store {
  bindActor() {
    return [new FriendPayActor()];
  }

  init = (type, tid, results) => {
    // type ReplaceWechat 微信好友代付/ReplaceAlipay 支付宝好友代付
    // tid 实为路由传参parentId
    console.log('=======================> tid :',tid);
    console.log('=======================> results :',results);
    if (tid) {
      webapi.getFriendPayDataByTid(tid).then(res => {
        const { context } = res;
        console.log(context, '=======================> tid ');
        this.dispatch('friendPay: getFriendPayInfo', context);
      });
    } else {
      const length = results == null ? 0 : results.length;
      if (length > 1) {
        const parentId = results[0].parentTid;
        webapi.getFriendPayDataByParentId(parentId).then(res => {
          const { context } = res;
          this.dispatch('friendPay: getFriendPayInfo', context);
        });
      } else if (length === 1) {
        const tid1 = results[0].tid;
        webapi.getFriendPayDataByTid(tid1).then(res => {
          const { context } = res;
          this.dispatch('friendPay: getFriendPayInfo', context);
        });
      }
    }
  };

  handleShareToFriend(orderInfo, type) {
    const { tradeItems } = orderInfo;
    const title = tradeItems && tradeItems.length && tradeItems[0].spuName;
    const thumbUrl = tradeItems && tradeItems.length && tradeItems[0].pic;
    const param = {
      tradeNo: orderInfo && orderInfo.id,
      orderType: orderInfo && orderInfo.orderType,
      customerId: orderInfo && orderInfo.buyer && orderInfo.buyer.id,
      payType: type,
      parentTid: orderInfo && orderInfo.parentId,
      token: window.token
    };
    let JSONParam = '';
    for (let key in param) {
      JSONParam += `${key}=${param[key]}&`;
    }

    const webShareUrl = config.SHARE_WEN_URL;
    const params = {
      title,
      desc: '帮我付一下这个商品吧，谢谢啦~',
      url: `${webShareUrl}/pages/package-C/order/friend-pay/index?${JSONParam}`,
      thumbUrl,
      imgUrl: thumbUrl
    };
    console.log(params, orderInfo, `==================${window.token}=================>`);
    if (type === 'ReplaceWechat') {
      this.shareToWx(params);
    } else if (type === 'ReplaceAlipay') {
      this.shareToZFB(params);
    } else {
      msg.emit('app:tip', '抱歉，分享类型有误！');
    }
  }

  shareToWx = (params) => {
    share.shareToFriends({ ...params, description: params.desc });
  };

  shareToZFB = (params) => {
    if (Platform.OS === 'android') {
      NativeModules.AliShareModule.sendWebPageMessage(params, (code, result) => {
        console.log('------------------ >> android 支付宝好友代付结果：' + result);
      });
    } else if (Platform.OS === 'ios') {
      NativeModules.APRootViewController.sendWebByUrl(params, (code, result) => {
        console.log('------------------ >> ios 支付宝好友代付结果：' + result);
      });
    }
  };
}
