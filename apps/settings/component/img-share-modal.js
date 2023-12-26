import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import ViewShot from '@wanmi/react-native-view-shot';
import RNFS from 'react-native-fs';
import { screenWidth, screenHeight, isAndroid } from 'wmkit/styles/index';
import * as share from 'wmkit/share';
import { noop } from 'wmkit/noop';
import * as WMPermission from 'wmkit/permission';


const cachePath = RNFS.CachesDirectoryPath + '/b2b-qrcode.png';

@Relax
export default class ImgShareModal extends Component {
  viewShot;

  static relaxProps = {
    shareInfo: 'shareInfo',
    changeImgShareVisible: noop
  };

  render() {
    const { shareInfo, changeImgShareVisible } = this.props.relaxProps;

    return (
      <View style={styles.shadow}>
        <ViewShot
          style={{backgroundColor: '#fff'}}
          ref={(viewShot) => (this.viewShot = viewShot)}
          options={{format: 'jpg', quality: 0.9}}
        >
          <View style={styles.content}>
            <Image
              style={styles.bigImg}
              resizeMode="contain"
              source={{
                uri: shareInfo.get('shareImg')
              }}
            />
          </View>
          <View style={styles.shareLine}>
            <View style={styles.triangleLeft}/>
            <View style={styles.lineBox}>
              <Image
                style={styles.line}
                source={require('../img/share-line.png')}
              />
            </View>
            <View style={styles.triangleRight}/>
          </View>
        </ViewShot>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.shareImageToFriends()}
            activeOpacity={0.8}
          >
            <Image source={require('../img/wechat.png')} style={styles.icon} />
            <Text allowFontScaling={false} style={styles.navText}>
              微信好友
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.shareImageToMoments()}
            activeOpacity={0.8}
          >
            <Image
              source={require('../img/friends.png')}
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
          onPress={() => changeImgShareVisible(false)}
        >
          <Image
            style={styles.close}
            source={require('../img/share-close.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * 分享到朋友圈
   */
  shareImageToMoments = async () => {
    this.cacheImage().then(() => {
      RNFS.readFile(cachePath, 'base64').then((img) => {
        share.shareImageToMoments(img);
      });
    });
  };

  /**
   * 分享到朋友
   */
  shareImageToFriends = () => {
    this.cacheImage().then(() => {
      RNFS.readFile(cachePath, 'base64').then((img) => {
        share.shareImageToFriends(img);
      });
    });
  };

  /**
   * 保存到相册
   */
  saveImage = () => {
    this.cacheImage()
      .then(() => {
        return CameraRoll.saveToCameraRoll(cachePath, 'photo');
      })
      .then(() => {
        msg.emit('app:tip', '保存成功');
      });
  };

  onImageLoad = (callBack) => {
    if(WMPermission.saveImage()) {
      this.viewShot.capture().then((uri) => {
        RNFS.readFile(uri, 'base64').then((content) => {
          callBack(content);
        });
      });
    }
  };

  /**
   * 缓存图片
   */
  cacheImage = () => {
    const res = RNFS.downloadFile({
      fromUrl: this.props.relaxProps.shareInfo.get('shareImg'),
      toFile: cachePath,
      background: true
    });
    return res.promise;
  };
}

const contentWidth = screenWidth * 0.8;
const imgWidth = screenWidth * 0.68;
const styles = StyleSheet.create({
  shadow: {
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1000
  },
  content: {
    backgroundColor: '#fff',
    width: contentWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  logo: {
    width: 120,
    height: 40,
    marginTop: 10,
    marginBottom: isAndroid ? 5 : 10
  },
  bigImg: {
    width: imgWidth,
    height: imgWidth
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: imgWidth,
    paddingVertical: isAndroid ? 5 : 10
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
    fontSize: 12,
    color: '#333'
  },
  price: {
    color: '#ff1f4e',
    fontSize: 16,
    height: 22
  },
  exPrice: {
    color: '#999',
    fontSize: 12,
    textDecorationLine: 'line-through'
  },
  code: {
    width: 56,
    height: 56
  },
  codeText: {
    fontSize: 9,
    marginTop: 5,
    color: '#333'
  },
  shareLine: {
    width: contentWidth,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  triangleLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: '#fff',
    borderRightWidth: 0,
    borderRightColor: '#fff',
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: '#fff'
  },
  lineBox: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  line: {
    width: '100%',
    height: 0.5
  },
  triangleRight: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: '#fff',
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    borderLeftWidth: 0,
    borderLeftColor: '#fff',
    borderBottomWidth: 8,
    borderBottomColor: '#fff'
  },
  bottom: {
    width: contentWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingBottom: isAndroid ? 0 : 10
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: isAndroid ? 5 : 10
  },
  item: {
    width: '33%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isAndroid ? 5 : 10
  },
  navText: {
    color: '#333',
    fontSize: 12
  },
  closeButton: {
    marginTop: 15
  },
  close: {
    width: 42,
    height: 42
  }
});
