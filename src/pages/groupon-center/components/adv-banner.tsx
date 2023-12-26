import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { msg } from 'plume2';

import { connect } from 'react-redux';

import { screenWidth, mainColor } from 'wmkit/styles/index';

import actions from '../actions/index';
import { store2Props } from '../selectors';
import * as T from '../types';

type IAdvBannerProps = T.IProps & T.IAdvBannerProps;

@connect<Partial<IAdvBannerProps>, T.IAdvBannerState>(
  store2Props,
  actions
)
export default class AdvBanner extends React.Component<
  Partial<IAdvBannerProps>,
  T.IAdvBannerState
> {
  constructor(props: IAdvBannerProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      main: { grouponAdvert }
    } = this.props;

    let showStyleFlag = true;
    let adverts = [];

    if (!grouponAdvert) {
      showStyleFlag = false;
    } else {
      adverts = JSON.parse(grouponAdvert);
      if (adverts.length <= 0) {
        showStyleFlag = false;
      } else {
        showStyleFlag = true;
      }
    }

    return (
      <View style={showStyleFlag ? styles.container : styles.noneStyle}>
        <Swiper
          removeClippedSubviews={false}
          showsButtons={false}
          autoplay={true}
          paginationStyle={styles.pageStyle}
          dot={<View style={styles.dot} />}
          activeDot={<View style={[styles.activeDot, { backgroundColor: mainColor }]} />}
        >
          {adverts.length > 0 &&
            adverts.map((adv) => (
              <TouchableOpacity
                key={Math.random()}
                activeOpacity={0.8}
                onPress={() =>
                  adv.linkGoodsInfoId &&
                  msg.emit('router: goToNext', {
                    routeName: 'SpellGroupDetail',
                    skuId: adv.linkGoodsInfoId
                  })
                }
              >
                <Image style={styles.img} source={{ uri: adv.artworkUrl }} resizeMode='stretch'/>
              </TouchableOpacity>
            ))}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: screenWidth * 0.4667,
    paddingHorizontal: 12,
    marginBottom: 12
  },
  noneStyle: {
    // height: 40,
    // backgroundColor: '#fff'
  },
  img: {
    width: '100%',
    height: screenWidth * 0.4666,
    borderRadius: 8,
    overflow: 'hidden'
  },
  pageStyle: {
    bottom: 8
  },
  dot: {
    backgroundColor: '#fff',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4
  },
  activeDot: {
    width: 16,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 4
  }
});
