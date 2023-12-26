import React, { Component } from 'react'
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { msg, Relax } from 'plume2';
import { noop } from 'lodash';
import * as _ from 'wmkit/common/util';
import { isAndroid, screenWidth } from 'wmkit/styles/index';

@Relax
export default class Hearder extends Component {

  static relaxProps = {
    activityTab: 'activityTab',
    changeTab: noop
  };
  
  render() {
    const {activityTab,changeTab} = this.props.relaxProps;

    return (
      <View style={[styles.videoTab,activityTab=='2'&&styles.videoTab2]}>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              changeTab('1')
            }}
          >
            <Text style={[styles.videoTitle,activityTab=='1'?styles.chosen:styles.chosen1]}>推荐</Text>
        </TouchableOpacity>
        <Text>         </Text>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              changeTab('2')
            }}
          >
            <Text style={[styles.videoTitle,activityTab=='2'&&styles.chosen2]}>点赞</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  videoTab:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    height: 60,
    width:screenWidth,
    backgroundColor: '#000',
    position:'absolute',
    top:0,
    left:0,
    zIndex:99
  },
  videoTab2:{
    backgroundColor: '#fff',
    position:'relative'
  },
  videoTitle: {
    color:'#fff',
    fontSize:14
  },
  chosen:{
    fontSize:18
  },
  chosen1:{
    fontSize:14,
    color:'#000'
  },
  chosen2:{
    fontSize:18,
    color:'#000'
  }
})
