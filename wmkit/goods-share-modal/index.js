import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import ViewShot from '@wanmi/react-native-view-shot';
import { screenWidth, isAndroid } from 'wmkit/styles/index';
import WMImage from 'wmkit/image/index';
import * as share from 'wmkit/share';
import { cache } from 'wmkit/cache';
import Fetch from 'wmkit/fetch';
import { config } from 'wmkit/config';
import { Alert } from 'wmkit/modal/alert';
import Loading from 'wmkit/loading';

import * as _ from 'wmkit/common/util';

export default class ShareModal extends Component {
  viewShot;

  constructor(props) {
    super(props);
    this.state = {
      qrCode: '',
      logo: '',
      //初始化状态，默认true
      init: true
    };
  }

  async componentDidMount() {
    const {
      //商品SKU信息
      goodsInfo,
      //分享类型（1：店铺内，2：店铺外，3：拼团）
      shareType,
      addSelfShop,
      goods
    } = this.props;

    let params;
    //先生成小程序码
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const customerId = JSON.parse(loginData).customerId;
    const url =
      shareType == 1 || shareType == 2
        ? '/distribution/miniProgram-code/distributionMiniProgramQrCode'
        : `/groupon/invite/add/group/${this.props.grouponNo}`;
    //店铺外分享赚
    if (shareType == 2) {
      params = {
        skuId: goodsInfo.get('goodsInfoId'),
        inviteeId: customerId,
        channel: 'mall'
      };
    } else if (shareType == 1) {
      //店铺内分享赚，要传spuId
      params = {
        skuId: goodsInfo.get('goodsInfoId'),
        inviteeId: customerId,
        channel: 'shop',
        spuId: goodsInfo.get('goodsId')
      };
    } else {
      params = {};
    }

    Fetch('/system/baseConfig', {
      method: 'GET'
    }).then((res) => {
      if (res.code == 'K-000000') {
        if (res.context.pcLogo) {
          this.setState({
            logo: JSON.parse(res.context.pcLogo)[0].url
          });
        }
      }
    });
    if (addSelfShop) {
      Fetch('/distributor-goods/add', {
        method: 'POST',
        body: JSON.stringify({
          goodsInfoId: goodsInfo.get('goodsInfoId'),
          goodsId: goodsInfo.get('goodsId'),
          storeId: goodsInfo.get('storeId')
        })
      }).then((res) => {
        if (res.code != config.SUCCESS_CODE) {
          Alert({
            text: res.message
          });
        }
      });
    }

    //GET方式，不带body
    let body =
      shareType == 1 || shareType == 2
        ? { body: JSON.stringify(params) }
        : null;

    Fetch(url, {
      method: shareType == 1 || shareType == 2 ? 'POST' : 'GET',
      ...body
    }).then((result) => {
      if (result.code == 'K-000000') {
        this.setState({
          qrCode: result.context,
          init: false
        });
      } else {
        this.setState({
          init: true
        });
        msg.emit('app:tip', '生成码异常，稍后重试');
      }
    });
  }

  render() {
    const { goodsInfo, shareModalVisible, goods, shareType } = this.props;
    // 市场价与划线价
    const marketPrice =
      shareType == 3
        ? goodsInfo.get('grouponPrice')
        : goodsInfo.get('marketPrice') || 0;
    const buyPoint = shareType == 3 ? 0 : goodsInfo.get('buyPoint');
    const lineShowPrice = goods.get('linePrice');
    return !!shareModalVisible && !this.state.init ? (
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
                  uri: this.state.logo
                }}
              />
              {goodsInfo.get('goodsInfoImg') || goods.get('goodsImg') ? (
                <WMImage
                  style={styles.bigImg}
                  src={
                    goodsInfo.get('goodsInfoImg')
                      ? `${goodsInfo.get('goodsInfoImg')}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_120,h_120`
                      : `${goods.get('goodsImg')}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_120,h_120`
                  }
                />
              ) : (
                <Image
                  style={styles.bigImg}
                  resizeMode="contain"
                  source={require('./img/none.png')}
                />
              )}

              <View style={styles.info}>
                <View style={styles.titleBox}>
                  <Text
                    style={styles.title}
                    allowFontScaling={false}
                    numberOfLines={1}
                  >
                    {goodsInfo.get('goodsInfoName')}
                  </Text>
                  <Text
                    style={styles.spec}
                    allowFontScaling={false}
                    numberOfLines={1}
                  >
                    {goodsInfo.get('specText')}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    {
                      buyPoint > 0 &&   <Text
                        allowFontScaling={false}
                        style={styles.price}
                        allowFontScaling={false}
                      >
                        {buyPoint}
                        <Text style={{ fontSize: 15 }}>积分+</Text>
                      </Text>
                    }
                    <Text
                      allowFontScaling={false}
                      style={styles.price}
                      allowFontScaling={false}
                    >
                      <Text style={{ fontSize: 15 }}>¥</Text>
                      {_.addZero(marketPrice)}
                      &nbsp;&nbsp;
                    </Text>
                    <View style={styles.priceRight}>
                      {this.props.shareType == 3 && (
                        <View style={styles.pin}>
                          <Text
                            allowFontScaling={false}
                            style={{ color: '#fff', fontSize: 10 }}
                          >
                            拼团价
                          </Text>
                        </View>
                      )}
                      {!!lineShowPrice && (
                        <Text allowFontScaling={false} style={styles.exPrice}>
                          ¥{_.addZero(lineShowPrice)}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                {!!this.state.qrCode && (
                  <View style={styles.codeBox}>
                    <Image
                      style={{ width: 80, height: 80 }}
                      source={{ uri: this.state.qrCode }}
                    />
                    <Text style={styles.codeText} allowFontScaling={false}>
                      长按立即购买
                    </Text>
                  </View>
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
            <Image source={require('./img/wechat.png')} style={styles.icon} />
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
              source={require('./img/chatzone.png')}
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
              source={require('./img/photo-album.png')}
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
          onPress={() => {
            this.props.closeVisible && this.props.closeVisible();
            //底部tab栏显示
            // msg.emit('app:bottomVisible', {
            //   key: 'MaterialCircle',
            //   visible: true
            // });
          }}
        >
          <Image
            style={styles.close}
            source={require('./img/share-close.png')}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.shadow}>
        <Loading />
      </View>
    );
  }

  /**
   * 分享到朋友圈
   */
  shareImageToMoments = (img) => {
    share.shareImageToMoments(img);
  };

  /**
   * 分享到朋友
   */
  shareImageToFriends = (img) => {
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
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
  },
  pin: {
    backgroundColor: '#f91a53',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    width: 40
  },
  priceRight: {
    height: 40,
    width: 100
  }
});
