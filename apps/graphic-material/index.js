import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { StoreProvider } from 'plume2';

import AppStore from './store';

import TopHeader from './components/top-header';
import AnnexMask from './components/annex-mask';
import SharePop from './components/share-pop';
import MomentSuccess from './components/moments-success';
import List from './components/list';
import ImageModal from './components/image-modal';
// import MaterialList from './components/materical-list';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class GraphicMaterial extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {}

  render() {
    const state = this.props.route;
    const { goodsInfoId } = (state && state.params) || {};
    return (
      <View style={styles.container}>
        <TopHeader />
        <List goodsInfoId={goodsInfoId} />
        {/*<MaterialList />*/}
        <AnnexMask />
        <SharePop />
        <ImageModal />
        <MomentSuccess />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    //padding: 10
  }
});
