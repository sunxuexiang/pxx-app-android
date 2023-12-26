import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import GoodsEvaluationItem from './goods-evaluation-item';
import {
  PixelRatio,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import * as _ from 'wmkit/common/util';
import { screenWidth, mainColor } from '../../../wmkit/styles/index';
import rArrowIcon from '../img/r-arrow.png';

@Relax
export default class GoodsEvaluation extends Component {
  static relaxProps = {
    top3Evaluate: 'top3Evaluate',
    goods: 'goods'
  };

  render() {
    const { top3Evaluate, goods } = this.props.relaxProps;

    //评价总数
    const evaluateConut = top3Evaluate.getIn([
      'goodsEvaluateCountResponse',
      'evaluateConut'
    ]);
    let count;
    if (evaluateConut > 10000) {
      count = _.div(evaluateConut, 10000).toFixed(1) + '万+';
    } else {
      count = evaluateConut;
    }

    const evaluateResp = top3Evaluate.getIn([
      'listResponse',
      'goodsEvaluateVOList'
    ]);

    const praise = top3Evaluate.getIn(['goodsEvaluateCountResponse', 'praise'])
      ? top3Evaluate.getIn(['goodsEvaluateCountResponse', 'praise'])
      : 100;

    return (
      <View>
        <TouchableOpacity
          style={styles.top}
          activeOpacity={0.8}
          onPress={() => {
            msg.emit('router: goToNext', {
              routeName: 'GoodsDetailEvaluationList',
              goods: goods.get('goodsId')
            });
          }}
        >
          <Text allowFontScaling={false} style={styles.text}>
            评价 {count}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            { count && count != 0 ? <Text allowFontScaling={false} style={[styles.grayText, { color: mainColor }]}>
              好评率
              {praise}%
            </Text> : null}
            <Image source={rArrowIcon} style={styles.arrow} />
          </View>
        </TouchableOpacity>
        {count == 0 ? (
          <View style={styles.noEvaluation}>
            <Image
              style={styles.noEvaluationImg}
              source={require('../img/not-eval.png')}
            />
            <Text allowFontScaling={false} style={styles.noEvaluationText}>
              暂无评论
            </Text>
          </View>
        ) : (
          evaluateResp &&
          !evaluateResp.isEmpty() && (
            <View style={styles.item}>
              <GoodsEvaluationItem />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  msg.emit('router: goToNext', {
                    routeName: 'GoodsDetailEvaluationList',
                    goods: goods.get('goodsId')
                  });
                }}
                style={[styles.bottom, { borderColor: mainColor }]}
              >
                <Text style={[styles.btn, { color: mainColor }]} allowFontScaling={false}>
                  查看全部评价
                </Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: '#fff'
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold'
  },
  grayText: {
    marginRight: 5
  },
  noEvaluationText: {
    color: '#666',
    fontSize: 12,
    marginTop: 5
  },
  noEvaluationImg: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25
  },
  noEvaluation: {
    paddingVertical: 20,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  bottom: {
    alignSelf: 'center',
    marginVertical: 15,
    height: 24,
    width: 104,
    borderRadius: 17.5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    fontSize: 12,
    fontWeight: '500'
  },
  item: {
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  arrow: {
    width: 12,
    height: 12,
    top: 5
  }
});
