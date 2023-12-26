import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg, StoreProvider } from 'plume2';

import WMEmpty from 'wmkit/empty';
import Check from 'wmkit/check';
import Header from 'wmkit/header';
import ShareModal from 'wmkit/goods-share-modal';

import { SafeAreaView } from 'react-native-safe-area-context';

import AppStore from './store';

import MiniPurchase from 'wmkit/biz/mini-purchase/index';
import GoodsList from './components/goods-list';
import Bottom from './components/bottom';
import SkeletonSmall from '../goods-list/components/skeleton-small';
import {Loading} from '@/wmkit';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserStore extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.store.init(false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // 修改isEdit编辑状态
    const state = nextProps.route;
    let isEdit = state && state.params && state.params.isEdit;
    isEdit = isEdit == undefined ? false : isEdit;
    if (isEdit !== this.store.state().get('isEdit')) {
      this.store.changeEditStatus(isEdit);
    }
  }

  render() {
    const totalCount = this.store.state().get('goodsJson')
      ? this.store.state().get('goodsJson').get('totalElements')
      : 0;
    const isEdit = this.store.state().get('isEdit');
    const checkAll = this.store.state().get('checkAll');
    const loadingStatus = this.store.state().get('loadingStatus');
    // isEdit状态
    const changeEditStatus = (isEdit) => {
      msg.emit('router: setParams', {
        isEdit: !isEdit
      });
    };
    return (
      <View style={styles.container}>
        {loadingStatus && <Loading />}
        <Header
          title="我的收藏"
          renderRight={() => {
            if (totalCount == 0) return null;
            return (
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  changeEditStatus(isEdit);
                }}
              >
                <Text style={{ fontSize: 13, color: '#000', marginRight: 10 }}>
                  {isEdit ? '完成' : '移除商品'}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        {totalCount == 0 ? (
          <WMEmpty
            emptyImg={require('./img/none.png')}
            desc="您还没有收藏商品哦"
            isToGoodsList={true}
          />
        ) : (
          [
            <View key="1" style={styles.header}>
              {isEdit ? (
                <Check
                  onCheck={() => this.store.changeCheckAllStatus(!checkAll)}
                  checked={checkAll}
                />
              ) : null}
              <Text allowFontScaling={false} style={styles.title}>
                我的收藏 {totalCount}
              </Text>
            </View>,
            <GoodsList key="2" />
          ]
        )}
        {isEdit ? (
          <Bottom />
        ) : (
          //悬浮mini购物车
          <MiniPurchase />
        )}

        {loadingStatus && (
          <View style={styles.skeleton}>
            <SkeletonSmall />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    height: 40,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingHorizontal: 10
  },
  title: {
    color: '#666',
    fontSize: 12,
    marginLeft: 10
  },
  skeleton: {
    position: 'absolute',
    top: 88
  }
});
