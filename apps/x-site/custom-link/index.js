import React from 'react';
import {
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import {  WebView } from 'react-native-webview';
import { screenWidth, screenHeight } from 'wmkit/styles/index';
import { msg } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Loading } from '../../../wmkit';
import * as _ from '../../../wmkit/common/util'; // added by scx 

const isAndroid = Platform.OS == 'android';

export default class CustomLink extends React.Component {
  render() {
    const state = this.props.route;
    const params = (state && state.params) || {};
    const { url } = params;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={isAndroid ? "light-content" : "dark-content"} />
        <WebView
          style={{ width: screenWidth, height: screenHeight }}
          javaScriptEnabled={true}
          mixedContentMode='always'
          source={{
            uri: url
          }}
          renderLoading={() => (
            <View style={styles.loadingIndex}>
              <Loading />
            </View>
          )}
          startInLoadingState={true}
        />
        <TouchableOpacity
          key="4"
          style={{
            position: 'absolute',
            top: isAndroid ? 5 : 35,
            left: 5,
            padding: 10
          }}
          onPress={() => msg.emit('router: back')}
        >
          <Image
            style={{ width: 24, height: 24, zIndex: 999 }}
            source={require('../img/arrow.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    ..._.ifIphoneX(
      {
        paddingTop: 0
      },
      {
        paddingTop: isAndroid ? 0 : 0
      }
    )
  },
  loadingIndex: {
    flex: 1,
    justifyContent: 'center'
  }
});
