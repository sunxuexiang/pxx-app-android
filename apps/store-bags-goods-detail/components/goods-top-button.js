import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

// import * as _ from 'wmkit/common/util';
import * as _ from '../../../wmkit/common/util'; // added by scx 
import { isAndroid } from 'wmkit/styles/index';
@Relax
export default class GoodsTopButton extends Component {
  static relaxProps = {
    // video显示时隐藏顶部按钮
    showVideo: 'showVideo',
    isDistributor: 'isDistributor',
    goodsInfo: 'goodsInfo'
  };

  render() {
    const { showVideo } = this.props.relaxProps;
    return (
      !showVideo && (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => msg.emit('router: back')}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require('../img/arrow.png')}
            />
          </TouchableOpacity>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 40
      },
      {
        top: isAndroid ? 5 : 30
      }
    ),
    left: 0,
    zIndex: 99,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11.5,
    marginRight: 10
  },
  btnText: {
    color: '#fff',
    fontSize: 10
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
