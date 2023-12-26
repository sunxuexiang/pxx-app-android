import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Clipboard
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import ViewShot from '@wanmi/react-native-view-shot';
import { msg } from 'plume2';
import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { Const } from 'wmkit/const';
import WMImage from 'wmkit/image/index';

import moment from 'moment';
import { mainColor } from 'wmkit/styles/index';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
const imgWidth = (screenWidth - 55) / 3;

type IMarketingMatericalItemProps = T.IProps & T.IMarketingMatericalItemProps;

@connect<Partial<IMarketingMatericalItemProps>, T.IMarketingMatericalItemState>(
  store2Props,
  actions
)
export default class MarketingMatericalItem extends React.Component<
Partial<IMarketingMatericalItemProps>,
T.IMarketingMatericalItemState
> {
  constructor(props: IMarketingMatericalItemProps) {
    super(props);
    this.state = {
      key: this.props.matterItem.id,
      textHeight: 0
    };
  }

  componentDidMount() {
    const { key } = this.state;
    if (this.refs[key]) {
      setTimeout(() => {
        this.refs[key] &&
          this.refs[key].measure((x, y, width, height, pageX, pageY) => {
            this.setState({
              textHeight: height
            });
          });
      }, 1000);
    }
  }

  render() {
    let {
      actions: { action },
      main,
      matterItem,
      onSpread
    } = this.props;
    let visible = main.visibleMap[this.state.key];
    return (
      <View style={styles.matericalItem}>
        <View style={styles.top}>
          <Image
            style={styles.ImgBox}
            source={{
              uri:
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2656778362,978133463&fm=27&gp=0.jpg'
            }}
          />
          <View style={styles.name}>
            <View style={styles.nameTop}>
              <Text allowFontScaling={false}>官方精选</Text>
              <Text style={styles.nameBottom}>
                {moment(matterItem.updateTime).format(Const.DATE_FORMAT)}
              </Text>
            </View>
            <Text style={styles.nameBottom} allowFontScaling={false}>
              <Text style={{ color: '#ff6600' }}>
                {matterItem.recommendNum}
              </Text>
              次分享
            </Text>
          </View>
        </View>
        <Text
          ref={this.state.key}
          style={styles.recomand}
          numberOfLines={this.state.textHeight > 105 && !visible ? 5 : 99}
        >
          {matterItem.recommend}
        </Text>
        <TouchableOpacity
          style={styles.allBox}
          onPress={() => onSpread()}
          activeOpacity={0.8}
        >
          <Text style={[styles.allText, { color: mainColor }]} allowFontScaling={false}>
            {this.state.textHeight > 105
              ? this.props.visible
                ? '收起'
                : '全文'
              : null}
          </Text>
          {this.state.textHeight > 105 && (
            <Image
              source={require('../img/d-arrow.png')}
              style={[this.props.visible && styles.upArrow, styles.dArrow]}
            />
          )}
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {matterItem.matter &&
            JSON.parse(matterItem.matter).map((item, index) => {
              return (
                <ViewShot
                  ref={(viewShot) => (this[`viewShot-${index}`] = viewShot)}
                  options={{ format: 'jpg', quality: 0.9 }}
                >
                  <TouchableOpacity
                    style={{ marginBottom: 10 }}
                    key={Math.random()}
                    activeOpacity={0.8}
                    onPress={() => {
                      action.saveImageIndex(matterItem.matter, index, false);
                    }}
                  >
                    <WMImage
                      key={index}
                      resizeMode="contain"
                      style={styles.image}
                      zoom={false}
                      src={item.imgSrc}
                    />
                    {item.linkSrc && (
                      <Image
                        style={styles.linkImg}
                        source={{ uri: item.linkSrc }}
                      />
                    )}
                  </TouchableOpacity>
                </ViewShot>
              );
            })}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={styles.rowFlex}
            activeOpacity={0.8}
            onPress={() => {
              //先复制文案
              Clipboard.setString(matterItem.recommend);
              this.onImageLoad(this.saveImage);
              //更新分享次数
              action.updataNum(matterItem.id);
            }}
          >
            <Image
              style={styles.downImg}
              source={require('../img/download.png')}
            />
            <Text style={styles.downText} allowFontScaling={false}>
              &nbsp;保存图片
            </Text>
          </TouchableOpacity>
          <View style={styles.rowFlex2}>
            <Text style={styles.shareText} allowFontScaling={false}>
              分享到:&nbsp;&nbsp;
            </Text>
            <TouchableOpacity
              style={[styles.shareBox, styles.shareBox1]}
              activeOpacity={0.8}
              onPress={() => {
                //先复制文案
                Clipboard.setString(matterItem.recommend);
                action.changeShare(1, matterItem.id, matterItem.matter);
                action.moments(true);
              }}
            >
              <Image
                style={styles.shareImg}
                source={require('../img/moments.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareBox}
              activeOpacity={0.8}
              onPress={() => {
                //先复制文案
                Clipboard.setString(matterItem.recommend);
                action.changeShare(1, matterItem.id, matterItem.matter);
              }}
            >
              <Image
                style={styles.shareImg}
                source={require('../img/wechat.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 保存到相册(全部保存)
   */
  saveImage = (url, index) => {
    return CameraRoll.saveToCameraRoll(url, 'photo').then(() => {
      msg.emit('app:tip', '文案已复制，图片已保存');
    });
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
    return `${RNFS.CachesDirectoryPath}-${index}-matter.png`;
  };

  onImageLoad = (callBack) => {
    const { matterItem } = this.props;
    JSON.parse(matterItem.matter).map((item, index) => {
      this[`viewShot-${index}`].capture().then((uri) => {
        callBack(uri, index);
      });
    });
  };
}

const styles = StyleSheet.create({
  matericalItem: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 8
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  ImgBox: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20
  },
  name: {
    //fontSize: 13,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameTop: {
    flexDirection: 'column'
  },
  nameBottom: {
    color: '#999',
    fontSize: 12
  },
  recomand: {
    fontSize: 13,
    lineHeight: 18
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    //justifyContent:'space-between',
    marginTop: 10
  },
  image: {
    width: imgWidth,
    height: imgWidth,
    borderColor: '#ebebeb',
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 5
    //marginLeft:10
    //marginTop:10,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f5f5f5'
  },
  rowFlex2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  downImg: {
    width: 13,
    height: 12
  },
  allBox: {
    padding: 10,
    paddingLeft: 0
  },
  allText: {
    fontSize: 13
  },
  linkImg: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 0
  },
  downText: {
    fontSize: 12,
    color: '#333'
  },
  shareBox: {
    width: 24,
    height: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shareBox1: {
    marginRight: 8
  },
  shareText: {
    fontSize: 12,
    color: '#333'
  },
  shareImg: {
    width: 13,
    height: 12
  },
  dArrow: {
    width: 13,
    height: 12,
    marginLeft: 4
  },
  upArrow: {
    transform: [{ rotate: '180deg' }]
  }
});
