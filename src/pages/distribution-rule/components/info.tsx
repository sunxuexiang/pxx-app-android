import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Header from 'wmkit/header';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IInfoProps = T.IProps & T.IInfoProps;

const styleHtml = ` 
 <style type="text/css">
	img {max-width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@connect<Partial<IInfoProps>, T.IInfoState>(
  store2Props,
  actions,
)
export default class Info extends React.Component<
  Partial<IInfoProps>,
  T.IInfoState
> {
  constructor(props: IInfoProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      main,
    } = this.props;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Header title="分销员规则介绍" />
        <ScrollView style={{ flex: 1 }}>
          <AutoHeightWebView
            enableBaseUrl={true}
            source={{
              html: styleHtml + main.rule
            }}
            scalesPageToFit={Platform.OS === 'android' ? true : false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {},
});
