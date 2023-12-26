import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import Swiper from 'react-native-swiper';

import * as T from '../types';
import { screenWidth } from 'wmkit/styles/index';
import WMImage from 'wmkit/image/index';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';
import Price from '../../../../wmkit/biz/cartprice';
type IHotRecommendProps = T.IProps & T.IHotRecommendProps;

@connect<Partial<IHotRecommendProps>, T.IHotRecommendState>(
  store2Props,
  actions
)
export default class HotRecommend extends React.Component<
  Partial<IHotRecommendProps>,
  T.IHotRecommendState
> {
  constructor(props: IHotRecommendProps) {
    super(props);
    this.state = {
      currentIndex: 1
    };
  }

  /**
    
*/
  render() {
    let {
      main: { grouponHotList }
    } = this.props;

    if (grouponHotList.length <= 0) {
      return null;
    }

    let groupNum =
      grouponHotList.length % 3 == 0
        ? grouponHotList.length / 3
        : Math.floor(grouponHotList.length / 3) + 1;
    let newArray = [];

    for (let i = 0; i < groupNum; i++) {
      newArray.push(grouponHotList.slice(i * 3, i * 3 + 3));
    }

    // let newHotList = fromJS(grouponHotList).groupBy((_i, index) =>
    //   Math.floor(index / 3)
    // );
    // console.log('new hot list======>', JSON.stringify(newHotList));

    return (
      <View style={styles.hotRecommend}>
        <View style={styles.hotTitle}>
          <View style={styles.titleLeft}>
            <Text allowFontScaling={false} style={styles.titleLeftFirst}>
              热门推荐
            </Text>
            <Text allowFontScaling={false} style={styles.titleLeftLast}>
              超值拼团
            </Text>
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.titleRightTxt}>
              {this.state.currentIndex} / {groupNum}
            </Text>
          </View>
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
            onIndexChanged={(index) => this._changIndex(index)}
          >
            {newArray.map((item, index) => {
              return (
                <View key={index} style={styles.hotList}>
                  {item.map((info, idx) => {
                    return (
                      <View style={styles.hotListItem} key={idx}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() =>
                            msg.emit('router: goToNext', {
                              routeName: 'SpellGroupDetail',
                              skuId: info.goodsInfoId
                            })
                          }
                        >
                          <WMImage style={styles.img} src={info.goodsImg} />
                          <View style={styles.name}>
                            <Text
                              allowFontScaling={false}
                              numberOfLines={3}
                              style={styles.hotName}
                            >
                              {info.goodsName} 
                            </Text>
                          </View>
                          <View style={styles.hotPrice}>
                            <Price
                              price={info.grouponPrice.toFixed(2) || '0.00'}
                            />
                          </View>
                          <View style={styles.group}>
                            <Text style={styles.num}>
                              {info.grouponNum}
                              人团
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={styles.totalNum}
                              numberOfLines={1}
                            >
                              已拼
                              {info.alreadyGrouponNum}
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

  _changIndex = (index) => {
    this.setState({ currentIndex: index + 1 });
  };
}

const styles = StyleSheet.create({
  hotRecommend: {
    padding: 12,
    paddingVertical: 16,
    backgroundColor: '#fff'
  },
  hotTitle: {
    marginBottom: 12.5,
    marginTop: 2.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleLeft: {
    flexDirection: 'row'
  },
  titleLeftFirst: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'rgba(0,0,0,0.8)',
    textAlignVertical: 'bottom'
  },
  titleLeftLast: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.4)',
    textAlignVertical: 'bottom'
  },
  titleRight: {
    flex: 1,
    textAlign: 'right'
  },
  titleRightTxt: {
    fontSize: 13,
    color: '#000'
  },
  content: {
    width: screenWidth
  },
  hotList: {
    flexDirection: 'row'
  },
  hotListItem: {
    width: screenWidth / 3 - 14,
    marginRight: 8,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ebebeb',
    borderRadius: 6
  },
  img: {
    width: 105,
    height: 105,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    overflow: 'hidden'
  },
  name: {
    alignContent: 'center',
    marginTop: 10,
    marginHorizontal: 10
  },
  hotName: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)',
    overflow: 'hidden',
    lineHeight: 14,
    height:28
  },
  hotPrice: {
    // marginBottom: 6,
    marginHorizontal: 10
  },
  group: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    marginBottom: 12
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
    // maxWidth: 100 % -40,
    overflow: 'hidden',
    marginTop: -2,
    textAlignVertical: 'center',
    color: '#ff1f4e'
  },
  num: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 10,
    textAlignVertical: 'center'
  },
  totalNum: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.4)',
    overflow: 'hidden'
  }
});
