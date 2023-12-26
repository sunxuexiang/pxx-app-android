import React from 'react';
import { View, ScrollView, Platform } from 'react-native';

import { StoreProvider } from 'plume2';
import AutoHeightWebView from 'react-native-autoheight-webview';

import Header from 'wmkit/header';

import AppStore from './store';
const styleHtml = ` 
 <style type="text/css">
 body {font-size: 14px;word-break: break-all;}
	img {width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class RegisterAgreement extends React.Component {
  store;

  componentDidMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <Header title="注册协议" />
        <ScrollView>
          <AutoHeightWebView
            enableBaseUrl={true}
            source={{
              html: styleHtml + this.store.state().get('agreementString')
            }}
            scalesPageToFit={false}
          />
        </ScrollView>
      </View>
    );
  }
}
