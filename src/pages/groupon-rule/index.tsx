import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import AutoHeightWebView from 'react-native-autoheight-webview';
import WMGrouponFooter from 'wmkit/groupon-footer';
import Header from 'wmkit/header';

const styleHtml = ` 
 <style type="text/css">
	img {max-width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class GrouponRule extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    const htmlContent = main.context ? styleHtml + main.context : styleHtml;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Header title="玩法介绍" />
        <ScrollView style={{ flex: 1 }}>
          <AutoHeightWebView
            enableBaseUrl={true}
            source={{
              html: htmlContent
            }}
            scalesPageToFit={false}
          />
        </ScrollView>
        <WMGrouponFooter currTab="玩法介绍" />
      </View>
    );
  }
}

//==动态注入reducer===

import grouponRuleMain from './reducers/main';

registerReducer({ grouponRuleMain });

const styles = StyleSheet.create({
  index: {}
});
