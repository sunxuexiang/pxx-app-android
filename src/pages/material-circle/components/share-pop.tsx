import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  NativeModules,
  PixelRatio
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { msg } from 'plume2';
import ViewShot from '@wanmi/react-native-view-shot';
import * as T from '../types';
import actions from '../actions/index';
import ImageViewer from 'react-native-image-zoom-viewer';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import Check from 'wmkit/check';
import WMImage from 'wmkit/image/index';

import * as _ from '../../../../wmkit/common/util'; // added by scx
import { screenWidth, screenHeight, isAndroid } from 'wmkit/styles/index';
import RNFS from 'react-native-fs';
import { share } from '@wanmi/react-native-share';
import main from '../../my-customer/reducers/main';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class SharePop extends React.Component<
Partial<IInfoProps>,
T.IInfoState
> {
  constructor(props: IInfoProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return main.shareVisible ? (
      <View style={styles.panelBottom}>
        <TouchableOpacity
          style={styles.mask}
          activeOpacity={0.8}
          onPress={() => action.changeShare()}
        />
        <View style={styles.panelBody}>
          {/*弹窗关闭按钮*/}
          <TouchableOpacity
            style={styles.closeBox}
            activeOpacity={0.8}
            onPress={() => {
              action.changeShare(null, null);
              action.moments(false);
            }}
          >
            <Image style={styles.close} source={require('../img/close.png')} />
          </TouchableOpacity>
          <View style={styles.titleBox}>
            <Text style={styles.title} allowFontScaling={false}>
              文案已复制，分享时请粘贴
            </Text>
          </View>
          <View style={styles.content}>
            <View style={styles.contentBox}>
              {main.matterType == 0
                ? main.currentMatterList.map((item, index) => {
                  return (
                    <View style={styles.imgBox} key={index}>
                      <WMImage src={item.imgSrc} />
                      <Check
                        style={styles.check}
                        disable={false}
                        checked={item.checked}
                        onCheck={(value) => action.changeCheck(index, value)}
                      />
                    </View>
                  );
                })
                : main.currentMatterList.map((item, index) => {
                  return (
                    <ViewShot
                      style={styles.imgBox}
                      key={index}
                      ref={(viewShot) =>
                        (this[`viewShot-${index}`] = viewShot)
                      }
                    >
                      <WMImage src={item.imgSrc} />
                      {item.linkSrc && (
                        <Image
                          style={styles.linkImg}
                          source={{ uri: item.linkSrc }}
                        />
                      )}
                      <Check
                        style={styles.check}
                        disable={false}
                        checked={item.checked}
                        onCheck={(value) => action.changeCheck(index, value)}
                      />
                    </ViewShot>
                  );
                })}
            </View>
            <Text style={styles.shareText} allowFontScaling={false}>
              请选择分享的图片
            </Text>
          </View>
          {main.moments ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.bottom}
              onPress={() => {
                if (
                  main.currentMatterList.filter((v) => v.checked == true)
                    .length == 0
                ) {
                  msg.emit('app:tip', '请选择分享的图片');
                } else {
                  this.shareImageToMoments();
                  action.moments(false);
                  //关闭当前弹窗
                  action.changeShare(null, null, null);
                  //弹出分享成功的弹窗
                  action.momentSuccess(true);
                  //分享次数加1
                  action.updataNum(main.currentMatterId);
                }
              }}
            >
              <Image
                source={require('../img/moments.png')}
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              <Text style={styles.text} allowFontScaling={false}>
                分享至朋友圈
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.bottom}
              onPress={() => this.shareImageToFriends()}
            >
              <Image
                source={require('../img/wechat.png')}
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              <Text style={styles.text} allowFontScaling={false}>
                分享给微信好友
              </Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    ) : null;
  }

  /**
   * 分享到朋友圈(朋友圈不支持多图唤起，所以点击的分享到朋友圈的时候只是将选择的图片下载到本地相册)
   */
  shareImageToMoments = async () => {
    let {
      actions: { action },
      main
    } = this.props;
    let { currentMatterList } = main;
    currentMatterList
      .filter((v) => v.checked == true)
      .map((item, index) => {
        this.cacheImage(item.imgSrc, index)
          .then(() => {
            return CameraRoll.saveToCameraRoll(this._cachePath(index), 'photo');
          })
          .then(() => { });
      });
  };

  onImageLoad = (callBack) => {
    let {
      actions: { action },
      main
    } = this.props;
    let { currentMatterList, matterType } = main;
    //素材推广
    currentMatterList.map((item, index) => {
      if (item.checked == true) {
        this[`viewShot-${index}`].capture().then((uri) => {
          callBack(uri, index);
        });
      }
    });
  };

  /**
   * 保存到相册(全部保存)
   */
  saveImage = (url, index) => {
    let {
      actions: { action },
      main
    } = this.props;
    return CameraRoll.saveToCameraRoll(url, 'photo').then(() => { });
  };

  /**
   * 缓存图片
   */
  cacheImage = (v, index) => {
    const res = RNFS.downloadFile({
      fromUrl: v,
      toFile: this._cachePath(index),
      background: true
    });
    return res.promise;
  };

  /**
   * 统一生成临时文件地址
   * @param index
   * @returns {string}
   * @private
   */
  _cachePath = (index) => {
    return `${RNFS.CachesDirectoryPath}-${index}-moments-matter.png`;
  };

  renderLoad = () => {
    let { main } = this.props;
    return <Image source={{ uri: main.imageList[main.imageIndex] }} />;
  };

  shareImageToFriends = async () => {
    let { currentMatterList, matterType } = this.props.main;
    let options;
    if (currentMatterList.filter((v) => v.checked == true).length == 0) {
      msg.emit('app:tip', '请选择要分享的图片');
    } else {
      if (matterType == 0) {
        let remoteImages = currentMatterList
          .filter((v) => v.checked == true)
          .map((item) => {
            return item.imgSrc;
          });
        options = { remoteImages: remoteImages };
      } else {
        let localImages = [];
        for (let i = 0; i < currentMatterList.length; i++) {
          if (currentMatterList[i].checked == true) {
            localImages.push(currentMatterList[i].imgSrc);
          }
        }
        console.log('444444444444444', localImages);
        options = { remoteImages: localImages };
      }
      share(options, this.callBack);
    }
  };

  callBack = (result) => {
    //更新分享次数
    let {
      actions: { action },
      main
    } = this.props;
    if (result) {
      action.updataNum(main.currentMatterId);
      msg.emit('app:tip', '分享成功');
    } else {
      msg.emit('app:tip', '分享失败');
    }
  };
}

