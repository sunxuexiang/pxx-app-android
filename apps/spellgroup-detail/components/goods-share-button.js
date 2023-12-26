import React, { Component } from 'react';
import { TouchableOpacity, Image, Platform, Clipboard } from 'react-native';
import { Relax, msg } from 'plume2';

import * as share from 'wmkit/share';
import { noop } from 'wmkit/noop';

const isAndroid = Platform.OS === 'android';

@Relax
export default class GoodsShareButton extends Component {
  static relaxProps = {
    changeShareModal: noop,
    h5Url: 'h5Url'
  };

  render() {
    const { h5Url, changeShareModal } = this.props.relaxProps;
    return (
     (
        <TouchableOpacity onPress={() => changeShareModal()}>
          <Image
            style={{
              width: 25,
              height: 25
            }}
            source={require('../img/share.png')}
          />
        </TouchableOpacity>
      )
    );
  }

  /**
   * 分享到朋友圈
   */
  shareToMoments = () => {
    const { goodsInfo, images, h5Url } = this.props.relaxProps;

    let image = goodsInfo.get('goodsInfoImg')
      ? goodsInfo.get('goodsInfoImg')
      : images.filter((f) => f).get(0);

    share.shareToMoments({
      url: `${
        h5Url.endsWith('/') ? h5Url.substring(0, h5Url.length - 1) : h5Url
      }/goods-detail/${goodsInfo.get('goodsInfoId')}`,
      title: `${goodsInfo.get(
        'goodsInfoName'
      )}，我发现了一件好货，赶快来看看吧...`,
      description: '我发现了一件好货，赶快来看看吧...',
      imgUrl: image
    });
  };

  /**
   * 分享到朋友
   */
  shareToFriends = () => {
    const { goodsInfo, images, h5Url } = this.props.relaxProps;

    let image = goodsInfo.get('goodsInfoImg')
      ? goodsInfo.get('goodsInfoImg')
      : images.filter((f) => f).get(0);

    share.shareToFriends({
      url: `${
        h5Url.endsWith('/') ? h5Url.substring(0, h5Url.length - 1) : h5Url
      }/goods-detail/${goodsInfo.get('goodsInfoId')}`,
      title: goodsInfo.get('goodsInfoName'),
      description: '我发现了一件好货，赶快来看看吧...',
      imgUrl: image
    });
  };

  /**
   * 复制链接
   */
  copy = async () => {
    const { goodsInfo, h5Url } = this.props.relaxProps;
    Clipboard.setString(
      `${
        h5Url.endsWith('/') ? h5Url.substring(0, h5Url.length - 1) : h5Url
      }/goods-detail/${goodsInfo.get('goodsInfoId')}`
    );
    msg.emit('app:tip', '复制链接成功');
  };
}
