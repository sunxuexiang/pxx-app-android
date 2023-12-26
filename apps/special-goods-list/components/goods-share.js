import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PixelRatio,
  Clipboard
} from 'react-native';
import { Relax, msg } from 'plume2';

import { screenHeight, screenWidth, mainColor, isAndroid } from 'wmkit/styles';
import { noop, _, share, Check, WMkit } from 'wmkit';

@Relax
export default class GoodsShare extends Component {
  static relaxProps = {
    showShare: 'showShare',
    changeShowShare: noop,
    images: 'images',
    checkedSku: 'checkedSku',
    h5Url: 'h5Url',
    toggleShareModal: noop,
    addSelfShop: 'addSelfShop',
    changeAddSelfShop: noop
  };

  render() {
    const {
      showShare,
      changeShowShare,
      checkedSku,
      addSelfShop,
      changeAddSelfShop
    } = this.props.relaxProps;
    // 社交电商相关内容显示与否
    const social = true;

    return (
      showShare && (
        <View style={styles.slideMenu}>
          <TouchableOpacity
            style={[styles.mask]}
            onPressIn={() => changeShowShare()}
            activeOpacity={0.8}
          />
          <View style={styles.menuContainer}>
            <View style={styles.container}>
              <View>
                <View style={[styles.header, social && styles.socialHeader]}>
                  {social ? (
                    <View style={styles.socialText}>
                      <Text style={[styles.socialTitle, { color: mainColor }]} allowFontScaling={false}>
                        赚 {_.addZero(checkedSku.get('distributionCommission'))}
                      </Text>
                      <Text style={styles.socialTips} allowFontScaling={false}>
                        好友通过你分享的链接购买商此商品，你就能赚
                        {_.addZero(checkedSku.get('distributionCommission'))}
                        的利润~
                      </Text>
                    </View>
                  ) : (
                    <Text allowFontScaling={false} style={styles.title}>
                      分享给好友
                    </Text>
                  )}
                </View>
                <View style={styles.shareBox}>
                  {/* <TouchableOpacity
                    style={styles.item}
                    onPress={() => this.shareToFriends()}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={require('../img/wechat.png')}
                      style={styles.icon}
                    />
                    <Text allowFontScaling={false} style={styles.navtext}>
                      微信好友
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => this.shareToMoments()}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={require('../img/chatzone.png')}
                      style={styles.icon}
                      activeOpacity={0.8}
                    />
                    <Text allowFontScaling={false} style={styles.navtext}>
                      朋友圈
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => this.copy()}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={require('../img/link.png')}
                      style={styles.icon}
                      activeOpacity={0.8}
                    />
                    <Text allowFontScaling={false} style={styles.navtext}>
                      复制链接
                    </Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => this._shareGoods()}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={require('../img/photo-album.png')}
                      style={styles.icon}
                      activeOpacity={0.8}
                    />
                    <Text allowFontScaling={false} style={styles.navtext}>
                      图文分享
                    </Text>
                  </TouchableOpacity>
                </View>
                {social && (
                  <View style={styles.socialShare}>
                    <Check
                      checked={addSelfShop}
                      onCheck={(value) => changeAddSelfShop(value)}
                    />
                    <Text style={styles.shareText} allowFontScaling={false}>
                      分享此商品后添加至我的店铺
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => changeShowShare()}
                  style={styles.btn}
                  activeOpacity={0.8}
                >
                  <Text allowFontScaling={false} style={styles.btntext}>
                    取消分享
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )
    );
  }

  /**
   * 分享到朋友圈
   */
  shareToMoments = () => {
    const { goodsInfo, images, h5Url } = this.props.relaxProps;

    if (!h5Url) return;

    let image = goodsInfo.get('goodsInfoImg')
      ? goodsInfo.get('goodsInfoImg')
      : images.filter((f) => f).get(0);

    share.shareToMoments({
      url: `${h5Url}/goods-detail/${goodsInfo.get('goodsInfoId')}`,
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

    if (!h5Url) return;

    let image = goodsInfo.get('goodsInfoImg')
      ? goodsInfo.get('goodsInfoImg')
      : images.filter((f) => f).get(0);

    share.shareToFriends({
      url: `${h5Url}/goods-detail/${goodsInfo.get('goodsInfoId')}`,
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

    if (!h5Url) return;

    Clipboard.setString(
      `${h5Url}/goods-detail/${goodsInfo.get('goodsInfoId')}`
    );
    msg.emit('app:tip', '复制链接成功');
  };

  /**
   * 图文分享
   */
  _shareGoods = () => {
    const { toggleShareModal } = this.props.relaxProps;
    // //如果是分销员，弹出店铺外分享的弹框,并携带相关参数
    if (WMkit.isDistributor()) {
      toggleShareModal();
    }
  };
}

const styles = StyleSheet.create({
  slideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    flex: 1,
    zIndex: 1000
  },
  mask: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    width: screenWidth,
    height: isAndroid ? screenHeight - 25 : screenHeight
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff'
  },
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  header: {
    height: 40,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
    color: '#333'
  },
  btn: {
    height: 50,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#ececec',
    borderTopWidth: 1 / PixelRatio.get(),
    ..._.ifIphoneX(
      {
        marginBottom: 14
      },
      {
        marginBottom: 0
      }
    )
  },
  btntext: {
    color: '#666666',
    fontSize: 16
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  shareBox: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  item: {
    width: (screenWidth - 20) / 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  navtext: {
    color: '#363636',
    fontSize: 14
  },
  socialHeader: {
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  socialText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialTitle: {
    fontSize: 16
  },
  socialTips: {
    marginTop: 15,
    color: '#333',
    fontSize: 12
  },
  socialShare: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  shareText: {
    color: '#333',
    fontSize: 13,
    marginLeft: 10
  }
});
