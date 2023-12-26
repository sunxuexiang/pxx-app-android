import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';

import styled from 'styled-components/native';

import { mainColor } from 'wmkit/styles/index';

const hairlineWidth = StyleSheet.hairlineWidth;
const isAndroid = Platform.OS === 'android';

const Container = styled.View`
  height: 44
  background-color: #fff
  align-items: center
  flex-direction: row
  justify-content: space-around
`;

const TouchNav = styled.View`
  height: 38
  justify-content: center
  margin-left: 10
`;

const TouchAble = styled.TouchableOpacity`
  border-left-width: 40
  border-left-color: transparent
  border-right-width: 32
  border-right-color: transparent
`;

const TouchView = styled.View`
  border-bottom-width: 2
  border-bottom-color: ${(props) =>
    props.selected ? mainColor : 'transparent'}
  
`;

const ItemText = styled.Text`
  color: ${(props) => (props.selected ? mainColor : '#333333')}
  font-size: 12
  padding-top: ${isAndroid ? 10 : 12}
  padding-bottom: ${isAndroid ? 10 : 12}
`;

@Relax
export default class FileTab extends React.Component {
  static relaxProps = {
    activeKey: 'activeKey',
    switchTab: noop,
    growthValueIsOpen:"growthValueIsOpen"
  };

  render() {
    const { activeKey, switchTab,growthValueIsOpen } = this.props.relaxProps;
    console.log(this.props,'v.props')
    return (
      <Container>
          {
          growthValueIsOpen && <TouchNav>
            <TouchAble
              onPress={() => switchTab('members')}
              activeOpacity={0.4}
            >
              <TouchView selected={activeKey == 'members'}>
                <ItemText allowFontScaling={false} selected={activeKey == 'members'}>
                  我的权益
                </ItemText>
              </TouchView>
            </TouchAble>
          </TouchNav>
        }
        <TouchNav>
          <TouchAble onPress={() => switchTab('archives')} activeOpacity={0.4}>
            <TouchView selected={activeKey == 'archives'}>
              <ItemText allowFontScaling={false} selected={activeKey == 'archives'}>
                店铺信息
              </ItemText>
            </TouchView>
          </TouchAble>
        </TouchNav>
        <TouchNav>
          <TouchAble
            onPress={() => switchTab('qualifications')}
            activeOpacity={0.4}
          >
            <TouchView selected={activeKey == 'qualifications'}>
              <ItemText allowFontScaling={false} selected={activeKey == 'qualifications'}>
                企业自传资质
              </ItemText>
            </TouchView>
          </TouchAble>
        </TouchNav>
      </Container>
    );
  }
}
