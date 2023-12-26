import React, { Component } from 'react';
import { PixelRatio, StyleSheet, Text, View } from 'react-native';
import WMImage from 'wmkit/image/index';
import { fromJS, List } from 'immutable';
import { mainColor } from 'wmkit/styles/index';
import AsyncStorage from '@react-native-community/async-storage';

// 排序规则 -- 立减-0、满折-1、买送-2、满返、优惠券、5-秒杀
const _SORT = [0, 1, 2, 3, 4, 5];
const _TYPE = {
  '0': { text: '满减', type: 'fullReductionIcon' },
  '1': { text: '买折', type: 'discountIcon' },
  '2': { text: '买赠', type: 'discountGiftIcon' },
  '3': { text: '券', type: '' },
  '4': { text: '拼', type: '' },
  '5': { text: '秒杀', type: '' }
};
export default class MarketingLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getReduced: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('getReduced').then((res) => {
      this.setState({ getReduced: JSON.parse(res) });
    });
  }

  render() {
    const {
      marketingLabels,
      couponLabels,
      grouponLabel,
      isFlashFlag,
      isSocial,
      labelType
    } = this.props;
    const { getReduced } = this.state;
    let mLabels = !isSocial && marketingLabels ? marketingLabels : [];

    mLabels &&
      mLabels.map((item, index) => {
        //如果有秒杀不显示营销标签
        if (item.marketingType == 5) {
          mLabels = [
            fromJS({
              marketingType: 5,
              marketingId: `${item.marketingId}`,
              marketingDesc: item.couponDesc
            })
          ];
        }
      });

    //分销不展示营销
    //秒杀不存在，拼团存在，显示拼团，不显示营销标签
    if (
      !isSocial &&
      !isFlashFlag &&
      grouponLabel &&
      grouponLabel.grouponActivityId &&
      grouponLabel.grouponActivityId != ''
    ) {
      mLabels = [
        fromJS({
          marketingType: 4,
          marketingDesc: grouponLabel.marketingDesc
        })
      ];
    }

    //优惠券始终显示
    couponLabels &&
      couponLabels.forEach((item) => {
        mLabels.push(
          fromJS({
            marketingType: 3,
            marketingId: `${item.couponActivityId}-${item.couponInfoId}`,
            marketingDesc: item.couponDesc
          })
        );
      });
    const labels = fromJS(this.marketOne(mLabels) || []);
    const sortedLabels = this.renderSort(labels);
    return sortedLabels.toJS().map((label, index) => {
      if (labelType && labelType === 'goodsDetails' && (index > 0 || label.marketingType > 2)) {
        return null;
      }
      return getReduced !== null &&
        getReduced.isOpen === '1' &&
        label.marketingType < 3 && !labelType &&labelType !== 'goodsDetails'
        ? this.filterText1(label)
        : this.filterText0(label, index);
    });
  }
  filterText0(label, index) {
    const { labelType } = this.props;
    return (
      <View
        key={index}
        style={[styles.tag, { borderColor: mainColor }, this.props.style]}
      >
        <Text
          allowFontSacling={false}
          style={[styles.tagText, { color: mainColor }]}
        >
          {labelType && labelType === 'goodsDetails'
            ? this.filterMarketingTypegoods(label.marketingDesc)
            : this.filterMarketingType(_TYPE[label.marketingType].text, label)}
        </Text>
      </View>
    );
  }
  filterText1(label) {
    let url = '';
    if (label.marketingType == '0') {
      url = label.marketingDesc.includes('立减')
        ? this.state.getReduced['onceReductionIcon']
        : this.state.getReduced['fullReductionIcon'];
    } else if (label.marketingType == '1') {
      url = this.state.getReduced['discountIcon'];
    } else if (label.marketingType == '2') {
      url = this.state.getReduced['discountGiftIcon'];
    }

    return (
      <WMImage style={{ width: 20, height: 20 ,marginRight:5}} src={JSON.parse(url)[0].url} />
    );
  }
  /**
   * 根据返回促销中是否包含立减字段决定展示满减或立减
   */
  filterMarketingType(text, label) {
    if (text === _TYPE['0'].text && label.marketingDesc.includes('立减')) {
      return '立减';
    }
    return text;
  }
  filterMarketingTypegoods(marketingDesc) {
    if (marketingDesc.includes('指定商品')) {
      return '送指定商品';
    }
    return marketingDesc;
  }
  /**
   * 根据满减>满折>满赠的优先级，返回需要显示的促销活动
   */
  marketOne = (marketingLabels) => {
    return marketingLabels.sort((marketing) => marketing.marketingType);
  };
  renderSort = (marketingLabels) => {
    let array = List();
    if (marketingLabels && marketingLabels.size > 0) {
      let labelMap = marketingLabels.groupBy((label) =>
        label.get('marketingType')
      );
      _SORT.forEach((type) => {
        if (labelMap.has(type)) {
          array = array.push(labelMap.get(type).get(0));
        }
      });
    }
    return array;
  };
}

const styles = StyleSheet.create({
  tag: {
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 2,
    overflow: 'hidden'
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500'
  }
});
