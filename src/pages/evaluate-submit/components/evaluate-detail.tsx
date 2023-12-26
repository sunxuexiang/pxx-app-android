import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { Const } from 'wmkit/const';
import Header from 'wmkit/header';
import Rating from 'wmkit/rating';
import WMImage from 'wmkit/image/index';

import * as _ from '../../../../wmkit/common/util';
import moment from 'moment';

type IEvaluateItemProps = T.IProps & T.IEvaluateItemProps;

// const AgreeItem = Checkbox.AgreeItem;

@connect<Partial<IEvaluateItemProps>, T.IEvaluateItemState>(
  store2Props,
  actions
)
export default class EvaluateDetail extends React.Component<
  Partial<IEvaluateItemProps>,
  T.IEvaluateItemState
> {
  constructor(props: IEvaluateItemProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: { action },
      main: {
        baseInfo: { storeTobe, storeVO, tradeVO },
        evaluateDetail,
        isReady
      },
      main
    } = this.props;

    if (!isReady) {
      return '';
    }

    return (
      <ScrollView style={styles.container}>
        <Header title="评价晒单" />
        {JSON.stringify(main.baseInfo) !== '{}' && (
          <View>
            <View style={styles.imageView}>
              <WMImage
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 4
                }}
                src={main?.baseInfo?.tradeVO?.pic}
              />
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={2}
                  style={{
                    color: '#333',
                    fontSize: 12
                  }}
                >
                  {main?.baseInfo?.tradeVO?.skuName}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ color: '#999', fontSize: 12 }}
                >
                  {evaluateDetail.goodsEvaluateVO.specDetails}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ color: '#999', fontSize: 12 }}
                >
                  购买时间:
                  {moment(evaluateDetail.goodsEvaluateVO.buyTime).format(
                    Const.DATE_FORMAT
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                padding: 10,
                backgroundColor: '#fff'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{ color: '#333', fontSize: 14 }}
                >
                  商品评分
                </Text>
                <Rating
                  key={1}
                  disabled={true}
                  rating={
                    this.props.main.evaluateDetail.goodsEvaluateVO.evaluateScore
                  }
                />
              </View>
              <Text
                allowFontScaling={false}
                style={{ color: '#333', fontSize: 14 }}
              >
                {evaluateDetail.goodsEvaluateVO.evaluateContent}
              </Text>
            </View>

            {evaluateDetail.goodsEvaluateImageVOS.length > 0 ? (
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#fff'
                }}
              >
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                >
                  {evaluateDetail.goodsEvaluateImageVOS.map((v, index) => {
                    let imgSrc = v.artworkUrl;
                    return (
                      <WMImage
                        zoom
                        key={index}
                        style={styles.pic}
                        src={imgSrc}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            ) : null}
            {evaluateDetail.goodsEvaluateVO.isAnonymous === 1 ? (
              <View style={styles.checkBox}>
                <Text
                  allowFontScaling={false}
                  style={{ color: '#333', fontSize: 14 }}
                >
                  匿名提交
                </Text>
              </View>
            ) : null}
            {storeTobe === 1 && this.props.main.evaluateDetail.storeEvaluateVO && (
              <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop:20,
                    paddingLeft:20
                  }}
                >
                  <View style={styles.shop}>
                    <Image
                      style={{ width: 60, height: 60,resizeMode:'contain' }}
                      source={{ uri: storeVO.storeLogo }}
                    />
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={{ marginLeft: 20, color: '#000' }}
                  >
                    {storeVO.storeName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    padding: 10
                  }}
                >
                  <View style={styles.ratingStyle}>
                    <Text allowFontScaling={false} style={styles.colorStyle}>
                      商品质量
                    </Text>
                    <Rating
                      key={2}
                      disabled={true}
                      rating={
                        this.props.main.evaluateDetail.storeEvaluateVO
                          .goodsScore
                      }
                    />
                  </View>
                  <View style={styles.ratingStyle}>
                    <Text allowFontScaling={false} style={styles.colorStyle}>
                      服务态度
                    </Text>
                    <Rating
                      key={3}
                      disabled={true}
                      rating={
                        this.props.main.evaluateDetail.storeEvaluateVO
                          .serverScore
                      }
                    />
                  </View>
                  <View style={styles.ratingStyle}>
                    <Text allowFontScaling={false} style={styles.colorStyle}>
                      发货速度
                    </Text>
                    <Rating
                      key={4}
                      disabled={true}
                      rating={
                        this.props.main.evaluateDetail.storeEvaluateVO
                          .logisticsScore
                      }
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: '#FAFAFA'
  },
  imageView: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 12
  },
  uploadImage: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#fff'
  },
  checkBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  pic: {
    width: 50,
    height: 50
  },
  close: {
    width: 13,
    height: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6.5,
    position: 'absolute',
    right: 2,
    top: 2
  },
  cha: {
    color: '#ffffff',
    fontSize: 12
  },
  submit: {
    marginRight: 15
  },
  queryTypeThree: {
    flexDirection: 'column'
  },
  shop: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  ratingStyle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  colorStyle: {
    color: '#333',
    fontSize: 14,
    marginTop: 5
  }
});
