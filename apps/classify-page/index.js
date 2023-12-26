import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { msg, StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isAndroid } from 'wmkit/styles/index';
import { WebView } from 'react-native-webview';
import MagicWebview from '../../wmkit/biz/magic-webview/index';
import { config } from 'wmkit/config';
import * as _ from 'wmkit/common/util';

export default class ClassifyPage extends React.Component {

  componentDidMount(){
    msg.emit('video:closeVideo');
  }

  render() {
    const marginTop = _.isIphoneX ? 35 : isAndroid ? 0 : 15;

    return (
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        <MagicWebview 
          style={{marginTop:marginTop}}
          source={`${config.MAGIC_HOST}/classify/1619149737870?isApp=true`} 
          magicLoad={()=>{}} 
          isMagicReload={false} 
          magicReload = {()=>{}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
