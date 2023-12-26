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
import { Checkbox, TextareaItem } from '@ant-design/react-native';
import WmUpload from 'wmkit/upload';
import { Const } from 'wmkit/const';
import Header from 'wmkit/header';
import Rating from 'wmkit/rating';
import WMImage from 'wmkit/image/index';

import moment from 'moment';

type IEvaluateItemProps = T.IProps & T.IEvaluateItemProps;

const AgreeItem = Checkbox.AgreeItem;

@connect<Partial<IEvaluateItemProps>, T.IEvaluateItemState>(
  store2Props,
  actions
)
export default class EvaluateItem extends React.Component<
  Partial<IEvaluateItemProps>,
  T.IEvaluateItemState
> {
  constructor(props: IEvaluateItemProps) {
    super(props);
  }

  /**
    
*/
  render() {
    const {
      actions: { action },
      main: {
        baseInfo: { storeTobe, storeVO, tradeVO, createTime },
        evaluateAddRequest: {
          goodsEvaluateAddRequest: { isAnonymous },
          goodsEvaluateImageAddRequest
        },
        isReady,
        queryType
      },
      main
    } = this.props;
    if (!isReady) {
      return '';
    }
    return (
      <ScrollView style={styles.container}>
        <Header
          title={queryType == 1 && storeTobe === 0 ? '服务评价' : '评价晒单'}
          // renderRight={() => (
          //   <TouchableOpacity
          //     style={styles.submit}
          //     onPress={() => {
          //       action.save();
          //     }}
          //   >
          //     <Text allowFontScaling={false} style={{ color: '#000' }}>
          //       提交
          //     </Text>
          //   </TouchableOpacity>
          // )}
        />
        {JSON.stringify(main.baseInfo) !== '{}' && (
          <View>
            {queryType == 0 ? (
              <View>
                <View style={styles.imageView}>
                  <WMImage
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 4
                    }}
                    src={tradeVO && tradeVO.pic}
                  />
                  <View
                    style={{
                      marginLeft: 12
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      numberOfLines={2}
                      style={{
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 12
                      }}
                    >
                      {tradeVO && tradeVO.skuName}
                    </Text>
                    <View>
                      <View>
                        <Text
                          allowFontScaling={false}
                          style={{ color: '#999', fontSize: 12 }}
                        >
                          {tradeVO && tradeVO.specDetails}
                        </Text>
                      </View>
                      <View>
                        <Text
                          allowFontScaling={false}
                          style={{ color: '#999', fontSize: 12 }}
                        >
                          购买时间:
                          {moment(createTime).format(Const.DATE_FORMAT)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.box}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flex: 1
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{ color: 'rgba(0,0,0,0.8)', fontSize: 14 }}
                    >
                      商品评分
                    </Text>
                    <Rating
                      key={'evaluateScore0'}
                      style={{ marginTop: 0 }}
                      disabled={false}
                      rating={
                        this.props.main.evaluateAddRequest
                          .goodsEvaluateAddRequest.evaluateScore
                      }
                      selectedStar={(item) =>
                        action.commonChange(
                          'main.evaluateAddRequest.goodsEvaluateAddRequest.evaluateScore',
                          item
                        )
                      }
                    />
                  </View>
                  <TextareaItem
                    rows={5}
                    count={500}
                    style={{
                      fontSize: 14,
                      marginBottom: 30,
                      paddingHorizontal: 0
                    }}
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    placeholder={'分享心得体验，给大家多点参考吧'}
                    onChange={(item) =>
                      action.commonChange(
                        'main.evaluateAddRequest.goodsEvaluateAddRequest.evaluateContent',
                        item
                      )
                    }
                  />
                </View>
                {/*<AutoGrowingTextInput/>*/}
                <View style={styles.uploadImage}>
                  <Text
                    allowFontScaling={false}
                    style={{ color: 'rgba(0,0,0,0.8)', fontSize: 14 }}
                  >
                    晒单
                  </Text>
                  <ScrollView
                    contentContainerStyle={{ paddingVertical: 10 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                  >
                    {goodsEvaluateImageAddRequest.map((v, index) => {
                      let imgSrc = v.artworkUrl;
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{ marginRight: 10, borderColor: '#ebebeb' }}
                        >
                          <WMImage
                            key={Math.random()}
                            resizeMode="contain"
                            style={styles.pic}
                            src={imgSrc}
                          />
                          <TouchableOpacity
                            style={styles.close}
                            onPress={() => this._removeImage(index)}
                          >
                            <Text allowFontScaling={false} style={styles.cha}>
                              ×
                            </Text>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      );
                    })}
                    {goodsEvaluateImageAddRequest.length >= 9 ? null : (
                      <WmUpload onChange={(url) => this._uploadImage(url)} />
                    )}
                  </ScrollView>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: '#999',
                      fontSize: 12
                    }}
                  >
                    仅支持jpg、jpeg、png、gif文件，最多上传9张，大小不超过5M
                  </Text>
                </View>

                {storeTobe === 0 ? ( //服务评价显示店铺
                  <View style={styles.box}>
                    <Text allowFontScaling={false} style={styles.colorStyle}>
                      店铺服务评价
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 10
                      }}
                    >
                      <View style={styles.shop}>
                        <Image
                          style={{ width: 40, height: 40, borderRadius: 4 }}
                          source={{ uri: storeVO && storeVO.storeLogo }}
                        />
                      </View>
                      <Text
                        allowFontScaling={false}
                        style={{ marginLeft: 10, color: '#333' }}
                      >
                        {storeVO && storeVO.storeName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column'
                      }}
                    >
                      <View style={[styles.ratingStyle, { marginTop: 10 }]}>
                        <Text
                          allowFontScaling={false}
                          style={styles.colorStyle}
                        >
                          商品质量
                        </Text>
                        <Rating
                          key={'goodsScore0'}
                          disabled={false}
                          rating={
                            this.props.main.evaluateAddRequest
                              .storeEvaluateAddRequestList.goodsScore
                          }
                          style={{ marginTop: 0 }}
                          selectedStar={(item) =>
                            action.commonChange(
                              'main.evaluateAddRequest.storeEvaluateAddRequestList.goodsScore',
                              item
                            )
                          }
                        />
                      </View>
                      <View style={styles.ratingStyle}>
                        <Text
                          allowFontScaling={false}
                          style={styles.colorStyle}
                        >
                          服务态度
                        </Text>
                        <Rating
                          key={'serverScore'}
                          disabled={false}
                          rating={
                            this.props.main.evaluateAddRequest
                              .storeEvaluateAddRequestList.serverScore
                          }
                          style={{ marginTop: 0 }}
                          selectedStar={(item) =>
                            action.commonChange(
                              'main.evaluateAddRequest.storeEvaluateAddRequestList.serverScore',
                              item
                            )
                          }
                        />
                      </View>
                      <View style={styles.ratingStyle}>
                        <Text
                          allowFontScaling={false}
                          style={styles.colorStyle}
                        >
                          发货速度
                        </Text>
                        <Rating
                          key={'logisticsScore'}
                          disabled={false}
                          rating={
                            this.props.main.evaluateAddRequest
                              .storeEvaluateAddRequestList.logisticsScore
                          }
                          style={{ marginTop: 0 }}
                          selectedStar={(item) =>
                            action.commonChange(
                              'main.evaluateAddRequest.storeEvaluateAddRequestList.logisticsScore',
                              item
                            )
                          }
                        />
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}
            {queryType === 1 ? ( //服务评价显示店铺
              <View style={styles.box}>
                <Text allowFontScaling={false} style={styles.colorStyle}>
                  店铺服务评价
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 10
                  }}
                >
                  <View style={styles.shop}>
                    <Image
                      style={{ width: 40, height: 40, borderRadius: 4 }}
                      source={{ uri: storeVO && storeVO.storeLogo }}
                    />
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={{ marginLeft: 10, color: '#333' }}
                  >
                    {storeVO && storeVO.storeName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column'
                  }}
                >
                  <View style={[styles.ratingStyle, { marginTop: 10 }]}>
                    <Text allowFontScaling={false} style={styles.colorStyle}>
                      商品质量
                    </Text>
                    <Rating
                      key={2}
                      disabled={false}
                      rating={
                        this.props.main.evaluateAddRequest
                          .storeEvaluateAddRequestList.goodsScore
                      }
                      style={{ marginTop: 0 }}
                      selectedStar={(item) => {
                        action.commonChange(
                          'main.evaluateAddRequest.storeEvaluateAddRequestList.goodsScore',
                          item
                        );
                      }}
                    />
                  </View>
                  <View style={styles.ratingStyle}>
                    <Text allowFontScaling={false} style={styles.colorStyle}>
                      服务态度
                    </Text>
                    <Rating
                      key={3}
                      disabled={false}
                      rating={
                        this.props.main.evaluateAddRequest
                          .storeEvaluateAddRequestList.serverScore
                      }
                      style={{ marginTop: 0 }}
                      selectedStar={(item) =>
                        action.commonChange(
                          'main.evaluateAddRequest.storeEvaluateAddRequestList.serverScore',
                          item
                        )
                      }
                    />
                  </View>
                  <View style={styles.ratingStyle}>
                    <Text allowFontScaling={false} style={styles.colorStyle}>
                      发货速度
                    </Text>
                    <Rating
                      key={4}
                      disabled={false}
                      rating={
                        this.props.main.evaluateAddRequest
                          .storeEvaluateAddRequestList.logisticsScore
                      }
                      style={{ marginTop: 0 }}
                      selectedStar={(item) =>
                        action.commonChange(
                          'main.evaluateAddRequest.storeEvaluateAddRequestList.logisticsScore',
                          item
                        )
                      }
                    />
                  </View>
                </View>
              </View>
            ) : null}

            <View style={styles.checkBox}>
              <AgreeItem
                checked={isAnonymous === 1}
                 checkboxStyle={{ color: '#333' }}
                onChange={() => this._isAnonymous()}
              >
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 14, color: '#333' }}
                >
                  匿名评价
                </Text>
              </AgreeItem>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }

  _uploadImage = (url) => {
    const {
      actions: { action },
      main: {
        evaluateAddRequest: { goodsEvaluateImageAddRequest }
      }
    } = this.props;
    if (url) {
      const imgArr = [...goodsEvaluateImageAddRequest];
      const img = {
        imageName: 'imgName',
        artworkUrl: url
      };
      imgArr.push(img);
      action.commonChange(
        'main.evaluateAddRequest.goodsEvaluateImageAddRequest',
        imgArr
      );
    }
  };

  _removeImage = (index) => {
    const {
      actions: { action },
      main: {
        evaluateAddRequest: { goodsEvaluateImageAddRequest }
      }
    } = this.props;
    //删除照片
    const imgArr = [...goodsEvaluateImageAddRequest];
    imgArr.splice(index, 1);
    action.commonChange(
      'main.evaluateAddRequest.goodsEvaluateImageAddRequest',
      imgArr
    );
  };

  /**
   * 是否匿名提交
   * @private
   */
  _isAnonymous = () => {
    const {
      actions: { action },
      main: {
        evaluateAddRequest: {
          goodsEvaluateAddRequest: { isAnonymous }
        }
      }
    } = this.props;
    const Anonymous = isAnonymous === 1 ? true : false;
    if (Anonymous) {
      action.commonChange(
        'main.evaluateAddRequest.goodsEvaluateAddRequest.isAnonymous',
        0
      );
    } else {
      action.commonChange(
        'main.evaluateAddRequest.goodsEvaluateAddRequest.isAnonymous',
        1
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    marginBottom: 12
    // backgroundColor: '#fff'
  },
  imageView: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 12
    // borderTopWidth: 1,
    // borderTopColor: '#FAFAFA',
    // borderBottomWidth: 1,
    // borderBottomColor: '#FAFAFA'
  },
  uploadImage: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#fff'
  },
  box: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  checkBox: {
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 12
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
    // borderWidth: 1,
    // borderColor: '#ccc'
  },
  ratingStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  colorStyle: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    marginBottom: 10
  }
});
