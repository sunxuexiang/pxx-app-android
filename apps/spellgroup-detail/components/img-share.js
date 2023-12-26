import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import ViewShot from '@wanmi/react-native-view-shot';
import { screenWidth, screenHeight, isAndroid } from 'wmkit/styles/index';
import * as share from 'wmkit/share';
import { noop } from 'wmkit/noop';

import * as _ from '../../../wmkit/common/util'; // added by scx
import { List } from 'immutable/dist/immutable';

@Relax
export default class ImgShare extends Component {
  viewShot;

  static relaxProps = {
    showImgShare: 'showImgShare',
    changeImgShareModal: noop,
    goodsInfo: 'goodsInfo',
    goodsInfos: 'goodsInfos',
    goods: 'goods',
    images: 'images',
    h5Url: 'h5Url',
    logo: 'logo',
    skuQrCode: 'skuQrCode'
  };

  render() {
    const {
      showImgShare,
      changeImgShareModal,
      goodsInfo,
      goods,
      images,
      h5Url,
      logo,
      goodsInfos,
      skuQrCode
    } = this.props.relaxProps;

    let saleType = goods.get('saleType');
    // 零售类型: 分享的信息与实际选中规格的sku保持一致
    let goodsInfoActual = goodsInfo;
    if (saleType === 0) {
      // 批发类型: 分享第一个上架的sku信息
      goodsInfoActual = goodsInfos.find(
        (skuInfo) => skuInfo.get('addedFlag') === 1
      );
    }

    // 市场价与划线价
    const marketPrice = goodsInfoActual.get('marketPrice') || 0;
    const lineShowPrice = goods.get('linePrice');
    let imgs = images || List.of();
    const mobileWebsite = h5Url.concat(
      `/goods-detail/${goodsInfoActual.get('goodsInfoId')}`
    );
    return (
      showImgShare && (
        <View style={styles.shadow}>
          <SafeAreaView style={{ flex: 1 }}>
            <ViewShot
              style={{ backgroundColor: '#fff' }}
              ref={(viewShot) => (this.viewShot = viewShot)}
              options={{ format: 'jpg', quality: 0.9 }}
            >
              <View style={styles.content}>
                <Image
                  style={styles.logo}
                  resizeMode="contain"
                  source={{
                    uri: logo
                  }}
                />
                {imgs.isEmpty() ? (
                  <Image
                    style={styles.bigImg}
                    resizeMode="contain"
                    source={require('../img/none.png')}
                  />
                ) : (
                  <Image
                    style={styles.bigImg}
                    resizeMode="contain"
                    source={{
                      uri: imgs && imgs.get(0)
                    }}
                  />
                )}
                <View style={styles.info}>
                  <View style={styles.titleBox}>
                    <Text
                      style={styles.title}
                      allowFontScaling={false}
                      numberOfLines={1}
                    >
                      {goodsInfoActual.get('goodsInfoName')}
                    </Text>
                    <Text
                      style={styles.spec}
                      allowFontScaling={false}
                      numberOfLines={1}
                    >
                      {goodsInfoActual.get('specText')}
                    </Text>
                    <Text style={styles.price} allowFontScaling={false}>
                      <Text style={{ fontSize: 15 }}>¥</Text>
                      {_.addZero(marketPrice)}
                      &nbsp;&nbsp;
                      {lineShowPrice && (
                        <Text style={styles.exPrice}>
                          ¥{_.addZero(lineShowPrice)}
                        </Text>
                      )}
                    </Text>
                    {/*<Text style={styles.spec} allowFontScaling={false}>*/}
                    {/*来自XXXXXX的店铺*/}
                    {/*</Text>*/}
                  </View>
                  {skuQrCode ? (
                    <View style={styles.codeBox}>
                      <Image
                        style={{ width: 80, height: 80 }}
                        source={{ uri: skuQrCode }}
                      />
                      <Text style={styles.codeText} allowFontScaling={false}>
                        长按立即购买
                      </Text>
                    </View>
                  ) : (
                    <QRCode
                      value={mobileWebsite}
                      size={80}
                      getRef={(c) => (this.svg = c)}
                    />
                  )}
                </View>
              </View>
            </ViewShot>
          </SafeAreaView>
          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.onImageLoad(this.shareImageToFriends)}
              activeOpacity={0.8}
            >
              <Image
                source={require('../img/wechat.png')}
                style={styles.icon}
              />
              <Text allowFontScaling={false} style={styles.navText}>
                微信好友
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.onImageLoad(this.shareImageToMoments)}
              activeOpacity={0.8}
            >
              <Image
                source={require('../img/chatzone.png')}
                style={styles.icon}
                activeOpacity={0.8}
              />
              <Text allowFontScaling={false} style={styles.navText}>
                朋友圈
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.8}
              onPress={() => this.onImageLoad(this.saveImage)}
            >
              <Image
                source={require('../img/photo-album.png')}
                style={styles.icon}
                activeOpacity={0.8}
              />
              <Text allowFontScaling={false} style={styles.navText}>
                保存到相册
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            opacity={0.8}
            onPress={() => changeImgShareModal()}
          >
            <Image
              style={styles.close}
              source={require('../img/share-close.png')}
            />
          </TouchableOpacity>
        </View>
      )
    );
  }

  /**
   * 分享到朋友圈
   */
  shareImageToMoments = (img) => {
    const { h5Url } = this.props.relaxProps;
    if (!h5Url) return;
    share.shareImageToMoments(img);
  };

  /**
   * 分享到朋友
   */
  shareImageToFriends = (img) => {
    const { h5Url } = this.props.relaxProps;
    if (!h5Url) return;
    share.shareImageToFriends(img);
  };

  saveImage = (img) => {
    RNFS.writeFile(RNFS.CachesDirectoryPath + '/b2b-qrcode.png', img, 'base64')
      .then(() => {
        return CameraRoll.saveToCameraRoll(
          RNFS.CachesDirectoryPath + '/b2b-qrcode.png',
          'photo'
        );
      })
      .then(() => {
        msg.emit('app:tip', '保存成功');
      });
  };

  onImageLoad = (callBack) => {
    this.viewShot.capture().then((uri) => {
      RNFS.readFile(uri, 'base64').then((content) => {
        callBack(content);
      });
    });
  };
}

