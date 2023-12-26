import React from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  Clipboard,
  Platform
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import { msg } from 'plume2';
import * as T from '../types';
import moment from 'moment';
import WMImage from 'wmkit/image/index';
import { Const } from 'wmkit/const';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
import {openSettings, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import OpenSettings from '@wanmi/react-native-open-settings';
type IMatericalItemProps = T.IProps & T.IMatericalItemProps;

@connect<Partial<IMatericalItemProps>, T.IMatericalItemState>(
  store2Props,
  actions
)
export default class MatericalItem extends React.Component<
Partial<IMatericalItemProps>,
T.IMatericalItemState
> {
  constructor(props: IMatericalItemProps) {
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

  /**

*/
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
              <Text style={styles.nameBottom} allowFontScaling={false}>
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
          allowFontScaling={false}
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
          {matterItem.matter.split(',').map((v, index) => {
            return (
              <TouchableOpacity
                style={{ marginBottom: 10 }}
                key={Math.random()}
                activeOpacity={0.8}
                onPress={() => {
                  action.saveImageIndex(matterItem.matter, index, false);
                }}
              >
                <WMImage
                  key={Math.random()}
                  resizeMode="contain"
                  style={styles.image}
                  zoom={false}
                  src={v}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        {main.customer && main.customer.forbiddenFlag == 0 ? (
          <TouchableOpacity
            style={styles.shareContainer}
            activeOpacity={0.8}
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'GoodsDetail',
                skuId: matterItem.goodsInfo.goodsInfoId
              })
            }
          >
            <View style={styles.middle}>
              <Image
                resizeMode="contain"
                style={styles.shareImage}
                source={
                  matterItem.goodsInfo.goodsInfoImg
                    ? { uri: matterItem.goodsInfo.goodsInfoImg }
                    : require('../img/none.png')
                }
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.goodsName} numberOfLines={1}>
                  {matterItem.goodsInfo.goodsInfoName}
                </Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.goodsPrice} allowFontScaling={false}>
                    {`￥${matterItem.goodsInfo.marketPrice}`}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                action.saveCheckedSku(matterItem.goodsInfo);
                //重新分享赚的时候加入店铺
                action.setAddSelfShop();
                action.toggleGoodsShare(false);
              }}
              style={styles.shareBtnBox}
            >
              <LinearGradient
                colors={[mainColor, mainColor]}
                style={styles.btnBox2}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text allowFontScaling={false} style={styles.btnText2}>
                  分享赚
                  {matterItem.goodsInfo.distributionCommission}元
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </TouchableOpacity>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5
          }}
        >
          <TouchableOpacity
            style={styles.rowFlex}
            activeOpacity={0.8}
            onPress={() => {
              //先复制文案
              Clipboard.setString(matterItem.recommend);
              action.updataNum(matterItem.id);
              this.saveImage(matterItem.matter);
              //更新分享次数
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
                action.changeShare(0, matterItem.id, matterItem.matter);
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
                action.changeShare(0, matterItem.id, matterItem.matter);
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
  saveImage = async (matter) => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]);
        const cameraGrant = grants[PermissionsAndroid.PERMISSIONS.CAMERA];
        if (cameraGrant !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('提示', '暂时无法获取到相机授权', [
                {text: '取消', style: 'cancel'},
                {text: '打开设置', onPress: this._openSettings}
            ]);
            return;
        }
        const storageGrant =
            grants[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];
        if (storageGrant !== PermissionsAndroid.RESULTS.GRANTED) {

            Alert.alert('提示', '暂时无法获取到存储授权', [
                {text: '取消', style: 'cancel'},
                {text: '打开设置', onPress: this._openSettings}
            ]);
            return;
        }
        const matterList = matter.split(',');
        matterList.map((v, index) => {
          this.cacheImage(v, index)
            .then(() => {
              return CameraRoll.saveToCameraRoll(this._cachePath(index), 'photo');
            })
            .then(() => {
              msg.emit('app:tip', '文案已复制，图片已保存');
            });
        });
      } catch (err) {
        console.warn(err);
      }
    } else {
      request(PERMISSIONS.IOS.PHOTO_LIBRARY)
            .then((res) => {
                if (res != RESULTS.GRANTED) {
                    Alert.alert('提示', '暂时无法获取到相册授权', [
                        {text: '取消', style: 'cancel'},
                        {text: '打开设置', onPress: this._openSettings}
                    ]);
                } else {
                  const matterList = matter.split(',');
                  matterList.map((v, index) => {
                    this.cacheImage(v, index)
                      .then(() => {
                        return CameraRoll.saveToCameraRoll(this._cachePath(index), 'photo');
                      })
                      .then(() => {
                        msg.emit('app:tip', '文案已复制，图片已保存');
                      }).catch(()=>{
                      });
                  });
                    }
                }
            )
          }
  };

  _openSettings() {
    return Platform.OS === 'ios' ? openSettings() : OpenSettings.openSettings();
  }

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
}

const imgWidth = (screenWidth - 55) / 3;
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
  },
  shareContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
    flex: 1
  },
  shareImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 8
  },
  middle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  goodsName: {
    fontSize: 10,
    color: '#333',
    flexWrap: 'wrap'
  },
  goodsPrice: {
    fontSize: 12,
    color: '#ff6600'
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  commission: {
    fontSize: 12,
    color: '#333'
  },
  shareBtnBox: {
    alignItems: 'center'
  },
  allText: {
    fontSize: 13
  },
  dArrow: {
    width: 13,
    height: 12,
    marginLeft: 4
  },
  upArrow: {
    transform: [{ rotate: '180deg' }]
  },
  allBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnBox2: {
    marginLeft: 5,
    height: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  btnText2: {
    color: '#fff',
    fontSize: 10
  }
});
