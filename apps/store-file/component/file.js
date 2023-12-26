import React from 'react';
import { ScrollView, Text, Image, StyleSheet } from 'react-native';
import { Relax } from 'plume2';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

import * as FindArea from 'wmkit/area/area';
import FormItem from 'wmkit/form/form-item';
import * as _ from 'wmkit/common/util';

import styled from 'styled-components/native';
const defaultImg = require('../img/store-icon.png');
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 16;
  background-color: #fff;
  padding-left: 12;
  padding-right: 12;
  padding-bottom: 16;
`;
const Box = styled.View`
  width: 102;
  background-color: #f5f5f5;
  border-radius: 6;
  padding-left: 10;
  padding-top: 16;
  padding-bottom: 16;
`;
const GoodsEval = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 12;
  margin-bottom: 12;
  background-color: #fff;
  padding-bottom: 12;
`;
const BottomView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 24;
`;
const BoxItem = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UpText = styled.Text`
  color: #f60;
  padding-left: 12;
  flex-direction: row;
  margin-top: 12;
  font-weight: bold;
  line-height: 20;
  font-size: 20;
`;
const DownText = styled.Text`
  color: #333333;
  transform: scale(0.83);
  font-size: 12;
  font-weight: 500;
  margin-left: 5;
`;
const BottomText = styled.Text`
  color: #666;
  transform: scale(0.83);
  margin-top: 10;
`;
const Line = styled.View`
  flex-direction: column;
  align-items: center;
`;
const StoreInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color:#fff;
  padding-left:12;
  padding-top:16
`;
@Relax
export default class File extends React.Component {
  static relaxProps = {
    storeArchives: 'storeArchives',
    isShow: 'isShow'
  };

  render() {
    const { storeArchives, isShow } = this.props.relaxProps;
    const areaId = storeArchives.get('areaId');
    const provinceId = storeArchives.get('provinceId');
    const cityId = storeArchives.get('cityId');
    console.log(storeArchives.toJS(), 'v.33');
    const storeLogo = storeArchives.get('storeLogo');
    let follow;
    const followSum = storeArchives.get('followCount');
    if (followSum > 10000) {
      follow = _.div(followSum, 10000).toFixed(1) + '万';
    } else {
      follow = followSum;
    }

    let sumCompositeScore,
      sumGoodsScore,
      sumServerScore,
      sumLogisticsScoreScore;
    if (storeArchives.get('storeEvaluateSumVO')) {
      sumCompositeScore = storeArchives.getIn([
        'storeEvaluateSumVO',
        'sumCompositeScore'
      ]);
      sumGoodsScore = storeArchives.getIn([
        'storeEvaluateSumVO',
        'sumGoodsScore'
      ]);
      sumServerScore = storeArchives.getIn([
        'storeEvaluateSumVO',
        'sumServerScore'
      ]);
      sumLogisticsScoreScore = storeArchives.getIn([
        'storeEvaluateSumVO',
        'sumLogisticsScoreScore'
      ]);
    } else {
      sumCompositeScore = 5;
      sumGoodsScore = 5;
      sumServerScore = 5;
      sumLogisticsScoreScore = 5;
    }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <StoreInfo>
          <Image style={styles.img} source={defaultImg} />
          {storeArchives.get('companyType') === 0 && <SelfSalesLabel />}
          <Text allowFontScaling={false} numberOfLines={2} style={styles.name}>
            {storeArchives.get('storeName')}
          </Text>
        </StoreInfo>
        {isShow ? (
          <Container>
            <Box>
              <BoxItem>
                <Image
                  source={require('wmkit/theme/hert.png')}
                  style={{ width: 12, height: 12, marginRight: 4 }}
                />
                <DownText>粉丝数</DownText>
              </BoxItem>
              <UpText>
                {follow}
                {followSum > 10000 && <Text style={styles.unit}>万</Text>}
              </UpText>
            </Box>
            <Box>
              <BoxItem>
                <Image
                  source={require('../img/product.png')}
                  style={{ width: 12, height: 12, marginRight: 4 }}
                />
                <DownText>商品数</DownText>
              </BoxItem>
              <UpText>{storeArchives.get('goodsInfoCount')}</UpText>
            </Box>
            <Box>
              <BoxItem>
                <Image
                  source={require('wmkit/theme/star.png')}
                  style={{ width: 12, height: 12, marginRight: 4 }}
                />
                <DownText>综合评分</DownText>
              </BoxItem>
              <UpText>{sumCompositeScore.toFixed(2)}</UpText>
            </Box>
          </Container>
        ) : null}
        {/* 商品质量 服务态度 发货速度*/}
        <GoodsEval>
          <BottomView>
            <Text
              style={{
                fontSize: 12,
                color: '#333',
                marginRight: 8,
                fontWeight: '400'
              }}
            >
              商品质量
            </Text>
            <Text style={{ fontSize: 12, color: '#f60', fontWeight: 'bold' }}>
              {sumGoodsScore.toFixed(2)}
            </Text>
          </BottomView>
          <BottomView>
            <Text
              style={{
                fontSize: 12,
                color: '#333',
                marginRight: 8,
                fontWeight: '400'
              }}
            >
              服务态度
            </Text>
            <Text style={{ fontSize: 12, color: '#f60', fontWeight: 'bold' }}>
              {sumServerScore.toFixed(2)}
            </Text>
          </BottomView>
          <BottomView>
            <Text
              style={{
                fontSize: 12,
                color: '#333',
                marginRight: 8,
                fontWeight: '400'
              }}
            >
              发货速度
            </Text>
            <Text style={{ fontSize: 12, color: '#f60', fontWeight: 'bold' }}>
              {sumLogisticsScoreScore.toFixed(2)}
            </Text>
          </BottomView>
        </GoodsEval>
        <FormItem
          labelName="店铺名称"
          placeholder={storeArchives.get('storeName') || ''}
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="店铺类型"
          placeholder={
            storeArchives.get('companyType') == 0 ? '自营商家' : '第三方商家'
          }
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="商家名称"
          placeholder={storeArchives.get('supplierName') || ''}
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="所在地区"
          placeholder={FindArea.addressInfo(provinceId, cityId, areaId)}
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="统一社会信用代码"
          placeholder={storeArchives.get('socialCreditCode')}
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="企业名称"
          placeholder={storeArchives.get('companyName')}
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="住所"
          placeholder={storeArchives.get('address') || '无'}
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="法定代表人"
          placeholder={storeArchives.get('legalRepresentative') || '无'}
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="注册资本"
          placeholder={
            storeArchives.get('registeredCapital')
              ? `${storeArchives.get('registeredCapital')}万人民币`
              : '无'
          }
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="成立日期"
          placeholder={
            storeArchives.get('foundDate')
              ? _.formatDayZh(storeArchives.get('foundDate'))
              : '无'
          }
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="营业期限自"
          placeholder={
            storeArchives.get('businessTermStart')
              ? _.formatDayZh(storeArchives.get('businessTermStart'))
              : '无'
          }
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="营业期限至"
          placeholder={
            storeArchives.get('businessTermEnd')
              ? _.formatDayZh(storeArchives.get('businessTermEnd'))
              : '无'
          }
          itemStyle={{ borderBottomWidth: 0 }}
        />
        <FormItem
          labelName="经营范围"
          placeholder={storeArchives.get('businessScope')}
          itemStyle={{ borderBottomWidth: 0 }}
        />
      </ScrollView>
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
  img: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginLeft: 4
  }
});
