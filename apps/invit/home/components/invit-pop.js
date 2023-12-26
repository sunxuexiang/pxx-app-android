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
import * as WMkit from 'wmkit/kit';
import * as share from 'wmkit/share';

import * as _ from '../../../../wmkit/common/util'; // added by scx
import { screenWidth, screenHeight, isAndroid } from 'wmkit/styles/index';

@Relax
export default class InvitPop extends React.Component {
  viewShot;
  static relaxProps = {
    closeInvitLayout: noop,
    setting: 'setting',
    inviteCode: 'inviteCode'
  };

  render() {
    const { closeInvitLayout, setting, inviteCode } = this.props.relaxProps;
    let shareImg;
    //分销员
    if (WMkit.isDistributor()) {
      //邀新开关打开
      if (setting.get('inviteFlag')) {
        shareImg = setting.get('inviteShareImg');
      }
    } else {
      //不是分销员，招募开关打开且为邀请注册
      if (setting.get('applyFlag') && setting.get('applyType')) {
        //展示邀请的转发海报
        shareImg = setting.get('recruitShareImg');
      }
      //邀新打开
      if (setting.get('inviteFlag')) {
        shareImg = setting.get('inviteShareImg');
      }
    }
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ViewShot
            ref={(viewShot) => (this.viewShot = viewShot)}
            options={{ format: 'jpg', quality: 0.9 }}
          >
            <ImageBackground
              style={styles.banner}
              resizeMode="cover"
              source={{ uri: shareImg }}
            >
              <View style={styles.imageContainer}>
                {!!inviteCode && (
                  <View style={styles.codeBox}>
                    <Image
                      style={styles.codeImg}
                      source={{ uri: inviteCode }}
                    />
                  </View>
                )}
                <Text style={styles.tip} allowFontScaling={false}>
                  长按识别小程序码
                </Text>
              </View>
            </ImageBackground>
          </ViewShot>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.onImageLoad(this.shareImageToFriends)}
            activeOpacity={0.8}
          >
            <Image source={require('../img/wecat.png')} style={styles.icon} />
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
              source={require('../img/circle-friend.png')}
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
              source={require('../img/picture.png')}
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
          activeOpacity={0.8}
          onPress={closeInvitLayout}
        >
          <Image style={styles.close} source={require('../img/close2.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  onImageLoad = (callBack) => {
    this.viewShot.capture().then((uri) => {
      RNFS.readFile(uri, 'base64').then((content) => {
        callBack(content);
      });
    });
  };

  saveImage = (img) => {
    RNFS.writeFile(RNFS.CachesDirectoryPath + '/invite-new.jpg', img, 'base64')
      .then(() => {
        return CameraRoll.saveToCameraRoll(
          RNFS.CachesDirectoryPath + '/invite-new.jpg',
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
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height: '100%',
    width: '100%',
    zIndex: 1000
  },
  banner: {
    width: screenWidth,
    height: '100%'
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginTop: 6,
    marginBottom: 15
  },
  imageContainer: {
    position: 'absolute',
    ..._.ifIphoneX(
      {
        bottom: 122
      },
      {
        bottom: isAndroid ? 112 : 112
      }
    ),
    right: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  codeBox: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 40,
    backgroundColor: '#fff'
  },
  codeImg: {
    width: 78,
    height: 78
  },
  tip: {
    fontSize: 12,
    color: '#333'
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
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
