import React from 'react';
import { StyleSheet, View, Text, Image,ScrollView,TouchableOpacity } from 'react-native';
import * as T from '../types';

import actions from '../actions';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import Swiper from 'react-native-swiper';
import { screenWidth } from 'wmkit/styles/index';
type IBannerProps = T.IProps & T.IBannerProps;

@connect<Partial<IBannerProps>, T.IBannerState>(
  store2Props,
  actions
)
export default class Banner extends React.Component<Partial<IBannerProps>,
  T.IBannerState> {
  constructor(props: IBannerProps) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;
    return (
      <View style={styles.container}>
          <Swiper
            height={140}
            // dot={dot}
            // activeDot={activeDot}
            paginationStyle={styles.paginationStyle}
            loop={false}
          >
            <Image style={styles.img} source={require('../img/banner.jpg')} resizeMode='stretch'/>
          </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    marginHorizontal:16,
    marginTop:-70
  },
  img:{
    width:screenWidth - 32,
    height:120,
    borderRadius:10,
    
  },
  paginationStyle: {
    bottom: 10
  },
});
