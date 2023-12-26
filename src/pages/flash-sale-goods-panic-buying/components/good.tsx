import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import WMImage from 'wmkit/image/index';
import * as _ from 'wmkit/common/util';

type IGoodProps = T.IProps & T.IGoodProps;

@connect<Partial<IGoodProps>, T.IGoodState>(
  store2Props,
  actions
)
export default class Good extends React.Component<Partial<IGoodProps>,
T.IGoodState> {
  constructor(props: IGoodProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: { action },
      main
    } = this.props;

    const { goodName, goodIntro, goodPrice, goodImage } = main.goodsInfo;
    return (
      main && <View>
        <View style={styles.container}>
          <View style={styles.leftImage}>
            <WMImage style={{ width: 90, height: 90 }} src={goodImage} />
          </View>
          <View style={styles.rightContent}>
            <Text allowFontScaling={false} style={styles.goodName}>{goodName}</Text>
            <Text allowFontScaling={false} style={styles.goodIntro}>{goodIntro}</Text>
            <View style={styles.bottomPrice}>
              <Text style={styles.goodPrice}>
                <Text style={{fontSize: 12}}>¥</Text>
                {_.addZero(goodPrice || 0)}
              </Text>
              <Text style={styles.goodPrice2}>{'积极性抢购中…'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.waitImage}>
          <View style={styles.imgBox}>
            <Image style={styles.img} source={require('../img/rush.gif')} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  leftImage: {
    marginTop: 5,
    marginLeft: 5
  },
  rightContent: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    padding: 10
  },
  goodName: {
    color: '#000',
    fontSize: 15
  },
  goodIntro: {
    marginTop: 10,
    color: '#A3A3A3'
  },
  bottomPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goodPrice: {
    marginTop: 10,
    fontSize: 15,
    color: '#ff1f4e'
  },
  goodPrice2: {
    marginTop: 10,
    fontSize: 13,
    color: '#ff1f4e'
  },
  waitImage: {
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 200
      },
      {
        top: 240
      }
    ),
    ..._.ifIphoneXR(
      {
        top: 200
      },
      {}
    ),
    alignSelf: 'center'
  },
  imgBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden'
  },
  img: {
    width: 56,
    height: 56
  }
});
