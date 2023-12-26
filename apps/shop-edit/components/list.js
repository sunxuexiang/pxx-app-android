import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  PixelRatio,
} from 'react-native';
import { Relax } from 'plume2';
import { DragSortableView } from 'react-native-drag-sort';
import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';
import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';
import Price from 'wmkit/price';

import SelfSalesLabel from 'wmkit/biz/selfsales-label';

import { mainColor, screenWidth } from 'wmkit/styles/index';

const parentWidth = screenWidth;
const childrenWidth = screenWidth;
const childrenHeight = 120;
@Relax
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
    };
  }

  static relaxProps = {
    shopSkuList: 'shopSkuList',
    delCommodityDistribution: noop,
    save: noop,
  };

  render() {
    const shopSkuList = this.props.relaxProps.shopSkuList;
    const { save } = this.props.relaxProps;
    return (
      <ScrollView
        ref={(scrollView) => (this.scrollView = scrollView)}
        scrollEnabled={this.state.scrollEnabled}
        style={styles.container}
      >
        {shopSkuList.length > 0 && (
          <DragSortableView
            dataSource={shopSkuList}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            childrenHeight={childrenHeight}
            scaleStatus={'scale'}
            onDragStart={(startIndex, endIndex) => {
              this.setState({
                scrollEnabled: false,
              });
            }}
            onDragEnd={(startIndex, data) => {
              this.setState({
                scrollEnabled: true,
              });
            }}
            onDataChange={(data) => {
              // 改变数据后将新的data赋值给data
              save(data);
            }}
            keyExtractor={(item, index) => item.goodsInfo.goodsInfoId} // FlatList作用一样，优化
            onClickItem={(data, item, index) => {}}
            renderItem={(item, index) => {
              return this.renderItem(item, index);
            }}
          />
        )}
      </ScrollView>
    );
  }

  renderItem(item) {
    const { delCommodityDistribution } = this.props.relaxProps;
    const data = this.props.relaxProps.shopSkuList;
    const goodsInfo = item.goodsInfo;
    // 库存
    const stock = goodsInfo.stock;
    // 起订量
    const count = goodsInfo.count || 0;
    // 库存等于0或者起订量大于剩余库存
    const noneStock = stock <= 0 || (count > 0 && count > stock);

    return (
      <View style={styles.item} key={goodsInfo.goodsInfoId}>
        <WMImage style={styles.img} src={goodsInfo.goodsInfoImg} />
        <View style={styles.content}>
          <Text
            style={[styles.title, noneStock && { color: '#bcbcbc' }]}
            allowFontSacling={false}
            numberOfLines={2}
          >
            {goodsInfo.goodsInfoName}
          </Text>
          <Text style={styles.gec} allowFontSacling={false} numberOfLines={1}>
            {goodsInfo.specText}
          </Text>
          <View style={styles.tagCon}>
            {goodsInfo.companyType == 0 && <SelfSalesLabel />}
          </View>
          <View style={styles.row}>
            <View style={styles.tagCon}>
              <Price
                buyPoint={goodsInfo.buyPoint}
                price={goodsInfo.marketPrice}
              />
              <Text
                allowFontScaling={false}
                style={[styles.commission, noneStock && { color: '#bcbcbc' }]}
              >
                &nbsp;/&nbsp;赚
                {_.addZero(goodsInfo.distributionCommission)}
              </Text>
              {WMkit.isInvalid(goodsInfo) && (
                <View style={styles.lack}>
                  <Text style={styles.lackText} allowFontScaling={false}>
                    等货中
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.socialBtn}>
              <TouchableOpacity
                style={[styles.btnBox2, { backgroundColor: mainColor }]}
                activeOpacity={0.8}
                onPress={() => {
                  const newData = [...data];
                  //点击时判断此id对应的索引值
                  let index = newData.findIndex(
                    (value) =>
                      value.goodsInfo.goodsInfoId === goodsInfo.goodsInfoId
                  );
                  delCommodityDistribution(goodsInfo.goodsInfoId, index);
                }}
              >
                <Text style={styles.btnText2}>删除</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    color: '#000',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 5,
  },
  gec: {
    color: '#999999',
    fontSize: 13,
    marginBottom: 5,
    height: 15,
  },
  img: {
    width: 100,
    height: 100,
  },
  item: {
    width: screenWidth,
    height: 120,
    padding: 10,
    paddingBottom: 0,
    paddingRight: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-start',
    minHeight: 100,
    paddingBottom: 8,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginTop: 2,
  },
  socialBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnBox2: {
    marginLeft: 5,
    height: 23,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11.5
  },
  btnText2: {
    color: '#fff',
    fontSize: 10
  },
  lack: {
    width: 35,
    height: 15,
    marginLeft: 5,
    backgroundColor: '#cccccc',
    borderRadius: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lackText: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  commission: {
    marginLeft: 3,
    color: '#333',
    fontSize: 12,
  },
});
