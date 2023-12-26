import React from 'react';
import { StyleSheet } from 'react-native';
import { msg } from 'plume2';

import styled from 'styled-components/native';
import { mainColor } from 'wmkit/styles/index';

const hairlineWidth = StyleSheet.hairlineWidth;
const Mask = styled.View`
  background-color: rgba(0,0,0,.5)
  position: absolute
  top: 0
  left: 0
  flex: 1
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
`;
const ModalBox = styled.View`
  background-color: #ffffff
  align-items: center
  width: 90%
  margin-left: 5%
  margin-right: 5%
  padding-top: 10
`;
const ModalImg = styled.Image`
  width: 200
  height: 200
`;
const MainText = styled.Text`
  font-size: 18
  margin-top: 15
  margin-bottom: 15
  padding-left: 15
  padding-right: 15
  color: #000
`;
const SedText = styled.Text`
  font-size: 14
  color: #999
  margin-bottom: 15
  padding-left: 15
  padding-right: 15 
  color: #333
`;
const Button = styled.TouchableOpacity`
  background-color: #fff
  align-items: center
  justify-content: center
  height: 50
  width: 100%
  border-top-width: ${hairlineWidth}
  border-top-color: #ebebeb
`;
const BtnText = styled.Text`
  color: ${mainColor}
  font-size: 16
`;

export default class StoreClose extends React.Component {
  UNSAFE_componentWillMount() {
    msg.on('store-close:visible', this.changeVisible);
  }

  componentWillUnmount() {
    msg.off('store-close:visible', this.changeVisible);
  }

  constructor(props) {
    super(props);
    this.state = {
      //店铺关闭弹框可见性
      storeCloseVisible: false
    };
  }

  render() {
    const { storeCloseVisible: visible } = this.state;
    return (
      visible && (
        <Mask>
          <ModalBox>
            <ModalImg source={require('./img/store_tips.png')} />
            <MainText allowFontScaling={false}>店铺异常</MainText>
            <SedText allowFontScaling={false}>该店铺不存在或已关闭！</SedText>
            <Button
              activeOpacity={0.6}
              onPress={() => {
                msg.emit('store-close:visible', false);
                msg.emit('router: goToNext', { routeName: 'Main' });
              }}
            >
              <BtnText allowFontScaling={false}>去商城首页</BtnText>
            </Button>
          </ModalBox>
        </Mask>
      )
    );
  }

  changeVisible = (storeCloseVisible) => {
    this.setState({ storeCloseVisible: storeCloseVisible });
  };
}
