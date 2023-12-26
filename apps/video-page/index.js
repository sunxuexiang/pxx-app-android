import React, { Component } from 'react'
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import Hearder from './components/hearder'
import VideoShow from './components/video-show'
import FollowVideo from './components/follow-video'

@StoreProvider(AppStore, { debug: __DEV__ })
export default class VideoPage extends Component {
  store;

  async componentDidMount(){
    this.store.init();
    
  }

  render() {
    const activityTab = this.store.state().get('activityTab');
    return (
      <View style={{flex:1}}>
          <Hearder />
          {
            activityTab == '1' ? <VideoShow /> : 
            <FollowVideo/>
          }
      </View>
    )
  }

  
}