const imgWidth = (screenWidth - 55) / 3;

const styles = StyleSheet.create({
  panelBottom: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    flex: 1,
    height: '100%',
    zIndex: 1000
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panelBody: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: isAndroid ? 10 : 0,
    left: 0,
    width: screenWidth,
    maxHeight: screenHeight * 0.8,
    backgroundColor: '#fff'
  },
  closeBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
    zIndex: 100
  },
  close: {
    width: 16,
    height: 16
  },
  titleBox: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ececec',
    marginBottom: 10
  },
  title: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center'
  },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    paddingBottom: 15,
    paddingHorizontal: 15
  },
  contentBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    //justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  imgBox: {
    width: imgWidth,
    height: imgWidth,
    marginBottom: 5,
    marginRight: 8
  },
  check: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  shareText: {
    marginTop: 10,
    fontSize: 13,
    color: '#333',
    textAlign: 'center'
  },
  bottom: {
    height: 36,
    width: screenWidth - 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,102,0,0.06)',
    borderRadius: 18,
    marginHorizontal: 12,
    marginTop: 10,
    ..._.ifIphoneX(
      {
        marginBottom: 14
      },
      {
        marginBottom: 0
      }
    )
  },
  text: {
    fontSize: 12,
    color: '#333'
  },
  linkImg: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    right: 0
  }
});
