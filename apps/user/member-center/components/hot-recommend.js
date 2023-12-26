import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PixelRatio, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { screenWidth } from 'wmkit/styles/index';
import WMImage from 'wmkit/image/index';
import { Relax, msg } from 'plume2';

@Relax
export default class HotRecommend extends React.Component {

  static relaxProps = {
    hotExchange: 'hotExchange',
  };

  render() {
    const { hotExchange } = this.props.relaxProps;

    if (hotExchange.size <= 0) {
      return null;
    }

    let groupNum =
      hotExchange.size % 3 == 0
        ? hotExchange.size / 3
        : Math.floor(hotExchange.size / 3) + 1;
    let newArray = [];
    for (let i = 0; i < groupNum; i++) {
      newArray.push(hotExchange.slice(i * 3, i * 3 + 3));
    }
    return (
      <View style={styles.hotRecommend}>
        <View style={styles.title}>
          <Text allowFontScaling={false} style={styles.textLeft}>热门兑换</Text>
          <TouchableOpacity
            style={styles.ruleBox}
            activeOpacity={0.8}
            onPress={() => { msg.emit('router: goToNext', { routeName: 'PointsMall' }); }}
          >
            <LinearGradient
              colors={['#FF8800', '#FF4D00']}
              style={[styles.linearGradient]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text allowFontScaling={false} style={styles.rightText}>积分商城</Text>
              <Image style={styles.arrowImg} source={require('../img/arrow_right.png')} />
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
                              skuId: val.get('goodsInfo').get('goodsInfoId'),
                              pointsGoodsId: val.get('pointsGoodsId')
                            })

                          }
                        >
                          <WMImage style={styles.img} src={val.get('goodsInfo').get('goodsInfoImg') || val.get('goods').get('goodsImg')} />
                          <View style={styles.infoView}>
                            <Text style={styles.hotName} allowFontScaling={false} numberOfLines={1}>{val.get('goodsInfo').get('goodsInfoName')}</Text>
                            <View style={styles.hotTextBox}>
                              <Text style={styles.price} allowFontScaling={false} numberOfLines={1}>
                                {val.get('points')}&nbsp;</Text><Text style={styles.gray} allowFontScaling={false}>积分</Text>
                            </View>
                          </View>
                          <View style={styles.rankBox}>
                            <Image source={require('../img/ranking.png')} style={[styles.rankImg, index == 0 ? idx == 0 ? {} : idx == 1 ? { tintColor: '#FE4C00' } : { tintColor: '#FF8000' } : { tintColor: '#FEA900' }]} />
                            <Text allowFontScaling={false} style={styles.rankText}>{index == 0 ? idx == 0 ? 1 : idx == 1 ? 2 : 3 : '热'}
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
  hotRecommend: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    height: 50
  },
  textLeft: {
    fontSize: 14,
    color: '#333',
    fontWeight:'bold',
  },
  linearGradient: {
    width: 90,
    height: 30,
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  rightText: {
    fontSize: 12,
    color: '#fff'
  },
  hotList: {
    flexDirection: 'row',
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
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  hotName: {
    fontSize: 14,
    color: '#000',
    overflow: 'hidden',
    marginVertical: 7.5,
  },
  price: {
    fontSize: 12,
    color: '#FE5500',
  },
  gray: {
    color: '#999',
    fontSize: 12,
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
