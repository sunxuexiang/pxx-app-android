import React from 'react';
import { msg } from 'plume2';

import styled from 'styled-components/native';
import { mainColor } from 'wmkit/styles/index';

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
  margin-bottom: 10
  padding-left: 20
  padding-right: 20 
  color: #333
  text-align: left
  width: 100%
`;
const Button = styled.TouchableOpacity`
  background-color: transparent
  margin-top: 30
`;
const BtnImage = styled.Image`
  tintColor: #fff
  width: 29
  height: 29
`;

/**
 * 小B被禁用后弹窗
 */
export default class StoreForbid extends React.Component {
  UNSAFE_componentWillMount() {
    msg.on('store-forbid:visible', this.changeVisible);
  }

  componentWillUnmount() {
    msg.off('store-forbid:visible', this.changeVisible);
  }

  constructor(props) {
    super(props);
    this.state = {
      //关闭弹框可见性
      visible: false,
      //禁用原因
      reason: ''
    };
  }

  render() {
    const { visible, reason } = this.state;
    return (
      visible && (
        <Mask>
          <ModalBox>
            <ModalImg source={require('./img/store_tips.png')} />
            <MainText allowFontScaling={false}>您的店铺已被禁用</MainText>
            <SedText allowFontScaling={false}>
              禁用状态无法享受分销权益，不可推广商品赚返利，且不可管理店铺；
            </SedText>
            <SedText allowFontScaling={false} style={{ color: mainColor }}>
              禁用原因：
              {reason}
            </SedText>
          </ModalBox>
          <Button
            opacity={0.8}
            onPress={() =>
              msg.emit('store-forbid:visible', {
                visible: false,
                reason: reason
              })
            }
          >
            <BtnImage source={require('./img/share-close.png')} />
          </Button>
        </Mask>
      )
    );
  }

  changeVisible = ({ visible, reason }) => {
    this.setState({ visible: visible, reason: reason });
  };
}
