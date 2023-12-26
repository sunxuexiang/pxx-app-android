import React from 'react';
import { View, ScrollView, Platform } from 'react-native';

import { StoreProvider } from 'plume2';
import AutoHeightWebView from 'react-native-autoheight-webview';

import Header from 'wmkit/header';

import AppStore from './store';
const styleHtml = ` 
 <style type="text/css">
	img {max-width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class AboutUs extends React.Component {
  componentDidMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Header title="关于我们" />
        {/* <ScrollView style={{ flex: 1 }}> */}
          <AutoHeightWebView
            enableBaseUrl={true}
            source={{
              html: styleHtml + this.store.state().get('context')
            }}
            scalesPageToFit={false}
          />
        {/* </ScrollView> */}
      </View>
    );
  }
}
