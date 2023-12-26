import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Relax } from 'plume2';

import WMEmpty from 'wmkit/empty';

import StoreInfoList from './store-info-list';
import Address from './address';
import * as _ from '../../../wmkit/common/util';
import { WMRecommendList } from '@/wmkit';
@Relax
export default class PurchaseContainer extends React.Component {
  static relaxProps = {
    skus: 'skus',
    loginFlag: 'loginFlag'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { skus, loginFlag } = this.props.relaxProps;

    const count = skus.count();

    return count > 0 ? (
      <View style={[styles.container, !loginFlag && { paddingBottom: 170 }]}>
        <StoreInfoList />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={{
          ..._.ifIphoneX(
            {
              paddingBottom: 85,
              marginTop: 12
            },
            {
              paddingBottom: 50,
              marginTop: 12
            }
          )
        }}
      >
        <WMEmpty
          emptyImg={require('../img/none.png')}
          desc="您的购物车是空哒"
          isToGoodsList={true}
          imgStyle={{width:104,height:104}}
        />
        {/*为你推荐*/}
        <View style={{ paddingHorizontal: 12}}>
          <WMRecommendList type={'5'}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ..._.ifIphoneX(
      {
        paddingBottom: 180
      },
      {
        paddingBottom: 150
      }
    ),
    paddingHorizontal: 12
  }
});
