import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { screenWidth } from 'wmkit/styles/index';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';
import * as WMkit from 'wmkit/kit';

type IToolImgProps = T.IProps & T.IToolImgProps;

@connect<Partial<IToolImgProps>, T.IToolImgState>(
  store2Props,
  actions
)
export default class ToolImg extends React.Component<
  Partial<IToolImgProps>,
  T.IToolImgState
> {
  constructor(props: IToolImgProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      main: { distributeSetting, distributor }
    } = this.props;

    // 小店是否关闭 0：关闭，1：开启
    let shopOpenFlag = distributeSetting.shopOpenFlag;
    // 分销员是否禁用 0: 启用中  1：禁用中
    let forbidFlag = distributor.forbiddenFlag;

    // 小店关店后，不展示店铺入口
    let liStyle =
      shopOpenFlag == 0
        ? {
            width: screenWidth / 2 - 13.5,
            height: (screenWidth / 2 - 13.5) * 0.555556
          }
        : {
            width: screenWidth / 3 - 13.5,
            height: (screenWidth / 3 - 13.5) * 0.555556
          };

    return (
      <View style={styles.container}>
        <View style={styles.containerInner}>
          {shopOpenFlag == 1 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                forbidFlag
                  ? action.shopClosedTip(distributor.forbiddenReason)
                  : msg.emit('router: goToNext', {
                      routeName: 'DistributionShopIndex'
                    });
              }}
            >
              <Image
                source={
                  forbidFlag
                    ? require('../img/floor-1-disabled.png')
                    : require('../img/tool-1.png')
                }
                style={[styles.img, liStyle]}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'DistributionGoodsList'
              });
            }}
          >
            <Image
              source={require('../img/tool-2.png')}
              style={[styles.img, liStyle]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('router: goToNext', { routeName: 'MaterialCircle' });
            }}
          >
            <Image
              source={require('../img/tool-3.png')}
              style={[styles.img, liStyle]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
    borderRadius: 10
  },
  containerInner: {
    // marginBottom: 15,
    // marginTop: 15,
    flexDirection: 'row'
  },
  img: {
    marginRight: 15
  }
});
