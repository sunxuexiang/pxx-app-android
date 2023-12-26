import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';

import { msg, Relax } from 'plume2';

import { screenWidth } from 'wmkit/styles/index';
import WMImage from 'wmkit/image/index';
import LinearGradient from 'react-native-linear-gradient';
/**
 * 每日签到模块
 */
@Relax
export default class HotExchange extends React.Component {
  static relaxProps = {
    hotExchange: 'hotExchange',
    pointsIsOpen: 'pointsIsOpen'
  };
  render() {
    const { hotExchange, pointsIsOpen } = this.props.relaxProps;
    if (hotExchange.length <= 0) {
      return <View style={styles.hotExchange} />;
    }

    let groupNum =
      hotExchange.length % 3 == 0
        ? hotExchange.length / 3
        : Math.floor(hotExchange.length / 3) + 1;
    let newArray = [];

    for (let i = 0; i < groupNum; i++) {
      newArray.push(hotExchange.slice(i * 3, i * 3 + 3));
    }
    return (
      pointsIsOpen && 
      <View style={styles.hotExchange}>
        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.title}>
            热门兑换
          </Text>
          <TouchableOpacity activeOpacity={0.8}            
           onPress={() => {
              msg.emit('router: goToNext', { routeName: 'PointsMall' });
            }}>
              <LinearGradient
                colors={['#FF8800', '#FF4D00']}
                style={styles.btnSign}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text style={styles.signText} allowFontScaling={false}>
                  积分商城
                </Text>
              </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Swiper
            loop={false}
            removeClippedSubviews={false}
            autoplay={false}
            showsButtons={false}
            showsPagination={false}
            horizontal={true}
            height={screenWidth * 0.53}
          >
            {newArray.map((item, index) => {
              return (
                <View key={index} style={styles.hotList}>
                  {item.map((val, idx) => {
                    return (
                      <View style={styles.hotListItem} key={idx}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() =>
                            msg.emit('router: goToNext', {
                              routeName: 'GoodsDetail',
                              skuId: val.goodsInfo.goodsInfoId,
                              pointsGoodsId: val.pointsGoodsId
                            })
                          }
                        >
                          <WMImage
                            style={styles.img}
                            src={
                              val.goodsInfo.goodsInfoImg || val.goods.goodsImg
                            }
                          />
                          <View style={styles.infoView}>
                            <Text
                              style={styles.hotName}
                              allowFontScaling={false}
                              numberOfLines={1}
                            >
                              {val.goodsInfo.goodsInfoName}
                            </Text>
                            <View style={styles.hotTextBox}>
                              <Text
                                style={styles.price}
                                allowFontScaling={false}
                                numberOfLines={1}
                              >
                                {val.points}
                                &nbsp;
                              </Text>
                              <Text
                                style={styles.gray}
                                allowFontScaling={false}
                              >
                                积分
                              </Text>
                            </View>
                          </View>
                          <View style={styles.rankBox}>
                            <Image
                              source={require('../img/ranking.png')}
                              style={[
                                styles.rankImg,
                                index == 0
                                  ? idx == 0
                                    ? {}
                                    : idx == 1
                                      ? { tintColor: '#FE4C00' }
                                      : { tintColor: '#FF8000' }
                                  : { tintColor: '#FEA900' }
                              ]}
                            />
                            <Text
                              allowFontScaling={false}
                              style={styles.rankText}
                            >
                              {index == 0
                                ? idx == 0
                                  ? 1
                                  : idx == 1
                                    ? 2
                                    : 3
                                : '热'}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </Swiper>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hotExchange: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    paddingTop: 16,
    marginVertical: 12,
    flexDirection:'column',
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10
  },
  btnSign: {
    paddingHorizontal:16,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signText: {
    fontSize: 12,
    color: '#fff'
  },
  title: {
    fontSize: 14,
  },
  content: {
    width: screenWidth,
    height:200
  },
  hotList: {
    flexDirection: 'row'
  },
  hotListItem: {
    width: screenWidth / 3 - 14,
    marginRight: 10,
    borderColor: '#eee',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 6,
    overflow: 'hidden'
  },
  img: {
    width: screenWidth / 3 - 14,
    height: screenWidth / 3 - 14,
    resizeMode: 'cover',
    padding: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  infoView: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  hotName: {
    fontSize: 14,
    color: '#333',
    overflow: 'hidden',
    marginVertical: 7.5
  },
  price: {
    fontSize: 12,
    color: '#FE5500'
  },
  gray: {
    fontSize: 12,
    color: '#999'
    // paddingLeft: 10
  },
  rankBox: {
    position: 'absolute',
    left: 0
  },
  rankText: {
    position: 'absolute',
    left: 3,
    top: 3,
    color: '#fff',
    fontSize: 10
  },
  rankImg: {
    width: 26,
    height: 26,
    overflow: 'visible',
    resizeMode: 'cover'
  },
  arrowImg: {
    marginLeft: 3
  },
  hotTextBox: {
    flexDirection: 'row',
    width: screenWidth / 3 - 50,
    alignItems: 'center'
  }
});
