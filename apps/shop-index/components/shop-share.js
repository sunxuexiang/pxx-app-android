import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import ViewShot from '@wanmi/react-native-view-shot';
import RNFS from 'react-native-fs';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';
import * as share from 'wmkit/share';

import { screenWidth, screenHeight } from 'wmkit/styles/index';
import Bottom from '../../store-attention/components/bottom';

@Relax
export default class ShopShare extends React.Component {
  viewShot;
  static relaxProps = {
    shareVisible: 'shareVisible',
    baseInfo: 'baseInfo',
    shopShareCode: 'shopShareCode',
    customerInfo: 'customerInfo',
    closeShareVisible: noop
  };

  render() {
    const {
      shareVisible,
      closeShareVisible,
      baseInfo,
      shopShareCode,
      customerInfo
    } = this.props.relaxProps;
    let customerName =
      customerInfo.size > 0 ? customerInfo.get('customerName') : '';
    if (customerName.length == 11 && customerName.indexOf('****') != -1) {
      customerName = customerName.substring(6);
    }
    return shareVisible ? (
      <View style={styles.container}>
        <ViewShot
          ref={(viewShot) => (this.viewShot = viewShot)}
          options={{ format: 'jpg', quality: 0.9 }}
        >
          <ImageBackground
            style={styles.banner}
            resizeMode="cover"
            source={{ uri: baseInfo.get('shopShareImg') }}
          >
            <View style={styles.head}>
              <Image
                style={styles.headImg}
                source={
                  customerInfo.get('headImg')
                    ? { uri: customerInfo.get('headImg') }
                    : require('../img/default-img.png')
                }
              />
              <Text allowFontScaling={false} style={styles.storeText}>
                {customerName}
                的店铺
              </Text>
            </View>
            <View style={styles.imageContainer}>
              {!!shopShareCode && (
                <Image style={styles.xxc} source={{ uri: shopShareCode }} />
              )}
              <Text style={styles.tip} allowFontScaling={false}>
                长按识别小程序码
              </Text>
            </View>
          </ImageBackground>
        </ViewShot>

        <View style={styles.viewBox}>
          <TouchableOpacity
            style={styles.icon}
            activeOpacity={0.8}
            onPress={() => this.onImageLoad(this.shareImageToFriends)}
          >
            <Image style={styles.img} source={require('../img/wecat.png')} />
            <Text style={styles.iconName} allowFontScaling={false}>
              微信好友
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.icon}
            onPress={() => this.onImageLoad(this.shareImageToMoments)}
          >
            <Image
              style={styles.img}
              source={require('../img/circle-friend.png')}
            />
            <Text style={styles.iconName} allowFontScaling={false}>
              朋友圈
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            activeOpacity={0.8}
            onPress={() => this.onImageLoad(this.saveImage)}
          >
            <Image style={styles.img} source={require('../img/picture.png')} />
            <Text style={styles.iconName} allowFontScaling={false}>
              保存到相册
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.closeBox}
          activeOpacity={0.8}
          onPress={() => closeShareVisible()}
        >
          <Image style={styles.close} source={require('../img/close2.png')} />
        </TouchableOpacity>
      </View>
    ) : null;
  }

  onImageLoad = (callBack) => {
    this.viewShot.capture().then((uri) => {
      RNFS.readFile(uri, 'base64').then((content) => {
        callBack(content);
      });
    });
  };

  saveImage = (img) => {
    RNFS.writeFile(RNFS.CachesDirectoryPath + '/share-shop.jpg', img, 'base64')
      .then(() => {
        return CameraRoll.saveToCameraRoll(
          RNFS.CachesDirectoryPath + '/share-shop.jpg',
          'photo'
        );
      })
      .then(() => {
        msg.emit('app:tip', '保存成功');
      });
  };

  /**
   * 分享到朋友
   */
  shareImageToFriends = (img) => {
    share.shareImageToFriends(img);
  };

  /**
   * 分享到朋友圈
   */
  shareImageToMoments = (img) => {
    share.shareImageToMoments(img);
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#F7F1EB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: screenWidth,
    height: screenHeight - 10,
    top: 0
  },
  closeBox: {
    position: 'absolute',
    right: 23,
    top: 60
  },
  storeText: {
    marginLeft: 10,
    color: '#333',
    fontSize: 14
  },
  close: {
    width: 29,
    height: 29
  },
  banner: {
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    color: '#333',
    marginTop: 22
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginTop: 6,
    marginBottom: 15
  },
  imageContainer: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: screenHeight * 0.6
  },
  xxc: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 40,
    backgroundColor: '#fff'
  },
  tip: {
    fontSize: 12,
    color: '#333'
  },
  viewBox: {
    width: screenWidth,
    height: screenHeight * 0.15,
    backgroundColor: 'rgba(000,000,000,0.4)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 0
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 50,
    height: 50
  },
  iconName: {
    fontSize: 12,
    color: '#fff',
    marginTop: 6
  },
  headImg: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  head: {
    marginTop: 30,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  }
});
