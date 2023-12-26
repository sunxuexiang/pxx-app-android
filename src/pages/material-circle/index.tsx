import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import ShareModal from 'wmkit/goods-share-modal';
import Header from 'wmkit/header';

import { fromJS } from 'immutable';
import Top from './components/top';

import List from './components/list';

import GoodsShare from './components/goods-share';

import ImageModal from './components/image-modal';

import SharePop from './components/share-pop';

import MomentSuccess from './components/moments-success';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class MaterialCircle extends React.Component<
Partial<T.IProps>,
any
> {
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }
  // static navigationOptions = ({ navigation }) => ({
  //   title: '发现',
  //   tabBarVisible:
  //     navigation.state.params && navigation.state.params.tabBarVisible,
  //   tabBarIcon: ({ focused }) => (
  //     <Image
  //       source={
  //         focused
  //           ? require('./img/material-red.png')
  //           : require('./img/material.png')
  //       }
  //       style={{ width: 24, height: 24 }}
  //     />
  //   )
  // });

  render() {
    let {
      actions: { action },
      main
    } = this.props;
    return (
      <View style={styles.index}>
        <Header
          title="发现"
          renderLeft={() => { }}
          renderRight={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconBox}
                onPress={() =>
                  msg.emit('router: goToNext', { routeName: 'PushCenter' })
                }
              >
                <Image
                  style={styles.icon}
                  source={require('./img/message.png')}
                />
                {(main.noticeNum !== 0 || main.preferentialNum !== 0) && (
                  <View style={[styles.round, { backgroundColor: mainColor }]}>
                    <Text style={styles.roundText} allowFontScaling={false}>
                      {main.noticeNum + main.preferentialNum > 99
                        ? '99+'
                        : main.noticeNum + main.preferentialNum}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
        <Top />
        <List />
        <SharePop />
        <ImageModal />
        <GoodsShare />
        {!!main.shareModalVisible &&
          Object.keys(main.checkedSku).length > 0 && (
            <ShareModal
              addSelfShop={main.addSelfShop}
              //商品SKU信息
              goodsInfo={fromJS(main.checkedSku)}
              goods={fromJS({})}
              //分享类型
              shareType={2}
              shareModalVisible={main.shareModalVisible}
              //弹窗关闭
              closeVisible={action.closeImgShare}
            />
          )}
        <MomentSuccess />
      </View>
    );
  }
}

//==动态注入reducer===

import materialCircleMain from './reducers/main';
import { msg } from 'plume2';
import { mainColor } from '@/wmkit/styles';

registerReducer({ materialCircleMain });

const styles = StyleSheet.create({
  index: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  iconBox: {
    marginRight: 4,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#333'
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8
  },
  round: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundText: {
    color: '#fff',
    fontSize: 10
  }
});
