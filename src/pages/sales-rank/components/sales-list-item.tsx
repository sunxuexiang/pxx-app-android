import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import { mainColor } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util';
import { RuleTab } from '../types';
import { DistributionCustomerRankingVO1 } from '../../../web-api/DistributionCustomerRankingController';
const defaultImg = require('../img/default-img.png');
const bgImg = require('../img/item-bg.png');

type ISalesListItemProps = T.IProps & T.ISalesListItemProps;

@connect<Partial<ISalesListItemProps>, T.ISalesListItemState>(
  store2Props,
  actions,
)
export default class SalesListItem extends React.Component<
  Partial<ISalesListItemProps>,
  T.ISalesListItemState
> {
  constructor(props: ISalesListItemProps) {
    super(props);
  }

  /**

*/
  render() {
    let { rank, index, hideDetail, main: {
      tab
    } } = this.props;

    // 前三条记录有排名
    let number: number = null;
    if (index <= 2) {
      number = index + 1;
    };
    let source = rank.img ? { uri: rank.img } : defaultImg;

    return (
      <View style={styles.item}>
        <View style={styles.infoBox}>
          <View style={styles.imgBox}>
            <Image style={styles.img} source={source} />
            {number != null ? (
              <ImageBackground style={styles.bgImg} source={bgImg}>
                <View style={styles.numTextBox}>
                  <Text
                    allowFontScaling={false}
                    style={styles.numText}
                    numberOfLines={1}
                  >
                    {number}
                  </Text>
                </View>
              </ImageBackground>
            ) : null}
          </View>
          <View style={styles.descBox}>
            <Text
              allowFontScaling={false}
              style={styles.normalText}
              numberOfLines={1}
            >
              {rank.name}
            </Text>
            {!hideDetail ? (
              <View style={styles.detailBox}>
                <Text
                  allowFontScaling={false}
                  style={styles.detailText}
                  numberOfLines={1}
                >
                  {this._msgNum(rank, tab)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <Text allowFontScaling={false} style={[styles.normalText, number != null ? {color: mainColor} : {}]}>
          {Number.parseInt(rank.ranking) > 99 ? '99+' : rank.ranking}
        </Text>
      </View>
    );
  }

  /**
   * 排名信息
   */
  _msgNum = (rank: DistributionCustomerRankingVO1, tab: RuleTab) => {
    let text = '';
    // 邀新人数
    if (tab === 'inviteCount') {
      text += '邀新人数: ' + rank.inviteCount;
    }
    // 有效邀新
    if (tab === 'inviteAvailableCount') {
      text += '有效邀新: ' + rank.inviteAvailableCount;
    }
    //销售额
    if (tab === 'saleAmount') {
      text += '销售额: ' + _.addZero(rank.saleAmount);
    }
    // 预估收益
    if (tab === 'commission') {
      text += '预估收益:  ' + _.addZero(rank.commission);
    }

    return text;
  };
}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#fff'
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  imgBox: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 40
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  descBox: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '80%'
  },
  normalText: {
    fontSize: 14,
    color: '#000'
  },
  detailBox: {
    marginTop: 8
  },
  detailText: {
    fontSize: 12,
    color: '#000'
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40
  },
  numTextBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numText: {
    fontSize: 9,
    color: '#fff'
  }
});
