import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { Const } from 'wmkit/const';
import Rating from 'wmkit/rating';
import WMImage from 'wmkit/image/index';

import { screenWidth, mainColor } from 'wmkit/styles/index';
import moment from 'moment';

type IItemProps = T.IProps & T.IItemProps;

const defaultImg = require('../img/default-img.png');
@connect<Partial<IItemProps>, T.IItemState>(store2Props, actions)
export default class EvaluateItem extends React.Component<
  Partial<IItemProps>,
  T.IItemState
> {
  constructor(props: IItemProps) {
    super(props);
    this.state = {
      key: this.props.item.evaluateId,
      textHeight: 0
    };
  }

  componentDidMount() {
    const { key } = this.state;
    if (this.refs[key]) {
      setTimeout(() => {
        this.refs[key] && this.refs[key].measure((x, y, width, height, pageX, pageY) => {
          this.setState({
            textHeight: height
          });
        });
      }, 1000);
    }
  }

  render() {
    const {
      actions: { action },
      main,
      item,
      onSpread
    } = this.props;
    this._zanEvent(item);
    const {
      checkEnterpriseEnable,
      iepInfo: { iepLogo, iepCustomerName }
    } = main;
    const isEnterpriseCustomer = this._iepHandle(item);
    return (
      <View key={item.evaluateId} style={styles.item}>
        <View style={styles.header}>
          <View style={styles.headerImg}>
            <Image
              style={styles.img}
              source={
                item.isAnonymous == 0 && item.headimgurl
                  ? { uri: item.headimgurl }
                  : defaultImg
              }
            />
            <View style={styles.headerText}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={styles.darkText}
                  allowFontScaling={false}
                >
                  {item.isAnonymous == 0 ? item.customerName : '匿名'}
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <Rating rating={item.evaluateScore} disabled={true} />
              </View>
            </View>
          </View>
          <Text allowFontScaling={false} style={styles.greyText}>
            {moment(item.evaluateTime).format('YYYY-MM-DD')}
          </Text>
        </View>

        <Text
          ref={this.state.key}
          style={styles.evaluateContent}
          allowFontScaling={false}
          numberOfLines={
            this.state.textHeight > 105 && !this.props.visible ? 5 : 99
          }
        >
          {item.evaluateContent}
        </Text>

        {this.state.textHeight > 105 && (
          <TouchableOpacity
            style={styles.opt}
            activeOpacity={0.8}
            onPress={() => onSpread()}
          >
            <Text allowFontScaling={false} style={styles.darkText}>
              {this.props.visible ? '收起' : '展开'}
            </Text>
          </TouchableOpacity>
        )}

        {item.evaluateImageList && (
          <View style={styles.evaImgBox}>
            {item.evaluateImageList.map((evaluate, index) => {
              return (
                <TouchableOpacity
                  key={evaluate.imageId}
                  activeOpacity={0.8}
                  onPress={async () =>
                    await action.showBigImg(item.evaluateImageList, index)
                  }
                >
                  <WMImage style={styles.evaImg} src={evaluate.artworkUrl} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={styles.rowFlex}>
          {item.specDetails && (
            <Text style={styles.specDetails} allowFontScaling={false}>
              {item.specDetails}
            </Text>
          )}
          <TouchableOpacity
            style={styles.giveLike}
            activeOpacity={0.8}
            onPress={() => {
              action.giveLike(item.evaluateId);
            }}
          >
            <Text style={styles.darkText} allowFontScaling={false}>
              &nbsp;
              {item.goodNum}
            </Text>
            <Image
              style={[styles.giveImg, item.isPraise && { tintColor: mainColor }]}
              source={require('../img/giveLike.png')}
            />
          </TouchableOpacity>
        </View>
        {/* {item.evaluateAnswer && (
          <Text style={styles.greyText} allowFontScaling={false}>
            掌柜回复：
            {item.evaluateAnswer}
          </Text>
        )} */}
      </View>
    );
  }

  _zanEvent = (evaluate) => {
    let { main } = this.props;
    const {zanGoodsEvaluateList, cancelZanGoodsEvaluateList} = main;
    if (evaluate.isPraise) {
      //取消点赞过
      const index = cancelZanGoodsEvaluateList.findIndex(
        (zanGoodsEvaluate) => zanGoodsEvaluate.evaluateId == evaluate.evaluateId
      );
      if (index > -1) {
        evaluate.isPraise = null;
        evaluate.goodNum = cancelZanGoodsEvaluateList[index].goodNum;
        return evaluate;
      }
      return evaluate;
    } else {
      //已点赞过
      const index = zanGoodsEvaluateList.findIndex(
        (zanGoodsEvaluate) => zanGoodsEvaluate.evaluateId == evaluate.evaluateId
      );
      if (index > -1) {
        evaluate.isPraise = 1;
        evaluate.goodNum = zanGoodsEvaluateList[index].goodNum;
        return evaluate;
      }
    }
  };

  /**
   * 判断是否是企业会员
   * @param value
   * @private
   */
  _iepHandle = (value) => {
    const { checkEnterpriseEnable } = this.props.main;
    if (checkEnterpriseEnable) {
      const customerLabelList = value.customerLabelList;
      return (
        value.customerLabelList &&
        customerLabelList.indexOf(Const.customerLabel.IEPCustomer) > -1
      );
    } else {
      return false;
    }
  };
}

let evaImgWidth = (screenWidth - 40) / 3;
const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  headerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    marginLeft: 10
  },
  evaluateContent: {
    paddingHorizontal: 10,
    color: '#333'
  },
  opt: {
    marginTop: 10,
    marginLeft: 10
  },
  evaImgBox: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  evaImg: {
    width: evaImgWidth,
    height: evaImgWidth,
    borderWidth: 1,
    borderColor: '#ebebeb',
    marginTop: 10,
    marginLeft: 10
  },
  specDetails: {
    marginTop: 10,
    color: '#999',
    fontSize: 10,
    fontWeight: '400'
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  giveLike: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  giveImg: {
    width: 20,
    height: 20
  },
  greyText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10
  },
  darkText: {
    color: '#333',
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 10
  },

  iepLabel: {
    marginLeft: 2,
    height: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4
  },
  imgLogo: {
    width: 10,
    height: 10,
    marginRight: 2
  },
  labelName: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 2,
    color: '#FFD684'
  }
});
