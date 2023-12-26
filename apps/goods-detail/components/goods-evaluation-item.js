import React, { Component } from 'react';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';
import { Const } from 'wmkit/const';
import Rating from 'wmkit/rating';
import { PixelRatio, StyleSheet, View, Text, Image } from 'react-native';
import { screenWidth } from 'wmkit/styles/index';

const defaultImg = require('../img/default-img.png');
const windowWidth = window.innerWidth;
@Relax
export default class GoodsEvaluationItem extends Component {
  static relaxProps = {
    top3Evaluate: 'top3Evaluate',
    showBigImg: noop,
    iepInfo: 'iepInfo',
    checkEnterpriseEnable: 'checkEnterpriseEnable'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      top3Evaluate,
      iepInfo,
      checkEnterpriseEnable
    } = this.props.relaxProps;
    const evaluateResp = top3Evaluate.getIn([
      'listResponse',
      'goodsEvaluateVOList'
    ]);

    ///企业购信息
    const { iepLogo, iepCustomerName } = iepInfo;

    return evaluateResp.map((v) => {
      const isEnterpriseCustomer = this._iepHandle(v);

      return (
        <View style={styles.item} key={v.get('evaluateId')}>
          <View style={styles.head}>
            <View style={styles.user}>
              <Image
                style={styles.userImg}
                source={
                  v.get('isAnonymous') == 0 && v.get('headimgurl')
                    ? { uri: v.get('headimgurl') || defaultImg }
                    : defaultImg
                }
              />
              <Text
                style={styles.userName}
                numberOfLines={1}
                allowFontScaling={false}
              >
                {v.get('isAnonymous') ? '匿名' : v.get('customerName')}
              </Text>
              {checkEnterpriseEnable && isEnterpriseCustomer ? (
                <View style={styles.iepLabel}>
                  {iepLogo && (
                    <Image style={styles.imgLogo} source={{ uri: iepLogo }} />
                  )}
                  <Text>
                    {iepLogo && (
                      <Text style={styles.labelName}>{iepCustomerName}</Text>
                    )}
                  </Text>
                </View>
              ) : null}
            </View>
            <Rating
              rating={v.get('evaluateScore')}
              disabled={true}
              style={styles.rating}
            />
          </View>
          <Text allowFontScaling={false} style={styles.text} numberOfLines={2}>
            {v.get('evaluateContent')}
          </Text>
          {v.get('evaluateImageList') && (
            <View style={styles.evaluateImg}>
              <View style={styles.imgList}>
                {this._Img(v.get('evaluateImageList'))}
              </View>
              {/* <View style={styles.imgTag}>
                <Text style={styles.whiteText} allowFontScaling={false}>
                  共{v.get('evaluateImageList').size}张
                </Text>
              </View> */}
            </View>
          )}
        </View>
      );
    });
  }

  _Img = (imgList) => {
    const { showBigImg } = this.props.relaxProps;
    return imgList.map((v, k) => {
      if (k < 4) {
        return (
          <View
            style={styles.imgItem}
            key={v.get('imageId')}
            onClick={() => showBigImg(v.get('imageId'))}
          >
            <WMImage
            style={styles.imgSty}
              src={v.get('artworkUrl')}
              zoom
            />
          </View>
        );
      }
    });
  };

  /**
   * 判断是否是企业会员
   * @param value
   * @private
   */
  _iepHandle = (value) => {
    const { checkEnterpriseEnable } = this.props.relaxProps;
    if (checkEnterpriseEnable) {
      const customerLabelList = value.get('customerLabelList');
      return (
        customerLabelList &&
        customerLabelList.indexOf(Const.customerLabel.IEPCustomer) > -1
      );
    } else {
      return false;
    }
  };
}

const imgWidth = (screenWidth - 50) / 4;

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#fff',
    paddingVertical: 10
  },
  head: {
    marginBottom: 10,
    alignItems: 'flex-start'
  },
  user: {
    flexDirection: 'row'
  },
  userImg: {
    width: 36,
    height: 36,
    marginRight: 8,
    borderRadius: 19
  },
  userName: {
    color: '#333',
    flexDirection: 'row',
    fontWeight: 'bold',
    marginRight: 5
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '400',
    fontSize: 12,
    height: 38
  },
  evaluateImg: {
    marginTop: 15
  },
  imgList: {
    flexDirection: 'row'
  },
  imgItem: {
    width: imgWidth,
    height: imgWidth,
    marginRight: 10
  },
  imgTag: {
    position: 'absolute',
    bottom: 3,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 12,
    width: 31,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  whiteText: {
    color: '#333',
    fontSize: 10
  },
  iepLabel: {
    marginLeft: 2,
    height: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: 3,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  imgLogo: {
    width: 11,
    height: 11,
    marginRight: 3
  },
  labelName: {
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 2,
    color: 'rgb(255, 214, 132)'
  },
  rating: {
    marginLeft: 46,
    position: 'absolute',
    bottom: 0
  },
  imgSty:{
    width:imgWidth,
    height:imgWidth,
    borderColor:'#eee',
    borderWidth:1
  }
});
