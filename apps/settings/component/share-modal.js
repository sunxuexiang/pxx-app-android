import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PixelRatio,
  Clipboard
} from 'react-native';
import { msg, Relax } from 'plume2';
import { mainColor, screenHeight, screenWidth, panelColor } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import * as share from 'wmkit/share';

import * as _ from '../../../wmkit/common/util'; // added by scx
const isAndroid = Platform.OS === 'android';

@Relax
export default class ShareModal extends Component {
  static relaxProps = {
    shareInfo: 'shareInfo',
    changeModelVisible: noop,
    changeImgShareVisible: noop
  };

  render() {
    const { changeModelVisible, changeImgShareVisible } = this.props.relaxProps;
    return (
      <View style={styles.slideMenu}>
        <TouchableOpacity
          style={[styles.mask]}
          onPressIn={() => changeModelVisible(false)}
          activeOpacity={0.8}
        />
        <View style={styles.menuContainer}>
          <View style={styles.container}>
            <View>
              <View style={styles.header}>
                <Text allowFontScaling={false} style={styles.title}>
                  分享给好友
                </Text>
              </View>
              <View style={styles.shareBox}>
                <TouchableOpacity
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
                    source={require('../img/friends.png')}
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
                    source={require('../img/linking.png')}
                    style={styles.icon}
                    activeOpacity={0.8}
                  />
                  <Text allowFontScaling={false} style={styles.navtext}>
                    复制链接
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => changeImgShareVisible(true)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={require('../img/photo-word.png')}
                    style={styles.icon}
                    activeOpacity={0.8}
                  />
                  <Text allowFontScaling={false} style={styles.navtext}>
                    图文分享
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => changeModelVisible(false)}
                  style={[styles.btn, { backgroundColor: panelColor }]}
                  activeOpacity={0.8}
                >
                  <Text allowFontScaling={false} style={[styles.btntext, { color: mainColor }]}>
                    取消分享
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 分享到朋友圈
   */
  shareToMoments = () => {
    const {
      title,
      desc,
      icon,
      downloadUrl
    } = this.props.relaxProps.shareInfo.toJS();
    share.shareToMoments({
      url: downloadUrl,
      title: title,
      description: desc,
      imgUrl: icon
    });
  };

  /**
   * 分享到朋友
   */
  shareToFriends = () => {
    const {
      title,
      desc,
      icon,
      downloadUrl
    } = this.props.relaxProps.shareInfo.toJS();
    share.shareToFriends({
      url: downloadUrl,
      title: title,
      description: desc,
      imgUrl: icon
    });
  };

  /**
   * 复制链接
   */
  copy = async () => {
    const { downloadUrl } = this.props.relaxProps.shareInfo.toJS();
    Clipboard.setString(downloadUrl);
    msg.emit('app:tip', '复制链接成功');
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    width: screenWidth
  },
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  header: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)'
  },
  btn: {
    height: 36,
    // width: screenWidth,
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
    ),
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 18
  },
  btntext: {
    fontSize: 14
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 7
  },
  shareBox: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navtext: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12
  }
});
