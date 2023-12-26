import React from 'react';
import { StyleSheet } from 'react-native';
import { msg } from 'plume2';

import styled from 'styled-components/native';
import * as WMkit from 'wmkit/kit';
import * as _ from 'wmkit/common/util';
import { mainColor } from 'wmkit/styles/index';
const LineWidth = StyleSheet.hairlineWidth;

const StoreBottom = styled.View`
  position: absolute 
  bottom: 0 
  height: ${_.isIphoneX() ? 85 : 50} 
  paddingBottom: ${_.isIphoneX() ? 35 : 0}
  background-color: #fff 
  flex-direction: row 
  justify-content: center 
  align-items: center 
  width: 100%
`;
const TouchItems = styled.TouchableOpacity`
  flex-direction: column 
  justify-content: center 
  align-items: center 
  flex: 1
  height: 36 
`;
const ItemImg = styled.Image`
  height: 20 
  width: 20
  tint-color: ${(props) => (props.Selected ? mainColor : '#999')}
  margin-bottom:4
`;
const BottomText = styled.Text`
  color: ${(props) => (props.Selected ? mainColor : '#999')}
  font-size: 10 
  margin-left: 4 
`;

export default class Bottom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StoreBottom>
        <TouchItems activeOpacity={0.6}>
          <ItemImg source={require('../img/home.png')} Selected />
          <BottomText allowFontScaling={false} Selected>
            店铺首页
          </BottomText>
        </TouchItems>
        <TouchItems
          activeOpacity={0.6}
          onPress={() =>
            msg.emit('router: goToNext', {
              routeName: 'StoreCateList',
              storeId: this.props.storeId
            })
          }
        >
          <ItemImg source={require('../img/classfy.png')} />
          <BottomText allowFontScaling={false}>商品分类</BottomText>
        </TouchItems>
        <TouchItems
          activeOpacity={0.6}
          onPress={() =>
            msg.emit('router: goToNext', {
              routeName: 'StoreFile',
              storeId: this.props.storeId
            })
          }
        >
          <ItemImg source={require('../img/menu.png')} />
          <BottomText allowFontScaling={false}>店铺档案</BottomText>
        </TouchItems>

        {/* <TouchItems
          activeOpacity={0.6}
          onPress={() =>
            msg.emit('router: goToNext', {
              routeName: 'StoreMember',
              storeId: this.props.storeId
            })
          }
        >
          <ItemImg source={require('../img/member.png')} />
          <BottomText allowFontScaling={false}>店铺会员</BottomText>
        </TouchItems> */}

        {this.props.serviceFlag && (
          <TouchItems
            activeOpacity={0.6}
            onPress={() => {
              if (WMkit.isLoginOrNotOpen()) {
                msg.emit('router: goToNext', {
                  routeName: 'ChoseService',
                  storeId: this.props.storeId
                });
              } else {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'ChoseService',
                      storeId: this.props.storeId
                    });
                  }
                });
              }
            }}
          >
            <ItemImg source={require('../img/help.png')} />
            <BottomText allowFontScaling={false}>店铺客服</BottomText>
          </TouchItems>
        )}
      </StoreBottom>
    );
  }
}
