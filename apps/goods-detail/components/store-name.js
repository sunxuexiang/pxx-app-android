import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import {
  Text,
  PixelRatio,
  StyleSheet,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { screenWidth } from 'wmkit/styles/index';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

const defaultImg = require('../img/defalutShop.png');
import hert from 'wmkit/theme/hert.png';
import product from '../img/product.png';
import star from '../img/star.png';
import styled from 'styled-components/native';
import { mainColor } from '@/wmkit/styles';

const StoreInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

@Relax
export default class StoreName extends Component {
  static relaxProps = {
    // 店铺信息
    store: 'store',
    isShow: 'isShow'
  };

  render() {
    const { store, isShow } = this.props.relaxProps;
    const {
      storeId,
      storeName,
      storeLogo,
      companyType,
      followSum,
      storeEvaluateSumVO,
      goodsSum
    } = store.toJS();
    let follow;
    if (followSum > 10000) {
      follow = _.div(followSum, 10000).toFixed(1) + '万';
    } else {
      follow = followSum;
    }

    let sumCompositeScore,
      sumGoodsScore,
      sumServerScore,
      sumLogisticsScoreScore;
    if (storeEvaluateSumVO) {
      sumCompositeScore = storeEvaluateSumVO.sumCompositeScore;
      sumGoodsScore = storeEvaluateSumVO.sumGoodsScore;
      sumServerScore = storeEvaluateSumVO.sumServerScore;
      sumLogisticsScoreScore = storeEvaluateSumVO.sumLogisticsScoreScore;
    } else {
      sumCompositeScore = 5;
      sumGoodsScore = 5;
      sumServerScore = 5;
      sumLogisticsScoreScore = 5;
    }

    return (
      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'StoreMain',
            storeId
          })
        }
      >
        <StoreInfo>
          <Image
            style={styles.img}
            source={storeLogo ? { uri: storeLogo } : defaultImg}
          />
          {companyType === 0 && <SelfSalesLabel />}
          <Text style={styles.name} allowFontScaling={false} numberOfLines={2}>
            {storeName}
          </Text>
        </StoreInfo>

        {isShow ? (
          <View style={styles.contents}>
            {/* 粉丝数 */}
            <View style={styles.item}>
              <View style={styles.up}>
                <Image source={hert} style={styles.icon} />
                <Text style={styles.name}>粉丝数</Text>
              </View>
              <Text style={styles.nums}>
                {follow}
                {followSum > 10000 && <Text style={styles.unit}>万</Text>}
              </Text>
            </View>
            {/* 商品数 */}
            <View style={styles.item}>
              <View style={styles.up}>
                <Image source={product} style={styles.icon} />
                <Text style={styles.name}>商品数</Text>
              </View>
              <Text style={styles.nums}>{goodsSum}</Text>
            </View>
            {/* 综合评分 */}
            <View style={styles.item}>
              <View style={styles.up}>
                <Image source={star} style={styles.icon} />
                <Text style={styles.name}>综合评分</Text>
              </View>
              <Text style={styles.nums}>{sumCompositeScore.toFixed(2)}</Text>
            </View>
          </View>
        ) : null}
        {/* 商品质量 服务态度 发货速度*/}
        <View style={styles.goodsEval}>
          <View style={styles.evalItem}>
            <Text style={styles.title}>商品质量</Text>
            <Text style={styles.num}>{sumGoodsScore.toFixed(2)}</Text>
          </View>
          <View style={styles.evalItem}>
            <Text style={styles.title}>服务态度</Text>
            <Text style={styles.num}> {sumServerScore.toFixed(2)}</Text>
          </View>
          <View style={styles.evalItem}>
            <Text style={styles.title}>发货速度</Text>
            <Text style={styles.num}>{sumLogisticsScoreScore.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _col = (v) => {
    if (v > 3) {
      return { color: '#2DF114' };
    } else {
      return { color: '#f11039' };
    }
  };
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderTopWidth: 8,
    borderTopColor: '#fafafa'
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    resizeMode: 'cover'
  },

  contents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16
  },
  item: {
    width: 112,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 16
  },
  up: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 4
  },
  name: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginLeft: 5
  },
  nums: {
    flexDirection: 'row',
    marginTop: 12,
    color: mainColor,
    paddingLeft: 12,
    fontWeight: 'bold',
    lineHeight: 20,
    fontSize: 20
  },
  unit: {
    fontSize: 12,
    color: mainColor,
    marginTop: 5
  },
  goodsEval: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16
  },
  evalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24
  },
  title: {
    fontSize: 12,
    color: '#333',
    marginRight: 8,
    fontWeight: '400'
  },
  num: {
    fontSize: 12,
    color: mainColor,
    fontWeight: 'bold'
  }
});
