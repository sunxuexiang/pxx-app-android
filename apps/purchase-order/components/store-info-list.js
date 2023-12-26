import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Relax } from 'plume2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';
import * as _ from 'wmkit/common/util';

import SpuItemList from './spu-item-list';

@Relax
export default class StoreInfoList extends React.Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    skus: 'skus',
    stores: 'stores',
    onSkuChange: noop
  };

  render() {
    const {
      skus,
      stores,
      onSkuChange,
    } = this.props.relaxProps;

    if (skus.count() === 0) {
      return (
        <WMEmpty
          emptyImg={require('../img/none.png')}
          desc="您的购物车是空哒"
          isToGoodsList={true}
        />
      );
    }

    return (
      stores &&
      stores.map((store) => {
        return (
          <View style={styles.container} key={store.get('storeId')}>
            <SpuItemList
              storeId={store.get('storeId')}
              onSkuChange={onSkuChange}
            />
          </View>
        );
      })
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 12
  },
});
