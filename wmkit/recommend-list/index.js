import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import { screenWidth, mainColor } from 'wmkit/styles';
import { WMImage, _ } from 'wmkit';
import * as WMkit from 'wmkit/kit';
import { msg } from 'plume2';
import * as webApi from './webapi';

import Price from 'wmkit/price';

export default class WMRecommendList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      enabled: 0, // 0 开启 1 关闭
      flag: 0, //该页面商品推荐入口是否开启
    };
    this.renderRecommend = this.renderRecommend.bind(this);
  }

  componentDidMount() {
    this._initRecommend();
  }

  // 初始化数据
  _initRecommend() {
    webApi.getRecommendList().then(res => {
      const { context } = res;
      let entry = [];
      let flag = 0;
      if ( context && context.goodsRecommendSettingVO && context.goodsRecommendSettingVO.entries) {
        entry = context.goodsRecommendSettingVO.entries.split('|');
        if (entry.indexOf(this.props.type) > -1) {
          flag = 1;
        }
      }
      this.setState({
        dataSource: (context && context.goodsRecommendSettingVO && context.goodsRecommendSettingVO.goodsInfos) || [],
        enabled: context && context.goodsRecommendSettingVO && context.goodsRecommendSettingVO.enabled,
        flag: flag
      });
    });
  }

  // 渲染item
  renderRecommend({ item }) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: item.goodsInfoId
          })
        }
      >
        <View style={styles.recommendItemContainer}>
          {/* item.goodsInfoImg */}
          <WMImage
            resizeMode={'contain'}
            style={styles.bigimg}
            src={item.goodsInfoImg ? `${item.goodsInfoImg}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_200,h_200`
                  : item.goods.goodsImg ? `${item.goods.goodsImg}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_200,h_200` : '' } alt=''/>
          <View style={styles.infoContainer}>
            <View style={styles.titleBox}>
              <Text style={styles.title} allowFontScaling={false} numberOfLines={1}>{item.goodsInfoName}</Text>
            </View>
            <Price
              price={item.salePrice}
              bigPriceStyle={{fontSize: 16}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { dataSource, enabled, flag } = this.state;
    const { style } = this.props;
    return (
      dataSource.length && enabled === 0 && flag ? <View style={[style, styles.recommendContaner]}>
        <View style={styles.recTitleBox}>
          <View  style={styles.titleLine}/>
          <Text style={styles.recTitle}>为您推荐</Text>
          <View  style={styles.titleLine}/>
        </View>
        <FlatList
          data={dataSource}
          renderItem={this.renderRecommend}
          keyExtractor={(n, i) => i}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        ></FlatList>
      </View> : null
    );
  }
}

const styles = StyleSheet.create({
  recommendContaner: {
    width: '100%',
    paddingBottom: 12
  },
  recTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  recTitle: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#323232',
    fontWeight: '500'
  },
  titleLine: {
    width: 40,
    height: 1,
    backgroundColor: '#d8d8d8'
  },
  recommendItemContainer: {
    width: (screenWidth - 36) / 2,
    borderRadius: 6,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 12
  },
  bigimg: {
    width: (screenWidth - 36) / 2,
    height: (screenWidth - 36) / 2
  },
  infoContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12
  },
  skuBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  skuInfo: {
    fontSize: 12,
    color: '#9E9E9E'
  },
  titleBox: {
    flex: 1,
    marginBottom: 10
  },
  title: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
  }
});
