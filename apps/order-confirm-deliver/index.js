import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StoreProvider } from 'plume2';

import { Header } from 'wmkit';

import AppStore from './store';
import List from './compontent/list';
import Bottom from './compontent/bottom';
import Modal from './compontent/modal';
import SearchModal from './compontent/search-modal';
import { screenWidth } from 'wmkit/styles/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as _ from 'wmkit/common/util';
import Loading from 'wmkit/loading';
import AutoHeightWebView from 'react-native-autoheight-webview';

const styleHtml = ` 
<style type="text/css">
 body {word-break: break-all}
 img {width: 100%; padding: 0; margin: 0; border: 0}
 p,li,ul { padding:0 3px; margin: 0; }
 p {word-break: break-all;}
 li {clear: both;}
</style> 
<meta name="format-detection" content="telephone=no" />
`;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class OrderConfirmDeliver extends Component {

  UNSAFE_componentWillMount(){
    this.store.init();
    this.store.homeDeliver();
  }

  render() {
    const { showModal, homeDeliverLogisticsContent, loading, showSearchModal } = this.store.state().toJS();
    return (
      <View style={styles.container}>
        <Header title="选择物流公司" />
        {loading && <Loading />}
        <KeyboardAwareScrollView
          style={{flex: 1}}
          ref={(ref) => (this._scroll = ref)}
          onKeyboardDidHide={() => this.scrollToTop()}
        >
            <List />
            {/* {isAddPersonalSite && <Info />} */}

            {homeDeliverLogisticsContent && (
            <View style={styles.infoBox}>
              <AutoHeightWebView
                enableBaseUrl={true}
                source={{ html: styleHtml+ homeDeliverLogisticsContent }}
                scalesPageToFit={false}
                scrollEnabled={false}
                style={{width: screenWidth - 24}}
                scrollEnabledWithZoomedin={false}
              />
            </View>
          )}
        </KeyboardAwareScrollView>
        <Bottom />
        {showModal && <Modal />}
        {showSearchModal && <SearchModal/> }
      </View>
    );
  }

  scrollToTop() {
    this._scroll.scrollToPosition(0, 0);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  infoBox: {
    flex: 1,
    width: screenWidth,
    padding: 12,
    marginTop: 12,
    backgroundColor: '#fff'
  },
  infoScroll: {
    width: '100%',
  },
});