const contentWidth = screenWidth;
const imgWidth = screenWidth * 0.8;
const styles = StyleSheet.create({
  shadow: {
    backgroundColor: '#fff',
    width: screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    flex: 1,
    zIndex: 1000
  },
  content: {
    backgroundColor: '#fff',
    marginTop: isAndroid ? 0 : 20,
    width: contentWidth,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 40,
    marginTop: 10,
    marginBottom: 10
  },
  bigImg: {
    width: imgWidth,
    height: imgWidth
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: imgWidth,
    paddingVertical: isAndroid ? 10 : 15
  },
  titleBox: {
    justifyContent: 'space-between',
    flex: 1
  },
  title: {
    color: '#000',
    fontSize: 14
  },
  spec: {
    fontSize: 13,
    color: '#333'
  },
  price: {
    color: '#ff1f4e',
    fontSize: 20
  },
  exPrice: {
    color: '#999',
    fontSize: 13,
    textDecorationLine: 'line-through'
  },
  code: {
    width: 56,
    height: 56
  },
  codeText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    color: '#333'
  },
  bottom: {
    width: contentWidth,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    ..._.ifIphoneX(
      {
        paddingBottom: 20
      },
      {
        paddingBottom: isAndroid ? 5 : 10
      }
    )
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5
  },
  item: {
    width: '33%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isAndroid ? 5 : 10
  },
  navText: {
    color: '#fff',
    fontSize: 12
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    ..._.ifIphoneX(
      {
        top: 50
      },
      {
        top: isAndroid ? 20 : 30
      }
    )
  },
  close: {
    tintColor: '#000',
    width: 29,
    height: 29
  }
});
